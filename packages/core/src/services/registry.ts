import { RegistryCache, SyncEngine } from '@awesome-api-skills/registry';

export class RegistryManager {
  private cache: RegistryCache;

  constructor() {
    this.cache = new RegistryCache();
  }

  async syncAll(urls: string[]) {
    // Orchestrates syncing across multiple registry URLs
    const engine = new SyncEngine(this.cache);
    for (const url of urls) {
      const client = {
        id: url,
        getManifest: async () => null,
        fetchSkills: async () => ({ skills: [] }),
      } as unknown as Parameters<typeof engine.syncRegistry>[0];
      await engine.syncRegistry(client);
    }
  }

  getCache() {
    return this.cache;
  }
}
