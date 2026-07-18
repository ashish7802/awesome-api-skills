import { ValidationRule, ValidationContext, Diagnostic } from '../interfaces.js';
import { validateSkillMetadata } from '@awesome-api-skills/shared-types';
import path from 'path';

let schemaPath = '';
try {
  schemaPath = require.resolve('@awesome-api-skills/shared-types/schema/skill.schema.json');
} catch {
  schemaPath = path.resolve(__dirname, '../../../../shared-types/schema/skill.schema.json');
}

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

export class MetadataSchemaValidationRule implements ValidationRule {
  id = 'V-004';
  description = 'Validates metadata.json against the official schema';
  version = '1.0.0';
  enabled = true;
  severity = 'error' as const;
  category = 'Schema Validation';

  async validate(context: ValidationContext): Promise<Diagnostic[]> {
    if (!context.metadata) {
      return []; // V-001 handles presence check
    }

    const normalizedMetadata = {
      ...context.metadata,
      id: context.metadata.id || path.basename(context.skillPath),
      name: context.metadata.name,
      description: context.metadata.description,
      version: context.metadata.version || '1.0.0',
      license: context.metadata.license || 'MIT',
      categories: context.metadata.categories || [],
      tags: context.metadata.tags || [],
      sdkLanguages: context.metadata.sdkLanguages ||
        ((context.metadata as unknown as Record<string, unknown>).languages as string[]) || [
          'typescript',
        ],
      authType: context.metadata.authType || 'api_key',
      supportedAgents: context.metadata.supportedAgents || ['cursor', 'claude-code'],
    };

    if (!normalizedMetadata.sdkLanguages || normalizedMetadata.sdkLanguages.length === 0) {
      normalizedMetadata.sdkLanguages = ['typescript'];
    }

    try {
      validateSkillMetadata(normalizedMetadata, schemaPath);
    } catch (e: unknown) {
      return [
        {
          id: 'ERR-SCHEMA-VALIDATION',
          severity: this.severity,
          category: this.category,
          rule: this.id,
          message: e instanceof Error ? e.message : String(e),
          location: { file: context.skillPath + '/metadata.json' },
          suggestion: 'Ensure metadata.json conforms to the required fields and schema format.',
        },
      ];
    }
    return [];
  }
}
