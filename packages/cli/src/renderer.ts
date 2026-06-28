import { logger } from './logger.js';
import pc from 'picocolors';

export class OutputRenderer {
  constructor(private jsonMode: boolean) {}

  renderSuccess(summary: string, data: unknown) {
    if (this.jsonMode) {
      console.log(JSON.stringify({ success: true, summary, data }, null, 2));
    } else {
      logger.success(`✔ ${summary}`);
    }
  }

  renderError(summary: string, probableCause: string, suggestedFix: string, docRef?: string) {
    if (this.jsonMode) {
      console.error(
        JSON.stringify({ success: false, summary, probableCause, suggestedFix, docRef }, null, 2),
      );
    } else {
      logger.error(`\n✖ ${pc.bold(summary)}\n`);
      logger.error(`  ${pc.bold('Cause:')} ${probableCause}`);
      logger.error(`  ${pc.bold('Fix:')}   ${suggestedFix}`);
      if (docRef) logger.info(`\n  ${pc.dim('Docs:')} ${pc.dim(pc.underline(docRef))}`);
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
