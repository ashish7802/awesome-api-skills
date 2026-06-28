import { BaseRegistry } from './base.js';
import { RegistryManifest, RegistryTrustModel } from '../interfaces.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

export class LocalRegistry extends BaseRegistry {
  constructor(id: string, endpoint: string) {
    super(id, 'local', 100, endpoint);
  }
  async getManifest(): Promise<RegistryManifest> {
    return {
      registryId: this.id,
      registryVersion: '1.0.0',
      schemaVersion: '1.0.0',
      owner: 'local',
      verified: true,
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
