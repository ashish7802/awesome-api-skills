import { BaseRegistry } from './base.js';
import { RegistryManifest, RegistryTrustModel } from '../interfaces.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

export class RemoteRegistry extends BaseRegistry {
  constructor(
    id: string,
    type: 'official' | 'community' | 'enterprise',
    priority: number,
    endpoint: string,
  ) {
    super(id, type, priority, endpoint);
  }
  async getManifest(): Promise<RegistryManifest> {
    // Stub remote fetch
    return {
      registryId: this.id,
      registryVersion: '1.0.0',
      schemaVersion: '1.0.0',
      owner: 'remote',
      verified: this.type === 'official',
      endpoint: this.endpoint,
      updatedAt: new Date().toISOString(),
      supportedSpecification: '1.0.0',
      supportedSchema: '1.0.0',
      totalSkills: 0,
    };
  }
  async fetchSkills(): Promise<{ skills: SkillMetadata[]; trust: RegistryTrustModel }> {
    return { skills: [], trust: {} };
  }
}
