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
  name: 'list',
  aliases: ['ls'],
  description: 'List installed skills in current workspace or agent directory',
  arguments: '',
  options: {
    category: { type: 'string', description: 'Filter skills by category' },
  },
  examples: ['awesome-api list', 'awesome-api list --category=Payments'],
  async execute(context) {
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const categoryFilter = context.options.category as string | undefined;

    if (!fs.existsSync(skillsDir)) {
      return {
        total: 0,
        skills: [],
        message: 'No skills/ directory found in workspace',
      };
    }

    const skillFolders = fs
      .readdirSync(skillsDir)
      .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

    const skillsList = skillFolders
      .map((id) => {
        const metaPath = path.join(skillsDir, id, 'metadata.json');
        const meta = fs.existsSync(metaPath)
          ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
          : { name: id, categories: [] };
        return {
          id,
          name: meta.name || id,
          description: meta.description || '',
          categories: meta.categories || [],
          lastVerified: meta.lastVerified || 'N/A',
        };
      })
      .filter(
        (s) =>
          !categoryFilter ||
          s.categories.some((c: string) => c.toLowerCase() === categoryFilter.toLowerCase()),
      );

    return {
      total: skillsList.length,
      skills: skillsList,
      message: `Found ${skillsList.length} skill(s)`,
    };
  },
};

export default command;

export function formatListOutput(data: {
  total: number;
  skills: Array<{ id: string; name: string; categories: string[]; lastVerified: string }>;
}): string {
  const lines = [pc.bold(`Installed Skills (${data.total}):`), ''];
  data.skills.forEach((s) => {
    const cats = s.categories.length ? pc.dim(` [${s.categories.join(', ')}]`) : '';
    lines.push(
      `  ${pc.cyan('•')} ${pc.bold(s.id)}${cats} ${pc.dim(`(Verified ${s.lastVerified})`)}`,
    );
  });
  return lines.join('\n');
}
