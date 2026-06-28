import { SkillMetadata } from '@awesome-api-skills/shared-types';

export interface CacheEntry {
  skill: SkillMetadata;
  registryId: string;
  updatedAt: number;
}

export class RegistryCache {
  private memoryCache: Map<string, CacheEntry> = new Map();
  private ttlMs: number = 1000 * 60 * 60; // 1 hour TTL

  constructor(private isOffline: boolean = false) {}

  setOfflineMode(offline: boolean) {
    this.isOffline = offline;
  }

  set(skill: SkillMetadata, registryId: string) {
    this.memoryCache.set(skill.id, { skill, registryId, updatedAt: Date.now() });
  }

  get(skillId: string): CacheEntry | null {
    const entry = this.memoryCache.get(skillId);
    if (!entry) return null;

    // In offline mode, ignore TTL
    if (!this.isOffline && Date.now() - entry.updatedAt > this.ttlMs) {
      this.memoryCache.delete(skillId);
      return null;
    }
    return entry;
  }

  getAll(): CacheEntry[] {
    return Array.from(this.memoryCache.values());
  }

  clear() {
    this.memoryCache.clear();
  }
}
