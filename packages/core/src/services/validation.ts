import {
  ValidatorEngine,
  MetadataPresenceRule,
  ValidationContext,
} from '@awesome-api-skills/validator';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

export class ValidationManager {
  private engine: ValidatorEngine;

  constructor() {
    this.engine = new ValidatorEngine();
    this.engine.registerRule(new MetadataPresenceRule());
  }

  async validate(skills: { path: string; metadata: SkillMetadata }[]) {
    const contexts: ValidationContext[] = skills.map((s) => ({
      skillPath: s.path,
      metadata: s.metadata,
      contentHash: 'content-hash-mock',
    }));
    return this.engine.validateAll(contexts);
  }
}
