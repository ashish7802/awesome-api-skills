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
  name: 'sync',
  aliases: [],
  description: 'Sync local skills graph and update registry index',
  arguments: '',
  options: {},
  examples: ['awesome-api sync'],
  async execute() {
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const graphPath = path.join(root, 'registry/graph.json');

    if (!fs.existsSync(skillsDir)) {
      throw new Error(`Skills directory not found at ${skillsDir}`);
    }

    const skillFolders = fs
      .readdirSync(skillsDir)
      .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

    const nodes: Record<string, Record<string, unknown>> = {};
    const edges: Array<{ source: string; target: string; type: string }> = [];

    for (const id of skillFolders) {
      const metaPath = path.join(skillsDir, id, 'metadata.json');
      const meta = fs.existsSync(metaPath)
        ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
        : { id, name: id, categories: [] };

      nodes[id] = {
        id,
        name: meta.name || id,
        categories: meta.categories || [],
        version: meta.version || '1.0.0',
      };
    }

    const registryDir = path.dirname(graphPath);
    if (!fs.existsSync(registryDir)) {
      fs.mkdirSync(registryDir, { recursive: true });
    }

    const graphData = {
      version: '1.0.0',
      syncedAt: new Date().toISOString(),
      nodes,
      edges,
    };

    fs.writeFileSync(graphPath, JSON.stringify(graphData, null, 2) + '\n', 'utf8');

    return {
      success: true,
      syncedSkills: skillFolders.length,
      graphPath,
      message: `Synced ${skillFolders.length} skills into registry graph`,
    };
  },
};

export default command;

export function formatSyncOutput(data: {
  syncedSkills: number;
  graphPath: string;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Registry Graph Path:')} ${data.graphPath}`,
  ].join('\n');
}
