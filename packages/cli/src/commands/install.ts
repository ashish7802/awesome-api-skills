import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
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
  name: 'install',
  aliases: ['i', 'add'],
  description: 'Install a skill into the current workspace or agent directory',
  arguments: '<skill-id>',
  options: {
    target: { type: 'string', description: 'Target folder (.claude/skills, .cursor/skills, etc.)' },
  },
  examples: ['awesome-api install stripe', 'awesome-api install clerk --target=.claude/skills'],
  async execute(context) {
    const skillId = context.args[0];
    if (!skillId) throw new Error('Skill ID is required. Example: awesome-api install stripe');

    const root = findRepoRoot();
    const sourceSkillDir = path.join(root, 'skills', skillId);

    if (!fs.existsSync(sourceSkillDir)) {
      throw new Error(`Skill '${skillId}' not found in registry at ${sourceSkillDir}`);
    }

    const targetArg = (context.options.target as string) || '.claude/skills';
    const destDir = path.resolve(process.cwd(), targetArg, skillId);

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy SKILL.md and metadata.json
    const filesToCopy = ['SKILL.md', 'metadata.json'];
    for (const f of filesToCopy) {
      const src = path.join(sourceSkillDir, f);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(destDir, f));
      }
    }

    const metaPath = path.join(sourceSkillDir, 'metadata.json');
    const metadata = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
      : { name: skillId };

    return {
      skillId,
      name: metadata.name || skillId,
      installedPath: destDir,
      filesCopied: filesToCopy,
      message: `Successfully installed skill '${skillId}' to ${destDir}`,
    };
  },
};

export default command;

export function formatInstallOutput(data: {
  skillId: string;
  name: string;
  installedPath: string;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Skill:')} ${data.name} (${data.skillId})`,
    `  ${pc.bold('Location:')} ${data.installedPath}`,
  ].join('\n');
}
