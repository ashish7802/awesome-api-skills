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
