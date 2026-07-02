import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import pc from 'picocolors';

const command: Command = {
  name: 'init',
  aliases: [],
  description: 'Initialize a new skills workspace',
  arguments: '[dir]',
  options: {
    force: { type: 'boolean', description: 'Overwrite existing configuration' },
  },
  examples: ['awesome-api init', 'awesome-api init ./my-project'],
  async execute(context) {
    const targetDir = context.args[0]
      ? path.resolve(process.cwd(), context.args[0])
      : process.cwd();

    const skillsDir = path.join(targetDir, 'skills');
    const configPath = path.join(targetDir, '.awesome-apirc.json');

    const force = !!context.options.force;

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    if (!fs.existsSync(skillsDir)) {
      fs.mkdirSync(skillsDir, { recursive: true });
    }

    const configExists = fs.existsSync(configPath);
    if (!configExists || force) {
      const defaultConfig = {
        name: path.basename(targetDir),
        version: '1.0.0',
        skillsDir: './skills',
        outputDir: './dist',
        registryUrls: ['https://registry.npmjs.org/@awesome-api-skills'],
        telemetryEnabled: false,
        created: new Date().toISOString(),
      };
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2) + '\n', 'utf8');
    }

    return {
      success: true,
      path: targetDir,
      skillsDir,
      configPath,
      configCreated: !configExists || force,
      message: `Initialized workspace at ${targetDir}`,
    };
  },
};

export default command;

export function formatInitOutput(data: {
  path: string;
  skillsDir: string;
  configPath: string;
  configCreated: boolean;
  message: string;
}): string {
  const lines = [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Skills Directory:')} ${data.skillsDir}`,
    `  ${pc.bold('Config File:')} ${data.configPath}`,
  ];
  return lines.join('\n');
}
