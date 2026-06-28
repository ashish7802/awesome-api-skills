import { Command } from '../interfaces.js';

export function createMockCommand(name: string): Command {
  return {
    name,
    aliases: [],
    description: `Executes the ${name} workflow`,
    arguments: '[args...]',
    options: {},
    examples: [`awesome-api ${name}`],
    async execute(context) {
      return { status: 'mocked', command: name, ...context };
    },
  };
}
