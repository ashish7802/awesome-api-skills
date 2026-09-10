const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');
const {
  PipelineEngine,
  GeneratorCache,
  BuildGraph,
  RegistryPlugin,
  SearchIndexPlugin,
  IntegrityReportPlugin,
} = require('../../packages/generator/dist');
async function main() {
  const root = path.resolve(__dirname, '../..');
  const skills = fs
    .readdirSync(path.join(root, 'skills'))
    .sort()
    .filter((id) => fs.statSync(path.join(root, 'skills', id)).isDirectory())
    .map((id) => ({
      ...JSON.parse(fs.readFileSync(path.join(root, 'skills', id, 'metadata.json'), 'utf8')),
      id,
    }));
  const outputDir = path.join(root, 'dist/artifacts');
  const engine = new PipelineEngine();
  for (const plugin of [new RegistryPlugin(), new SearchIndexPlugin(), new IntegrityReportPlugin()])
    engine.registerPlugin(plugin);
  const report = await engine.runPipeline(
    {
      skills,
      outputDir,
      cache: new GeneratorCache(),
      graph: new BuildGraph(),
      isIncremental: false,
    },
    ['GenerateArtifacts'],
  );
  if (!report.success) throw new Error(JSON.stringify(report));
  const files = ['registry.json', 'search-index.json', 'integrity-report.json'];
  fs.writeFileSync(
    path.join(root, 'checksums.txt'),
    files
      .map(
        (file) =>
          createHash('sha256')
            .update(fs.readFileSync(path.join(outputDir, file)))
            .digest('hex') +
          '  dist/artifacts/' +
          file,
      )
      .join('\n') + '\n',
  );
  console.log('Generated registry artifacts and SHA-256 checksums.');
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
