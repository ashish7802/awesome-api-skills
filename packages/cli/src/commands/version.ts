import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'package.json'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const command: Command = {
  name: 'version',
  aliases: ['v', '-v', '--version'],
  description: 'Display CLI version and environment information',
  arguments: '',
  options: {},
  examples: ['awesome-api version'],
  async execute() {
    const root = findRepoRoot();
    const pkgPath = path.join(root, 'package.json');
    let version = '1.0.0';

    if (fs.existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
        version = pkg.version || '1.0.0';
      } catch {
        version = '1.0.0';
      }
    }

    return {
      name: 'awesome-api-skills',
      version,
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      message: `awesome-api-skills v${version} (${process.platform}-${process.arch}, node ${process.version})`,
    };
  },
};

export default command;

export function formatVersionOutput(data: {
  version: string;
  nodeVersion: string;
  platform: string;
  arch: string;
  message: string;
}): string {
  return [
    pc.bold('Awesome API Skills CLI'),
    `  ${pc.bold('CLI Version:')} v${data.version}`,
    `  ${pc.bold('Node.js:')} ${data.nodeVersion}`,
    `  ${pc.bold('OS/Arch:')} ${data.platform}-${data.arch}`,
  ].join('\n');
}
