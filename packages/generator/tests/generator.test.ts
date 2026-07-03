import { describe, it, expect } from 'vitest';
import {
  PipelineEngine,
  BuildContext,
  GeneratorCache,
  BuildGraph,
  SearchIndexPlugin,
} from '../src/index.js';

describe('Generator Pipeline', () => {
  it('should execute registered plugins in target stages', async () => {
    const engine = new PipelineEngine();
    engine.registerPlugin(new SearchIndexPlugin());

    const context: BuildContext = {
      skills: [],
      cache: new GeneratorCache(),
      graph: new BuildGraph(),
      outputDir: './dist-test',
      isIncremental: false,
    };

    const report = await engine.runPipeline(context, ['GenerateArtifacts']);
    expect(report.success).toBe(true);
    expect(report.diagnostics.length).toBe(1);
    expect(report.diagnostics[0].outputsCreated).toBe(1);
    expect(report.diagnostics[0].outputsSkipped).toBe(0);
  });

  it('should skip generation on incremental runs via cache', async () => {
    const engine = new PipelineEngine();
    engine.registerPlugin(new SearchIndexPlugin());

    const cache = new GeneratorCache();
    const context: BuildContext = {
      skills: [],
      cache,
      graph: new BuildGraph(),
      outputDir: './dist-test',
      isIncremental: true,
    };

    // First run creates
    await engine.runPipeline(context, ['GenerateArtifacts']);
    // Second run skips
    const report2 = await engine.runPipeline(context, ['GenerateArtifacts']);

    expect(report2.diagnostics[0].outputsCreated).toBe(0);
    expect(report2.diagnostics[0].outputsSkipped).toBe(1);
  });

  it('should correctly traverse the dependency graph', () => {
    const graph = new BuildGraph();
    // docs depend on search-index and registry-manifest
    graph.addDependency('docs', 'search-index');
    graph.addDependency('docs', 'registry-manifest');
    // sitemap depends on docs
    graph.addDependency('sitemap', 'docs');

    const affected = graph.getAffectedTargets('search-index');
    expect(affected).toContain('docs');
    expect(affected).toContain('sitemap');
  });

  it('benchmark: should measure parallel generation performance', async () => {
    const engine = new PipelineEngine();

    // Create 100 mock plugins
    for (let i = 0; i < 100; i++) {
      engine.registerPlugin({
        id: `plugin-${i}`,
        name: `Plugin ${i}`,
        targetStages: ['TestStage'],
        generate: async () => {
          // Simulate 10ms async work per plugin
          await new Promise((r) => setTimeout(r, 10));
          return {
            stage: 'TestStage',
            durationMs: 10,
            outputsCreated: 1,
            outputsSkipped: 0,
            warnings: [],
            errors: [],
          };
        },
      });
    }

    const start = performance.now();
    const report = await engine.runPipeline(
      {
        skills: [],
        cache: new GeneratorCache(),
        graph: new BuildGraph(),
        outputDir: '',
        isIncremental: false,
      },
      ['TestStage'],
    );
    const elapsed = performance.now() - start;

    // 100 plugins running 10ms tasks concurrently should take roughly ~10-30ms total, not 1000ms.
    expect(elapsed).toBeLessThan(100);
    expect(report.totalDurationMs).toBeGreaterThan(0);
    expect(report.diagnostics.length).toBe(100);
  });
});
