import { RegistryCache, SyncEngine } from '@awesome-api-skills/registry';

export class RegistryManager {
  private cache: RegistryCache;

  constructor() {
    this.cache = new RegistryCache();
  }

  async syncAll(urls: string[]) {
    // Orchestrates syncing
    const engine = new SyncEngine(this.cache);
    for (const url of urls) {
      // mocked logic for testability
      await engine.sync(url as unknown as Parameters<typeof engine.sync>[0]);
    }
  }

  getCache() {
    return this.cache;
  }
}
