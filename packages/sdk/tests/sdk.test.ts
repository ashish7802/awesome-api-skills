import { describe, it, expect } from 'vitest';
import {
  SDKCore,
  AwesomePlugin,
  PluginValidationError,
  IncompatibleVersionError,
} from '../src/index.js';

describe('SDK Core', () => {
  it('should register a valid plugin and emit PluginLoaded', () => {
    const sdk = new SDKCore();
    let loadedEventFired = false;
    sdk.events.on('PluginLoaded', () => {
      loadedEventFired = true;
    });

    const plugin: AwesomePlugin = {
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
        apiVersion: '1.0.0',
        capabilities: ['installer'],
      },
    };

    sdk.registerPlugin(plugin);
    expect(loadedEventFired).toBe(true);
  });

  it('should throw PluginValidationError for missing fields', () => {
    const sdk = new SDKCore();
    const plugin = { metadata: { id: 'test' } } as unknown as AwesomePlugin; // missing fields
    expect(() => sdk.registerPlugin(plugin)).toThrow(PluginValidationError);
  });

  it('should throw IncompatibleVersionError for unsupported apiVersion', () => {
    const sdk = new SDKCore();
    const plugin: AwesomePlugin = {
      metadata: {
        id: 'test-plugin',
        name: 'Test Plugin',
        version: '1.0.0',
        apiVersion: '99.0.0', // Unsupported
        capabilities: ['installer'],
      },
    };
    expect(() => sdk.registerPlugin(plugin)).toThrow(IncompatibleVersionError);
  });

  it('should execute lifecycle hooks', async () => {
    const sdk = new SDKCore();
    let hookExecuted = false;

    const plugin: AwesomePlugin = {
      metadata: {
        id: 'test',
        name: 'Test',
        version: '1.0.0',
        apiVersion: '1.0.0',
        capabilities: [],
      },
      hooks: {
        beforeInstall: async () => {
          hookExecuted = true;
        },
      },
    };

    sdk.registerPlugin(plugin);
    await sdk.lifecycle.runHook('beforeInstall', sdk.context, {} as unknown);
    expect(hookExecuted).toBe(true);
  });
});
