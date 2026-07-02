import { Command } from './interfaces.js';

type CommandImporter = () => Promise<{ default: Command }>;

export class CommandRegistry {
  private commands = new Map<string, CommandImporter>();

  register(name: string, importer: CommandImporter) {
    this.commands.set(name, importer);
  }

  async resolve(name: string): Promise<Command | null> {
    const importer = this.commands.get(name);
    if (!importer) return null;
    const mod = await importer();
    return mod.default || null;
  }

  getRegisteredNames(): string[] {
    return Array.from(this.commands.keys());
  }
}

export const registry = new CommandRegistry();

// Lazy-register all commands
registry.register(
  'help',
  () => import('./commands/help.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'doctor',
  () => import('./commands/doctor.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'search',
  () => import('./commands/search.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'validate',
  () => import('./commands/validate.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'completion',
  () => import('./commands/completion.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'init',
  () => import('./commands/init.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'install',
  () => import('./commands/install.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'uninstall',
  () => import('./commands/uninstall.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'list',
  () => import('./commands/list.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'registry',
  () => import('./commands/registry.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'generate',
  () => import('./commands/generate.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'build',
  () => import('./commands/build.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'sync',
  () => import('./commands/sync.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'benchmark',
  () => import('./commands/benchmark.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'create-skill',
  () => import('./commands/create-skill.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'update',
  () => import('./commands/update.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'cache',
  () => import('./commands/cache.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'config',
  () => import('./commands/config.js') as unknown as Promise<{ default: Command }>,
);
registry.register(
  'version',
  () => import('./commands/version.js') as unknown as Promise<{ default: Command }>,
);
