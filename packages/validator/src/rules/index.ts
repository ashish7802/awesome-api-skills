import { ValidationRule, ValidationContext, Diagnostic } from '../interfaces.js';

export class MetadataPresenceRule implements ValidationRule {
  id = 'V-001';
  description = 'Ensures metadata is present';
  version = '1.0.0';
  enabled = true;
  severity = 'error' as const;
  category = 'Metadata Validation';

  async validate(context: ValidationContext): Promise<Diagnostic[]> {
    if (!context.metadata) {
      return [
        {
          id: 'ERR-META-MISSING',
          severity: this.severity,
          category: this.category,
          rule: this.id,
          message: 'metadata.json is missing or could not be parsed.',
          location: { file: context.skillPath + '/metadata.json' },
          suggestion: 'Create a metadata.json file conforming to the schema.',
        },
      ];
    }
    return [];
  }
}

export class SkillMarkdownPresenceRule implements ValidationRule {
  id = 'V-002';
  description = 'Ensures SKILL.md file exists in skill folder';
  version = '1.0.0';
  enabled = true;
  severity = 'error' as const;
  category = 'Structure Validation';

  async validate(context: ValidationContext): Promise<Diagnostic[]> {
    if (!context.contentHash || context.contentHash === 'empty') {
      return [
        {
          id: 'ERR-SKILL-MD-MISSING',
          severity: this.severity,
          category: this.category,
          rule: this.id,
          message: 'SKILL.md is missing in skill directory.',
          location: { file: context.skillPath + '/SKILL.md' },
          suggestion: 'Create a SKILL.md document defining API instructions.',
        },
      ];
    }
    return [];
  }
}

export class LastVerifiedMetadataRule implements ValidationRule {
  id = 'V-003';
  description = 'Ensures lastVerified field is set in metadata';
  version = '1.0.0';
  enabled = true;
  severity = 'warning' as const;
  category = 'Trust & Accuracy';

  async validate(context: ValidationContext): Promise<Diagnostic[]> {
    if (context.metadata && !context.metadata.lastVerified) {
      return [
        {
          id: 'WARN-LAST-VERIFIED-MISSING',
          severity: this.severity,
          category: this.category,
          rule: this.id,
          message: 'metadata.json is missing lastVerified timestamp.',
          location: { file: context.skillPath + '/metadata.json' },
          suggestion: 'Add lastVerified ISO timestamp (YYYY-MM-DD) to metadata.json.',
        },
      ];
    }
    return [];
  }
}
