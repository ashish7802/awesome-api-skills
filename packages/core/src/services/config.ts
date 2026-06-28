import { Configuration } from '../interfaces.js';

export class ConfigurationManager {
  private config: Configuration;

  constructor(
    cliFlags?: Partial<Configuration>,
    localConfig?: Partial<Configuration>,
    userConfig?: Partial<Configuration>,
  ) {
    const globalDefaults: Configuration = {
      registryUrls: ['https://official.registry'],
      outputDir: 'dist',
      cacheDir: '.cache',
      telemetryEnabled: false,
    };

    // Resolution order: Global -> User -> Local -> CLI
    this.config = {
      ...globalDefaults,
      ...userConfig,
      ...localConfig,
      ...cliFlags,
    };
  }

  get(): Readonly<Configuration> {
    return this.config; // Immutable read-only view
  }
}
