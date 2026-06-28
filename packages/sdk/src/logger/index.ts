import { Logger } from '../types/index.js';

export class DefaultLogger implements Logger {
  info(msg: string) {
    console.info(msg);
  }
  warn(msg: string) {
    console.warn(msg);
  }
  error(msg: string | Error) {
    console.error(msg);
  }
  debug(msg: string) {
    console.debug(msg);
  }
}
