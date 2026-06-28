import { RegistryClient, SyncProgress } from '../interfaces.js';
import { RegistryCache } from '../cache/index.js';

export class SyncEngine {
  constructor(private cache: RegistryCache) {}

  async syncRegistry(
    client: RegistryClient,
    onProgress?: (p: SyncProgress) => void,
    signal?: AbortSignal,
  ): Promise<void> {
    try {
      onProgress?.({
        status: 'starting',
        total: 0,
        current: 0,
        message: 'Connecting to ' + client.id,
      });

      const manifest = await client.getManifest().catch(() => null);
      if (!manifest) {
        throw new Error('Unreachable registry');
      }

      if (signal?.aborted) throw new Error('Cancelled');

      onProgress?.({
        status: 'downloading',
        total: manifest.totalSkills,
        current: 0,
        message: 'Fetching skills',
      });
      const { skills } = await client.fetchSkills();

      onProgress?.({
        status: 'indexing',
        total: skills.length,
        current: 0,
        message: 'Updating cache',
      });
      for (let i = 0; i < skills.length; i++) {
        if (signal?.aborted) throw new Error('Cancelled');
        this.cache.set(skills[i], client.id);
        onProgress?.({
          status: 'indexing',
          total: skills.length,
          current: i + 1,
          message: 'Updating cache',
        });
      }

      onProgress?.({
        status: 'completed',
        total: skills.length,
        current: skills.length,
        message: 'Sync complete',
      });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      onProgress?.({ status: 'failed', total: 0, current: 0, message: msg });
      // We do not crash the CLI, just swallow and report
    }
  }
}
