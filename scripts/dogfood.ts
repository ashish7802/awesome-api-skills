import * as fs from 'fs';
import * as path from 'path';

// We import directly from the local built packages
import { SkillMetadata } from '../packages/shared-types/src/index.js';
import { ValidatorEngine, MetadataPresenceRule } from '../packages/validator/src/index.js';
import {
  PipelineEngine,
  GeneratorCache,
  BuildGraph,
  SearchIndexPlugin,
  RegistryPlugin,
  ManifestPlugin,
  IntegrityReportPlugin,
  DocsPlugin,
  SitemapPlugin,
} from '../packages/generator/src/index.js';
import { RegistryCache, SearchIndex } from '../packages/registry/src/index.js';

const root = path.join(process.cwd(), 'skills');
const outDir = path.join(process.cwd(), 'dist');
const snapshotsDir = path.join(process.cwd(), 'snapshots');

async function loadRealSkills(): Promise<SkillMetadata[]> {
  const dirs = fs.readdirSync(root);
  const skills: SkillMetadata[] = [];
  for (const d of dirs) {
    const metaPath = path.join(root, d, 'metadata.json');
    if (fs.existsSync(metaPath)) {
      skills.push(JSON.parse(fs.readFileSync(metaPath, 'utf8')) as SkillMetadata);
    }
  }
  return skills;
}

function generateSyntheticSkills(count: number): SkillMetadata[] {
  const skills: SkillMetadata[] = [];
  for (let i = 0; i < count; i++) {
    skills.push({
      id: `synthetic-${i}`,
      name: `Synthetic Skill ${i}`,
      description: 'Load test skill',
      version: '1.0.0',
      license: 'MIT',
      categories: ['AI'],
      tags: ['synthetic'],
      sdkLanguages: ['typescript'],
      authType: 'api_key',
      supportedAgents: ['claude'],
    });
  }
  return skills;
}

async function runSnapshotTests() {
  if (!fs.existsSync(snapshotsDir)) {
    fs.mkdirSync(snapshotsDir, { recursive: true });
    // First run, copy generated artifacts to snapshots
    const files = [
      'search-index.json',
      'registry.json',
      'manifest.json',
      'integrity-report.json',
      'sitemap.xml',
    ];
    for (const f of files) {
      if (fs.existsSync(path.join(outDir, f))) {
        fs.copyFileSync(path.join(outDir, f), path.join(snapshotsDir, f));
      }
    }
    console.log('Snapshots created.');
  } else {
    // Compare
    const files = [
      'search-index.json',
      'registry.json',
      'manifest.json',
      'integrity-report.json',
      'sitemap.xml',
    ];
    for (const f of files) {
      const generated = fs.readFileSync(path.join(outDir, f), 'utf8');
      const snapshot = fs.readFileSync(path.join(snapshotsDir, f), 'utf8');
      if (generated !== snapshot) {
        throw new Error(`Snapshot mismatch for ${f}! Expected matching output.`);
      }
    }
    console.log('Golden snapshot tests passed.');
  }
}

async function runBenchmarks() {
  const health: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    platform: process.platform,
    nodeVersion: process.version,
    benchmarks: {},
    validationResults: null,
    buildResults: null,
  };

  const realSkills = await loadRealSkills();

  const synth1000 = generateSyntheticSkills(1000);

  console.log('=== DOGFOODING BENCHMARK ===');

  // 1. Validation Benchmark
  const validator = new ValidatorEngine();
  validator.registerRule(new MetadataPresenceRule());

  let start = performance.now();
  const valResults = await validator.validateAll(
    realSkills.map((s) => ({ skillPath: path.join(root, s.id), contentHash: 'abc', metadata: s })),
  );
  let elapsed = performance.now() - start;

  health.validationResults = valResults;
  health.benchmarks.validationReal = elapsed;
  console.log(`Validation (10 real): ${elapsed.toFixed(2)}ms`);

  const hasErrors = valResults.some((r) => !r.isValid);
  if (hasErrors) throw new Error('Real skills failed validation!');

  // Scalability validation
  start = performance.now();
  await validator.validateAll(
    synth1000.map((s) => ({ skillPath: '/synth', contentHash: 'abc', metadata: s })),
  );
  health.benchmarks.validation1000 = performance.now() - start;
  console.log(`Validation (1000 synth): ${health.benchmarks.validation1000.toFixed(2)}ms`);

  // 2. Generation Benchmark
  const generator = new PipelineEngine();
  generator.registerPlugin(new SearchIndexPlugin());
  generator.registerPlugin(new RegistryPlugin());
  generator.registerPlugin(new ManifestPlugin());
  generator.registerPlugin(new IntegrityReportPlugin());
  generator.registerPlugin(new DocsPlugin());
  generator.registerPlugin(new SitemapPlugin());

  const cache = new GeneratorCache();
  const graph = new BuildGraph();

  start = performance.now();
  const buildReport = await generator.runPipeline(
    { skills: realSkills, cache, graph, outputDir: outDir, isIncremental: false },
    ['GenerateArtifacts'],
  );
  elapsed = performance.now() - start;
  health.buildResults = buildReport;
  health.benchmarks.generationReal = elapsed;
  console.log(`Generation Full (10 real): ${elapsed.toFixed(2)}ms`);

  // Incremental generation
  start = performance.now();
  await generator.runPipeline(
    { skills: realSkills, cache, graph, outputDir: outDir, isIncremental: true },
    ['GenerateArtifacts'],
  );
  health.benchmarks.generationIncrementalReal = performance.now() - start;
  console.log(
    `Generation Incremental (10 real): ${health.benchmarks.generationIncrementalReal.toFixed(2)}ms`,
  );

  // Snapshot assertion
  await runSnapshotTests();

  // Generation Scalability
  start = performance.now();
  await generator.runPipeline(
    {
      skills: synth1000,
      cache: new GeneratorCache(),
      graph,
      outputDir: path.join(outDir, 'synth'),
      isIncremental: false,
    },
    ['GenerateArtifacts'],
  );
  health.benchmarks.generation1000 = performance.now() - start;
  console.log(`Generation Full (1000 synth): ${health.benchmarks.generation1000.toFixed(2)}ms`);

  // 3. Registry & Search Benchmark
  const registryCache = new RegistryCache();
  start = performance.now();
  for (const s of realSkills) registryCache.set(s, 'local');
  health.benchmarks.registryLoadReal = performance.now() - start;
  console.log(`Registry Load (10 real): ${health.benchmarks.registryLoadReal.toFixed(2)}ms`);

  const searchIndex = new SearchIndex(registryCache);
  start = performance.now();
  searchIndex.search({ term: 'API', category: 'AI' });
  health.benchmarks.searchReal = performance.now() - start;
  console.log(`Registry Search Latency (10 real): ${health.benchmarks.searchReal.toFixed(2)}ms`);

  // Registry Scalability
  const bigRegistry = new RegistryCache();
  start = performance.now();
  for (const s of synth1000) bigRegistry.set(s, 'local');
  health.benchmarks.registryLoad1000 = performance.now() - start;
  console.log(`Registry Load (1000 synth): ${health.benchmarks.registryLoad1000.toFixed(2)}ms`);

  const bigSearch = new SearchIndex(bigRegistry);
  start = performance.now();
  bigSearch.search({ term: 'Synthetic' });
  health.benchmarks.search1000 = performance.now() - start;
  console.log(`Registry Search Latency (1000 synth): ${health.benchmarks.search1000.toFixed(2)}ms`);

  fs.writeFileSync(path.join(process.cwd(), 'build-health.json'), JSON.stringify(health, null, 2));
  console.log('\nSaved build-health.json. Dogfooding milestone complete!');
}

runBenchmarks().catch((err) => {
  console.error(err);
  process.exit(1);
});
