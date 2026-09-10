import { ValidationContext, ValidationResult, ValidationRule, Diagnostic } from '../interfaces.js';

export class ValidatorEngine {
  private rules: ValidationRule[] = [];
  private cache = new Map<string, { key: string; result: ValidationResult }>();

  registerRule(rule: ValidationRule) {
    this.rules.push(rule);
    this.clearCache();
  }

  async validateSkill(context: ValidationContext): Promise<ValidationResult> {
    // Incremental validation
    const cached = this.cache.get(context.skillPath);
    const key = JSON.stringify([
      context.contentHash,
      context.metadata,
      this.rules.map((r) => [r.id, r.version, r.enabled, r.severity]),
    ]);
    if (cached && cached.key === key) {
      return structuredClone(cached.result);
    }

    const diagnostics: Diagnostic[] = [];
    const activeRules = this.rules.filter((r) => r.enabled);

    // Execute rules concurrently for this skill
    const results = await Promise.all(
      activeRules.map((r) =>
        r.validate(context).catch((e) => {
          return [
            {
              id: 'SYSTEM_ERROR',
              severity: 'critical' as const,
              category: 'System',
              rule: r.id,
              message: e instanceof Error ? e.message : String(e),
              location: { file: context.skillPath },
            },
          ];
        }),
      ),
    );

    for (const res of results) {
      diagnostics.push(...res);
    }

    const hasErrors = diagnostics.some((d) => d.severity === 'error' || d.severity === 'critical');

    const finalResult: ValidationResult = {
      skillId: context.metadata?.id || context.skillPath,
      isValid: !hasErrors,
      diagnostics,
    };

    // Store with hash
    this.cache.set(context.skillPath, { key, result: structuredClone(finalResult) });

    return { ...finalResult }; // return unmutated id
  }

  async validateAll(contexts: ValidationContext[]): Promise<ValidationResult[]> {
    // Parallel validation across multiple skills
    return Promise.all(contexts.map((ctx) => this.validateSkill(ctx)));
  }

  clearCache() {
    this.cache.clear();
  }
}
