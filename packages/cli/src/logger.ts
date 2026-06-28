import pc from 'picocolors';

export enum LogLevel {
  SILENT = 0,
  ERROR = 1,
  WARN = 2,
  INFO = 3,
  DEBUG = 4,
  TRACE = 5,
}

export class Logger {
  private level: LogLevel = LogLevel.INFO;
  private isTTY: boolean = process.stdout.isTTY && !process.env.CI;

  setLevel(level: LogLevel) {
    this.level = level;
  }

  error(msg: string) {
    if (this.level >= LogLevel.ERROR) console.error(this.isTTY ? pc.red(msg) : msg);
  }

  warn(msg: string) {
    if (this.level >= LogLevel.WARN) console.warn(this.isTTY ? pc.yellow(msg) : msg);
  }

  info(msg: string) {
    if (this.level >= LogLevel.INFO) console.log(this.isTTY ? msg : msg);
  }

  success(msg: string) {
    if (this.level >= LogLevel.INFO) console.log(this.isTTY ? pc.green(msg) : msg);
  }

  debug(msg: string) {
    if (this.level >= LogLevel.DEBUG) console.debug(this.isTTY ? pc.dim(msg) : msg);
  }
}

export const logger = new Logger();
