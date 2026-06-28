import { RegistryClient, RegistryManifest, RegistryTrustModel } from '../interfaces.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

export abstract class BaseRegistry implements RegistryClient {
  constructor(
    public id: string,
    public type: string,
    public priority: number,
    protected endpoint: string,
  ) {}

  abstract getManifest(): Promise<RegistryManifest>;
  abstract fetchSkills(
    since?: string,
  ): Promise<{ skills: SkillMetadata[]; trust: RegistryTrustModel }>;
}
