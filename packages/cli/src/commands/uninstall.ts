import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import pc from 'picocolors';

const command: Command = {
  name: 'uninstall',
  aliases: ['remove', 'rm'],
  description: 'Remove an installed skill from your workspace or agent directory',
  arguments: '<skill-id>',
  options: {
    target: { type: 'string', description: 'Target folder (.claude/skills, .cursor/skills, etc.)' },
  },
  examples: ['awesome-api uninstall stripe', 'awesome-api uninstall clerk --target=.claude/skills'],
  async execute(context) {
    const skillId = context.args[0];
    if (!skillId) throw new Error('Skill ID is required. Example: awesome-api uninstall stripe');

    const targetArg = (context.options.target as string) || '.claude/skills';
    const destDir = path.resolve(process.cwd(), targetArg, skillId);

    if (!fs.existsSync(destDir)) {
      throw new Error(`Skill '${skillId}' is not installed at ${destDir}`);
    }

    fs.rmSync(destDir, { recursive: true, force: true });

    return {
      skillId,
      removedPath: destDir,
      message: `Successfully uninstalled skill '${skillId}' from ${destDir}`,
    };
  },
};

export default command;

export function formatUninstallOutput(data: {
  skillId: string;
  removedPath: string;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Removed Location:')} ${data.removedPath}`,
  ].join('\n');
}
