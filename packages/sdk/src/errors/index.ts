export class SDKError extends Error {
  public code: string;
  constructor(message: string, code: string) {
    super(message);
    this.name = 'SDKError';
    this.code = code;
  }
}

export class PluginValidationError extends SDKError {
  constructor(message: string) {
    super(message, 'ERR_PLUGIN_VALIDATION');
    this.name = 'PluginValidationError';
  }
}

export class IncompatibleVersionError extends SDKError {
  constructor(message: string) {
    super(message, 'ERR_INCOMPATIBLE_VERSION');
    this.name = 'IncompatibleVersionError';
  }
}
