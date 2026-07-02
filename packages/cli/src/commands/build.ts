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
  name: 'build',
  aliases: ['b'],
  description: 'Build workspace skills for distribution',
  arguments: '',
  options: {
    outDir: { type: 'string', description: 'Output directory for distribution bundle' },
  },
  examples: ['awesome-api build', 'awesome-api build --outDir=dist'],
  async execute(context) {
    const root = findRepoRoot();
    const skillsDir = path.join(root, 'skills');
    const outDir = (context.options.outDir as string) || path.join(root, 'dist');

    if (!fs.existsSync(skillsDir)) {
      throw new Error(`Skills directory not found at ${skillsDir}`);
    }

    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
    }

    const skillFolders = fs
      .readdirSync(skillsDir)
      .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

    const manifest = {
      version: '1.0.0',
      builtAt: new Date().toISOString(),
      totalSkills: skillFolders.length,
      skills: skillFolders,
    };

    fs.writeFileSync(
      path.join(outDir, 'bundle-manifest.json'),
      JSON.stringify(manifest, null, 2) + '\n',
      'utf8',
    );

    return {
      success: true,
      skillsBuilt: skillFolders.length,
      outDir,
      manifestPath: path.join(outDir, 'bundle-manifest.json'),
      message: `Built ${skillFolders.length} skills into ${outDir}`,
    };
  },
};

export default command;

export function formatBuildOutput(data: {
  skillsBuilt: number;
  outDir: string;
  manifestPath: string;
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Output Folder:')} ${data.outDir}`,
    `  ${pc.bold('Manifest:')} ${data.manifestPath}`,
  ].join('\n');
}
