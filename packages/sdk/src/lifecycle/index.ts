import { AwesomePlugin, PluginContext, LifecycleHooks } from '../types/index.js';

export class LifecycleManager {
  private plugins: AwesomePlugin[] = [];

  register(plugin: AwesomePlugin) {
    this.plugins.push(plugin);
  }

  async runHook<K extends keyof LifecycleHooks>(
    hookName: K,
    context: PluginContext,
    ...args: unknown[]
  ): Promise<void> {
    for (const plugin of this.plugins) {
      if (plugin.hooks && plugin.hooks[hookName]) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hook = plugin.hooks[hookName] as any;
        await hook(context, ...args);
      }
    }
  }
}
