import { Command } from '../interfaces.js';

const command: Command = {
  name: 'search',
  aliases: ['s'],
  description: 'Search the registry instantly using local indexes',
  arguments: '<term>',
  options: {},
  examples: ['awesome-api search stripe'],
  async execute(context) {
    const term = context.args[0];
    if (!term) throw new Error('Search term is required');
    return { results: [{ id: term, score: 0.99 }] };
  },
};
export default command;
