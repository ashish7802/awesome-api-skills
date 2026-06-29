import { logger } from './logger.js';
import pc from 'picocolors';
import { formatSearchResults } from './commands/search.js';
import { formatDoctor } from './commands/doctor.js';

export class OutputRenderer {
  constructor(private jsonMode: boolean) {}

  renderSuccess(summary: string, data: unknown, command?: string) {
    if (this.jsonMode) {
      console.log(JSON.stringify({ success: true, summary, data }, null, 2));
      return;
    }

    if (command === 'search' && data && typeof data === 'object' && 'results' in data) {
      console.log(formatSearchResults(data as Parameters<typeof formatSearchResults>[0]));
      return;
    }

    if (command === 'doctor' && data && typeof data === 'object' && 'nextSteps' in data) {
      console.log(formatDoctor(data as Parameters<typeof formatDoctor>[0]));
      return;
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
