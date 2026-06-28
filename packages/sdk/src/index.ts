import { AwesomePlugin, PluginContext } from './types/index.js';
import { DefaultLogger } from './logger/index.js';
import { DefaultEventBus, createEvent } from './events/index.js';
import { LifecycleManager } from './lifecycle/index.js';
import { PluginValidationError, IncompatibleVersionError } from './errors/index.js';

export * from './types/index.js';
export * from './errors/index.js';
export * from './events/index.js';
export * from './logger/index.js';
export * from './lifecycle/index.js';
export * from './installer/index.js';
export * from './registry/index.js';
export * from './validator/index.js';
export * from './generator/index.js';
export * from './exporter/index.js';

export const API_VERSION = '1.0.0';
export const MIN_SUPPORTED_VERSION = '1.0.0';

export class SDKCore {
  private logger = new DefaultLogger();
  public events = new DefaultEventBus();
  public lifecycle = new LifecycleManager();

  public get context(): PluginContext {
    return {
      logger: this.logger,
      events: this.events,
    };
  }

  public registerPlugin(plugin: AwesomePlugin): void {
    if (!plugin.metadata) {
      throw new PluginValidationError('Plugin missing metadata');
    }
    const { id, name, version, apiVersion, capabilities } = plugin.metadata;
    if (!id || !name || !version || !apiVersion || !capabilities) {
      throw new PluginValidationError('Plugin metadata missing required fields');
    }

    if (!this.isCompatible(apiVersion)) {
      this.events.emit(
        createEvent('PluginFailed', { pluginId: id, reason: 'Incompatible version' }),
      );
      throw new IncompatibleVersionError(
        'Plugin ' + id + ' requires apiVersion ' + apiVersion + ', which is incompatible.',
      );
    }

    this.lifecycle.register(plugin);
    this.events.emit(createEvent('PluginLoaded', { pluginId: id, name }));
  }

  private isCompatible(apiVersion: string): boolean {
    // Basic semver check stub - assumes exact major match for now
    return apiVersion.startsWith(MIN_SUPPORTED_VERSION.split('.')[0]);
  }
}
