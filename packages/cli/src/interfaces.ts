export interface GlobalOptions {
  json: boolean;
  verbose: boolean;
  quiet: boolean;
  help: boolean;
}

export interface CommandContext {
  args: string[];
  options: Record<string, unknown>;
  globalOptions: GlobalOptions;
}

export interface Command {
  name: string;
  aliases: string[];
  description: string;
  arguments: string;
  options: Record<string, { type: 'string' | 'boolean'; description: string }>;
  examples: string[];
  execute(context: CommandContext): Promise<unknown>;
}
