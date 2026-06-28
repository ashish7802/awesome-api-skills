import { describe, it, expect, vi } from 'vitest';
import {
  RegistryResolver,
  LocalRegistry,
  RemoteRegistry,
  RegistryCache,
  SyncEngine,
  SearchIndex,
} from '../src/index.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

describe('Registry Resolution', () => {
  it('should resolve registries in priority order', () => {
    const resolver = new RegistryResolver();
    resolver.register(new RemoteRegistry('remote-1', 'community', 50, 'url'));
    resolver.register(new LocalRegistry('local-1', 'path')); // Priority 100
    resolver.register(new RemoteRegistry('official', 'official', 10, 'url')); // Priority 10

    const sorted = resolver.getRegistries();
    expect(sorted[0].id).toBe('official');
    expect(sorted[1].id).toBe('remote-1');
    expect(sorted[2].id).toBe('local-1');
  });
});

describe('Registry Cache & Offline Mode', () => {
  it('should store and retrieve skills', () => {
    const cache = new RegistryCache();
    const mockSkill = { id: 'stripe', name: 'Stripe' } as unknown as SkillMetadata;
    cache.set(mockSkill, 'official');

    expect(cache.get('stripe')?.registryId).toBe('official');
  });

  it('should respect offline mode ignoring TTL', () => {
    const cache = new RegistryCache(true); // offline true
    const mockSkill = { id: 'stripe', name: 'Stripe' } as unknown as SkillMetadata;
    cache.set(mockSkill, 'official');

    // forcefully age the entry
    const entries = cache.getAll();
    entries[0].updatedAt = Date.now() - 100000000;

    // Should still resolve because offline mode ignores TTL
    expect(cache.get('stripe')).toBeDefined();
  });
});

describe('Sync Engine', () => {
  it('should handle unreachable registries without crashing', async () => {
    const cache = new RegistryCache();
    const engine = new SyncEngine(cache);

    const badRegistry = new RemoteRegistry('bad', 'community', 10, 'url');
    vi.spyOn(badRegistry, 'getManifest').mockRejectedValue(new Error('Network error'));

    let lastStatus = '';
    await engine.syncRegistry(badRegistry, (p) => {
      lastStatus = p.status;
    });

    expect(lastStatus).toBe('failed');
  });

  it('should allow cancellation via AbortSignal', async () => {
    const cache = new RegistryCache();
    const engine = new SyncEngine(cache);
    const registry = new LocalRegistry('local', 'path');

    const controller = new AbortController();
    controller.abort(); // pre-abort

    let lastStatus = '';
    await engine.syncRegistry(
      registry,
      (p) => {
        lastStatus = p.status;
      },
      controller.signal,
    );

    expect(lastStatus).toBe('failed'); // Cancelled
  });
});

describe('Search Index', () => {
  it('should find skills by term and category', () => {
    const cache = new RegistryCache();
    const mock1 = {
      id: 'a',
      name: 'Stripe Payments',
      description: '',
      categories: ['Payments'],
      sdkLanguages: [],
      tags: [],
      popularity: 10,
    } as unknown as SkillMetadata;
    const mock2 = {
      id: 'b',
      name: 'Auth0',
      description: 'Auth',
      categories: ['Authentication'],
      sdkLanguages: [],
      tags: [],
      popularity: 5,
    } as unknown as SkillMetadata;

    cache.set(mock1, 'reg1');
    cache.set(mock2, 'reg1');

    const search = new SearchIndex(cache);
    const results = search.search({ term: 'stripe' });
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('a');

    const catResults = search.search({ category: 'Authentication' });
    expect(catResults.length).toBe(1);
    expect(catResults[0].id).toBe('b');
  });
});
