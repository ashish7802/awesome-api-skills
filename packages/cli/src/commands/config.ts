import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import { ConfigurationManager } from '@awesome-api-skills/core';
import pc from 'picocolors';

const command: Command = {
  name: 'config',
  aliases: ['cfg'],
  description: 'View or modify workspace CLI configuration settings',
  arguments: '[action] [key] [value]',
  options: {},
  examples: [
    'awesome-api config',
    'awesome-api config get outputDir',
    'awesome-api config set telemetryEnabled true',
  ],
  async execute(context) {
    const rcPath = path.resolve(process.cwd(), '.awesome-apirc.json');
    let rcConfig: Record<string, unknown> = {};
    if (fs.existsSync(rcPath)) {
      try {
        rcConfig = JSON.parse(fs.readFileSync(rcPath, 'utf8'));
      } catch {
        rcConfig = {};
      }
    }

    const manager = new ConfigurationManager({}, rcConfig, {});
    const currentConfig = { ...manager.get(), ...rcConfig };

    const action = context.args[0] || 'list';
    const key = context.args[1];
    const value = context.args[2];

    const fullConfig = currentConfig as Record<string, unknown>;

    if (action === 'get' && key) {
      const val = fullConfig[key];
      return {
        action: 'get',
        key,
        value: val !== undefined ? val : null,
        message: `${key} = ${JSON.stringify(val)}`,
      };
    }

    if (action === 'set' && key && value !== undefined) {
      let parsedVal: unknown = value;
      if (value === 'true') parsedVal = true;
      else if (value === 'false') parsedVal = false;
      else if (!isNaN(Number(value))) parsedVal = Number(value);

      const updateObj = { ...currentConfig, [key]: parsedVal };
      fs.writeFileSync(rcPath, JSON.stringify(updateObj, null, 2) + '\n', 'utf8');

      return {
        action: 'set',
        key,
        value: parsedVal,
        message: `Set ${key} = ${JSON.stringify(parsedVal)}`,
      };
    }

    return {
      action: 'list',
      config: currentConfig,
      configPath: rcPath,
      message: 'Current workspace configuration:',
    };
  },
};

export default command;

export function formatConfigOutput(data: {
  action: string;
  key?: string;
  value?: unknown;
  config?: Record<string, unknown>;
  message: string;
}): string {
  if (data.action === 'list' && data.config) {
    const lines = [pc.bold('Workspace Configuration:'), ''];
    Object.entries(data.config).forEach(([k, v]) => {
      lines.push(`  ${pc.bold(k)}: ${pc.cyan(JSON.stringify(v))}`);
    });
    return lines.join('\n');
  }
  return pc.green(`✔ ${data.message}`);
}
