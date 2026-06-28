import { ValidationResult, Reporter } from '../interfaces.js';

export class JsonReporter implements Reporter {
  report(results: ValidationResult[]): string {
    return JSON.stringify(results, null, 2);
  }
}

export class TerminalReporter implements Reporter {
  report(results: ValidationResult[]): string {
    let out = '';
    for (const res of results) {
      out += `\nSkill: ${res.skillId} - ${res.isValid ? 'PASS' : 'FAIL'}\n`;
      for (const diag of res.diagnostics) {
        out += `  [${diag.severity.toUpperCase()}] ${diag.rule}: ${diag.message} (${diag.location.file})\n`;
      }
    }
    return out;
  }
}

export class GithubActionsReporter implements Reporter {
  report(results: ValidationResult[]): string {
    let out = '';
    for (const res of results) {
      for (const diag of res.diagnostics) {
        const type =
          diag.severity === 'error' || diag.severity === 'critical' ? 'error' : 'warning';
        // ::error file=app.js,line=1::Missing semicolon
        const line = diag.location.line ? `,line=${diag.location.line}` : '';
        out += `::${type} file=${diag.location.file}${line}::${diag.message}\n`;
      }
    }
    return out;
  }
}
