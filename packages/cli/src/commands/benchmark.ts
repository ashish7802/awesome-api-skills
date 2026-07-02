import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import { ValidatorEngine, MetadataPresenceRule } from '@awesome-api-skills/validator';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'skills'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const command: Command = {
  name: 'benchmark',
  aliases: ['bench'],
  description: 'Run performance benchmark tests on skill validation and generation pipelines',
  arguments: '',
  options: {
    iterations: { type: 'string', description: 'Number of benchmark iterations (default 10)' },
  },
  examples: ['awesome-api benchmark', 'awesome-api benchmark --iterations=50'],
  async execute(context) {
    const iterations = parseInt((context.options.iterations as string) || '10', 10);
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');

    const skillFolders = fs.existsSync(skillsDir)
      ? fs.readdirSync(skillsDir).filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory())
      : [];

    const engine = new ValidatorEngine();
    engine.registerRule(new MetadataPresenceRule());

    const contexts = skillFolders.map((id) => {
      const metaPath = path.join(skillsDir, id, 'metadata.json');
      return {
        skillPath: path.join(skillsDir, id),
        contentHash: 'bench',
        metadata: fs.existsSync(metaPath)
          ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
          : { id, name: id },
      };
    });

    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      await engine.validateAll(contexts);
    }
    const totalMs = performance.now() - start;
    const avgPerIterationMs = (totalMs / iterations).toFixed(2);
    const opsPerSecond = Math.round((iterations / totalMs) * 1000);

    return {
      iterations,
      totalSkills: skillFolders.length,
      totalDurationMs: Math.round(totalMs),
      avgPerIterationMs,
      opsPerSecond,
      message: `Completed ${iterations} benchmark iterations in ${Math.round(totalMs)}ms (${opsPerSecond} ops/sec)`,
    };
  },
};

export default command;

export function formatBenchmarkOutput(data: {
  iterations: number;
  totalSkills: number;
  totalDurationMs: number;
  avgPerIterationMs: string;
  opsPerSecond: number;
  message: string;
}): string {
  return [
    pc.bold('Performance Benchmark Results:'),
    `  ${pc.green('✔')} ${data.message}`,
    `  ${pc.bold('Skills Tested:')} ${data.totalSkills}`,
    `  ${pc.bold('Avg Iteration Time:')} ${data.avgPerIterationMs} ms`,
    `  ${pc.bold('Throughput:')} ${data.opsPerSecond} ops/sec`,
  ].join('\n');
}
