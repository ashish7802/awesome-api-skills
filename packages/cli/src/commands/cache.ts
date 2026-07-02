import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import { GeneratorCache } from '@awesome-api-skills/generator';
import pc from 'picocolors';

const command: Command = {
  name: 'cache',
  aliases: [],
  description: 'Inspect or clear local build and generator cache',
  arguments: '[action]',
  options: {},
  examples: ['awesome-api cache', 'awesome-api cache clear', 'awesome-api cache status'],
  async execute(context) {
    const action = context.args[0] || 'status';
    const cache = new GeneratorCache();

    if (action === 'clear' || action === 'clean') {
      cache.clear();
      const distDir = path.resolve(process.cwd(), 'dist');
      const cacheDir = path.resolve(process.cwd(), '.cache');

      if (fs.existsSync(distDir)) fs.rmSync(distDir, { recursive: true, force: true });
      if (fs.existsSync(cacheDir)) fs.rmSync(cacheDir, { recursive: true, force: true });

      return {
        action: 'clear',
        cleared: true,
        message: 'Successfully cleared local build and generator cache directories',
      };
    }

    return {
      action: 'status',
      cleared: false,
      message: 'Cache status: Generator cache active',
    };
  },
};

export default command;

export function formatCacheOutput(data: {
  action: string;
  cleared?: boolean;
  message: string;
}): string {
  return [
    pc.bold('Cache Manager:'),
    `  ${pc.green('✔')} ${data.message}`,
  ].join('\n');
}
