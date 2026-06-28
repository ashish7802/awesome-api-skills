import { parseArgs } from 'util';
import { registry } from './registry.js';
import { OutputRenderer } from './renderer.js';
import { logger, LogLevel } from './logger.js';
import { GlobalOptions } from './interfaces.js';

export async function main(argv: string[]) {
  const start = performance.now();

  let parsed;
  try {
    parsed = parseArgs({
      args: argv,
      options: {
        json: { type: 'boolean' },
        verbose: { type: 'boolean' },
        quiet: { type: 'boolean' },
        help: { type: 'boolean' },
      },
      strict: false,
      allowPositionals: true,
    });
  } catch (err: unknown) {
    const e = err as Error;
    console.error(`Argument parsing failed: ${e.message}`);
    process.exit(1);
  }

  const positionals = parsed.positionals;
  const commandName = positionals[0] || 'help';
  const commandArgs = positionals.slice(1);

  const globalOptions: GlobalOptions = {
    json: !!parsed.values.json,
    verbose: !!parsed.values.verbose,
    quiet: !!parsed.values.quiet,
    help: !!parsed.values.help,
  };

  if (globalOptions.quiet) logger.setLevel(LogLevel.SILENT);
  else if (globalOptions.verbose) logger.setLevel(LogLevel.TRACE);
  else logger.setLevel(LogLevel.INFO);

  const renderer = new OutputRenderer(globalOptions.json);

  const discoverStart = performance.now();
  const cmd = await registry.resolve(commandName);
  const discoverTime = performance.now() - discoverStart;

  if (!cmd) {
    renderer.renderError(
      `Unknown command: ${commandName}`,
      `The command does not exist in the registry.`,
      `Run 'awesome-api help' to see available commands.`,
    );
    process.exit(1);
  }

  // Intercept global help
  if (globalOptions.help) {
    const helpCmd = await registry.resolve('help');
    if (helpCmd) {
      const data = await helpCmd.execute({ args: [cmd.name], options: {}, globalOptions });
      renderer.renderData(data);
      process.exit(0);
    }
  }

  const execStart = performance.now();
  try {
    const data = await cmd.execute({ args: commandArgs, options: parsed.values, globalOptions });
    const execTime = performance.now() - execStart;

    if (typeof data === 'string') {
      renderer.renderData(data); // e.g. help text
    } else {
      renderer.renderSuccess(`${cmd.name} completed successfully.`, data);
    }

    logger.debug(`[Performance] Cold Start: ${start.toFixed(2)}ms`);
    logger.debug(`[Performance] Discovery: ${discoverTime.toFixed(2)}ms`);
    logger.debug(`[Performance] Execution: ${execTime.toFixed(2)}ms`);
  } catch (err: unknown) {
    const e = err as Error;
    renderer.renderError(
      `Execution failed for '${cmd.name}'`,
      e.message,
      `Check arguments or run 'awesome-api help ${cmd.name}'`,
      `https://awesome.api/docs/cli/${cmd.name}`,
    );
    if (globalOptions.verbose) console.error(e.stack);
    process.exit(1);
  }
}
