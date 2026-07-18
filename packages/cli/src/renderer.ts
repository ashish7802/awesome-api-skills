import { logger } from './logger.js';
import pc from 'picocolors';
import { formatSearchResults } from './commands/search.js';
import { formatDoctor } from './commands/doctor.js';
import { formatListOutput } from './commands/list.js';
import { formatValidateOutput } from './commands/validate.js';
import { formatBenchmarkOutput } from './commands/benchmark.js';
import { formatBuildOutput } from './commands/build.js';
import { formatCacheOutput } from './commands/cache.js';
import { formatConfigOutput } from './commands/config.js';
import { formatCreateSkillOutput } from './commands/create-skill.js';
import { formatGenerateOutput } from './commands/generate.js';
import { formatInitOutput } from './commands/init.js';
import { formatInstallOutput } from './commands/install.js';
import { formatRegistryOutput } from './commands/registry.js';
import { formatSyncOutput } from './commands/sync.js';
import { formatUninstallOutput } from './commands/uninstall.js';
import { formatUpdateOutput } from './commands/update.js';
import { formatVersionOutput } from './commands/version.js';

export class OutputRenderer {
  constructor(private jsonMode: boolean) {}

  renderSuccess(summary: string, data: unknown, command?: string) {
    if (this.jsonMode) {
      console.log(JSON.stringify({ success: true, summary, data }, null, 2));
      return;
    }

    if (command) {
      const cmd = command.toLowerCase();
      if (cmd === 'search' && data && typeof data === 'object' && 'results' in data) {
        console.log(formatSearchResults(data as Parameters<typeof formatSearchResults>[0]));
        return;
      }
      if (cmd === 'doctor' && data && typeof data === 'object' && 'nextSteps' in data) {
        console.log(formatDoctor(data as Parameters<typeof formatDoctor>[0]));
        return;
      }
      if ((cmd === 'list' || cmd === 'ls') && data && typeof data === 'object') {
        console.log(formatListOutput(data as Parameters<typeof formatListOutput>[0]));
        return;
      }
      if ((cmd === 'validate' || cmd === 'v') && data && typeof data === 'object') {
        console.log(formatValidateOutput(data as Parameters<typeof formatValidateOutput>[0]));
        return;
      }
      if (cmd === 'benchmark' && data && typeof data === 'object') {
        console.log(formatBenchmarkOutput(data as Parameters<typeof formatBenchmarkOutput>[0]));
        return;
      }
      if (cmd === 'build' && data && typeof data === 'object') {
        console.log(formatBuildOutput(data as Parameters<typeof formatBuildOutput>[0]));
        return;
      }
      if (cmd === 'cache' && data && typeof data === 'object') {
        console.log(formatCacheOutput(data as Parameters<typeof formatCacheOutput>[0]));
        return;
      }
      if (cmd === 'config' && data && typeof data === 'object') {
        console.log(formatConfigOutput(data as Parameters<typeof formatConfigOutput>[0]));
        return;
      }
      if (cmd === 'create-skill' && data && typeof data === 'object') {
        console.log(formatCreateSkillOutput(data as Parameters<typeof formatCreateSkillOutput>[0]));
        return;
      }
      if (cmd === 'generate' && data && typeof data === 'object') {
        console.log(formatGenerateOutput(data as Parameters<typeof formatGenerateOutput>[0]));
        return;
      }
      if (cmd === 'init' && data && typeof data === 'object') {
        console.log(formatInitOutput(data as Parameters<typeof formatInitOutput>[0]));
        return;
      }
      if (cmd === 'install' && data && typeof data === 'object') {
        console.log(formatInstallOutput(data as Parameters<typeof formatInstallOutput>[0]));
        return;
      }
      if (cmd === 'registry' && data && typeof data === 'object') {
        console.log(formatRegistryOutput(data as Parameters<typeof formatRegistryOutput>[0]));
        return;
      }
      if (cmd === 'sync' && data && typeof data === 'object') {
        console.log(formatSyncOutput(data as Parameters<typeof formatSyncOutput>[0]));
        return;
      }
      if (cmd === 'uninstall' && data && typeof data === 'object') {
        console.log(formatUninstallOutput(data as Parameters<typeof formatUninstallOutput>[0]));
        return;
      }
      if (cmd === 'update' && data && typeof data === 'object') {
        console.log(formatUpdateOutput(data as Parameters<typeof formatUpdateOutput>[0]));
        return;
      }
      if (cmd === 'version' && data && typeof data === 'object') {
        console.log(formatVersionOutput(data as Parameters<typeof formatVersionOutput>[0]));
        return;
      }
    }

    logger.success(`${pc.green('✔')} ${summary}`);
    if (data && typeof data === 'object' && Object.keys(data as object).length) {
      console.log(pc.dim(JSON.stringify(data, null, 2)));
    }
  }

  renderError(summary: string, probableCause: string, suggestedFix: string, docRef?: string) {
    if (this.jsonMode) {
      console.error(
        JSON.stringify({ success: false, summary, probableCause, suggestedFix, docRef }, null, 2),
      );
    } else {
      console.error(`\n${pc.red('✖')} ${pc.bold(summary)}\n`);
      console.error(`  ${pc.bold('Fix:')} ${suggestedFix}`);
      if (docRef) console.error(`  ${pc.dim('Docs:')} ${docRef}`);
    }
  }

  renderData(data: unknown) {
    if (this.jsonMode) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(data);
    }
  }
}
