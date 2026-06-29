import { Command } from '../interfaces.js';
import { registry } from '../registry.js';
import pc from 'picocolors';

const command: Command = {
  name: 'help',
  aliases: ['h'],
  description: 'Displays help information for the CLI or a specific command',
  arguments: '[command]',
  options: {},
  examples: ['awesome-api help', 'awesome-api help doctor'],
  async execute(context) {
    const commandName = context.args[0];
    if (commandName) {
      const cmd = await registry.resolve(commandName);
      if (!cmd) throw new Error(`Command '${commandName}' not found.`);

      const helpText = `
${pc.bold('Command:')} ${cmd.name}
${pc.dim(cmd.description)}

${pc.bold('Usage:')}
  awesome-api ${cmd.name} ${cmd.arguments}

${pc.bold('Options:')}
  --json     Output in JSON format
  --verbose  Show verbose output
  --quiet    Suppress non-error output

${pc.bold('Examples:')}
${cmd.examples.map((ex) => `  $ ${ex}`).join('\n')}
`;
      return helpText.trim();
    }

    // Global Help
    const allNames = registry.getRegisteredNames();
    const helpText = `
${pc.bold('Awesome API Skills CLI')}
${pc.dim('Find and validate API skills for your agent')}

${pc.bold('Usage:')}
  awesome-api <command> [options]

${pc.bold('Start here:')}
  ${pc.cyan('search')} ${pc.dim('<term>')}   Find a skill (stripe, postgres, auth…)
  ${pc.cyan('doctor')}              Check workspace & next steps
  ${pc.cyan('validate')}            Validate skill schemas

${pc.bold('All commands:')}
${allNames.map((n) => `  ${pc.cyan(n.padEnd(15))}`).join('\n')}

${pc.bold('Global Options:')}
  --json     Output in JSON format
  --verbose  Show verbose output
  --quiet    Suppress non-error output
  --help     Show help
`;
    return helpText.trim();
  },
};
export default command;
