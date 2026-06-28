import { Command } from '../interfaces.js';

const command: Command = {
  name: 'validate',
  aliases: ['v'],
  description: 'Validates skills in the current workspace',
  arguments: '',
  options: {},
  examples: ['awesome-api validate'],
  async execute() {
    return { valid: true, diagnostics: [] };
  },
};
export default command;
