import { BuildContext, BuildReport, GeneratorPlugin } from '../interfaces.js';

export class PipelineEngine {
  private plugins: GeneratorPlugin[] = [];

  registerPlugin(plugin: GeneratorPlugin) {
    this.plugins.push(plugin);
  }

  async runPipeline(context: BuildContext, stages: string[]): Promise<BuildReport> {
    const startTime = performance.now();
    const report: BuildReport = {
      timestamp: Date.now(),
      totalDurationMs: 0,
      diagnostics: [],
      success: true,
    };

    try {
      for (const stage of stages) {
        const stagePlugins = this.plugins.filter((p) => p.targetStages.includes(stage));

        // Execute plugins for this stage concurrently
        const results = await Promise.all(
          stagePlugins.map(async (p) => {
            const start = performance.now();
            try {
              return await p.generate(context);
            } catch (err: unknown) {
              const msg = err instanceof Error ? err.message : String(err);
              return {
                stage: `${stage}:${p.id}`,
                durationMs: performance.now() - start,
                outputsCreated: 0,
                outputsSkipped: 0,
                warnings: [],
                errors: [msg],
              };
            }
          }),
        );

        for (const res of results) {
          report.diagnostics.push(res);
          if (res.errors.length > 0) {
            report.success = false;
          }
        }
      }
    } finally {
      report.totalDurationMs = performance.now() - startTime;
    }

    return report;
  }
}
