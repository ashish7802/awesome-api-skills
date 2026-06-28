import { SkillMetadata } from '@awesome-api-skills/shared-types';

export type DiagnosticSeverity = 'info' | 'warning' | 'error' | 'critical';

export interface ValidationLocation {
  file: string;
  line?: number;
  column?: number;
}

export interface Diagnostic {
  id: string;
  severity: DiagnosticSeverity;
  category: string;
  rule: string;
  message: string;
  location: ValidationLocation;
  suggestion?: string;
  documentationReference?: string;
}

export interface ValidationResult {
  skillId: string;
  isValid: boolean;
  diagnostics: Diagnostic[];
}

export interface ValidationContext {
  skillPath: string;
  metadata?: SkillMetadata;
  contentHash: string; // Used for incremental validation
}

export interface ValidationRule {
  id: string;
  description: string;
  version: string;
  enabled: boolean;
  severity: DiagnosticSeverity;
  category: string;
  validate(context: ValidationContext): Promise<Diagnostic[]>;
}

export interface Reporter {
  report(results: ValidationResult[]): string;
}
