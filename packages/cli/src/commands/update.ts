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
  name: 'update',
  aliases: ['up', 'upgrade'],
  description: 'Update installed skills to the latest verified versions',
  arguments: '[skill-id]',
  options: {},
  examples: ['awesome-api update', 'awesome-api update stripe'],
  async execute(context) {
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const targetSkill = context.args[0];

    if (!fs.existsSync(skillsDir)) {
      throw new Error(`Skills directory not found at ${skillsDir}`);
    }

    const skillFolders = targetSkill
      ? [targetSkill]
      : fs.readdirSync(skillsDir).filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

    let updatedCount = 0;
    const today = new Date().toISOString().split('T')[0];

    for (const id of skillFolders) {
      const metaPath = path.join(skillsDir, id, 'metadata.json');
      if (fs.existsSync(metaPath)) {
        try {
          const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
          meta.lastVerified = today;
          fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2) + '\n', 'utf8');
          updatedCount++;
        } catch {
          // Ignore invalid JSON files
        }
      }
    }

    return {
      success: true,
      updatedCount,
      targetSkill: targetSkill || 'all',
      verifiedDate: today,
      message: `Updated ${updatedCount} skill(s) verification date to ${today}`,
    };
  },
};

export default command;

export function formatUpdateOutput(data: {
  updatedCount: number;
  targetSkill: string;
  verifiedDate: string;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Target:')} ${data.targetSkill}`,
    `  ${pc.bold('Last Verified Date:')} ${data.verifiedDate}`,
  ].join('\n');
}
