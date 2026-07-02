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
  name: 'registry',
  aliases: ['reg'],
  description: 'Query skill registry graph status and metadata',
  arguments: '[subcommand]',
  options: {},
  examples: ['awesome-api registry', 'awesome-api registry info'],
  async execute() {
    const root = findRepoRoot();
    const graphPath = path.join(root, 'registry/graph.json');
    const graphExists = fs.existsSync(graphPath);

    let graphData: Record<string, unknown> | null = null;
    if (graphExists) {
      try {
        graphData = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
      } catch {
        graphData = null;
      }
    }

    const nodes = graphData?.nodes && typeof graphData.nodes === 'object' ? graphData.nodes : {};
    const edges = Array.isArray(graphData?.edges) ? graphData.edges : [];
    const nodeCount = Object.keys(nodes).length;
    const edgeCount = edges.length;

    return {
      status: graphExists ? 'active' : 'unindexed',
      graphPath,
      nodeCount,
      edgeCount,
      version: graphData?.version || '1.0.0',
      message: graphExists
        ? `Registry graph active with ${nodeCount} nodes and ${edgeCount} relationships.`
        : 'Registry graph.json not found. Run awesome-api sync to build.',
    };
  },
};

export default command;

export function formatRegistryOutput(data: {
  status: string;
  nodeCount: number;
  edgeCount: number;
  version: string;
  message: string;
}): string {
  return [
    pc.bold('Skill Registry Graph Status:'),
    `  ${pc.bold('Status:')} ${data.status === 'active' ? pc.green('Active') : pc.yellow('Unindexed')}`,
    `  ${pc.bold('Total Skills (Nodes):')} ${data.nodeCount}`,
    `  ${pc.bold('Relationships (Edges):')} ${data.edgeCount}`,
    `  ${pc.bold('Graph Version:')} ${data.version}`,
    '',
    `  ${pc.dim(data.message)}`,
  ].join('\n');
}
