import path from 'path';
import { Command } from '../interfaces.js';
import {
  PipelineEngine,
  BuildContext,
  GeneratorCache,
  BuildGraph,
  SearchIndexPlugin,
} from '@awesome-api-skills/generator';
import pc from 'picocolors';

const command: Command = {
  name: 'generate',
  aliases: ['gen'],
  description: 'Generate build artifacts using the generator pipeline',
  arguments: '[stage]',
  options: {
    out: { type: 'string', description: 'Output directory' },
  },
  examples: ['awesome-api generate', 'awesome-api generate GenerateArtifacts --out=dist'],
  async execute(context) {
    const stage = context.args[0] || 'GenerateArtifacts';
    const outputDir = (context.options.out as string) || path.resolve(process.cwd(), 'dist');

    const engine = new PipelineEngine();
    engine.registerPlugin(new SearchIndexPlugin());

    const buildContext: BuildContext = {
      skills: [],
      cache: new GeneratorCache(),
      graph: new BuildGraph(),
      outputDir,
      isIncremental: false,
    };

    const start = performance.now();
    const report = await engine.runPipeline(buildContext, [stage]);
    const durationMs = performance.now() - start;

    return {
      success: report.success,
      stage,
      outputDir,
      durationMs: Math.round(durationMs),
      diagnosticsCount: report.diagnostics.length,
      message: `Generated build artifacts for stage '${stage}' in ${Math.round(durationMs)}ms`,
    };
  },
};

export default command;

export function formatGenerateOutput(data: {
  success: boolean;
  stage: string;
  outputDir: string;
  durationMs: number;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Stage:')} ${data.stage}`,
    `  ${pc.bold('Output Directory:')} ${data.outputDir}`,
  ].join('\n');
}
