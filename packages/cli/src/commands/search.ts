import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'skills')) && fs.existsSync(path.join(dir, 'registry'))) {
      return dir;
    }
    dir = path.dirname(dir);
  }
  return process.cwd();
}

function loadSkills(root: string) {
  const skillsDir = path.join(root, 'skills');
  if (!fs.existsSync(skillsDir)) return [];
  return fs
    .readdirSync(skillsDir)
    .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory())
    .map((id) => {
      const metaPath = path.join(skillsDir, id, 'metadata.json');
      const meta = fs.existsSync(metaPath)
        ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
        : { name: id, categories: [] };
      return { id, meta };
    });
}

function scoreSkill(id: string, meta: Record<string, unknown>, term: string): number {
  const t = term.toLowerCase();
  const hay = [
    id,
    String(meta.name || ''),
    String(meta.description || ''),
    ...((meta.categories as string[]) || []),
    ...((meta.tags as string[]) || []),
  ]
    .join(' ')
    .toLowerCase();
  if (id === t) return 1;
  if (id.startsWith(t)) return 0.95;
  if (hay.includes(t)) return 0.85;
  if (hay.split(/\s+/).some((w) => w.startsWith(t))) return 0.7;
  return 0;
}

const command: Command = {
  name: 'search',
  aliases: ['s'],
  description: 'Search skills by name, category, or keyword',
  arguments: '<term>',
  options: {},
  examples: ['awesome-api search stripe', 'awesome-api search payment'],
  async execute(context) {
    const term = context.args[0];
    if (!term) throw new Error('Search term is required. Example: awesome-api search stripe');

    const root = findRepoRoot();
    const skills = loadSkills(root);
    const results = skills
      .map(({ id, meta }) => ({ id, meta, score: scoreSkill(id, meta, term) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12);

    if (!results.length) {
      return {
        query: term,
        count: 0,
        message: `No skills matched "${term}". Try: payment, database, auth, ai`,
        results: [],
      };
    }

    return {
      query: term,
      count: results.length,
      results: results.map((r) => ({
        id: r.id,
        name: r.meta.name || r.id,
        categories: r.meta.categories || [],
        path: `skills/${r.id}/SKILL.md`,
        score: r.score,
      })),
      next: `Open skills/${results[0].id}/SKILL.md or run: pnpm dev → /skills/${results[0].id}`,
    };
  },
};

export default command;

export function formatSearchResults(data: {
  query: string;
  count: number;
  results: Array<{ id: string; name: string; categories: string[]; path: string }>;
  next?: string;
  message?: string;
}): string {
  if (!data.count) {
    return `${pc.yellow('No results')} for "${data.query}"\n  ${data.message || ''}`;
  }
  const lines = data.results.map(
    (r) =>
      `  ${pc.cyan(r.id.padEnd(18))} ${pc.dim((r.categories || []).join(', '))}\n  ${pc.dim('→')} ${r.path}`,
  );
  return `${pc.bold(`${data.count} skill(s)`)} for "${data.query}"\n\n${lines.join('\n\n')}\n\n${pc.green('Next:')} ${data.next || ''}`;
}
