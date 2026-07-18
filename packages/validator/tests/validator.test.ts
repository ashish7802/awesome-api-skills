import { describe, it, expect } from 'vitest';
import {
  ValidatorEngine,
  MetadataPresenceRule,
  MetadataSchemaValidationRule,
  ValidationContext,
} from '../src/index.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';

describe('Validator Engine', () => {
  it('should execute rules and handle severity appropriately', async () => {
    const engine = new ValidatorEngine();
    engine.registerRule(new MetadataPresenceRule());

    const result = await engine.validateSkill({
      skillPath: '/fake/skill',
      contentHash: 'hash1',
    });

    expect(result.isValid).toBe(false);
    expect(result.diagnostics.length).toBe(1);
    expect(result.diagnostics[0].severity).toBe('error');
  });

  it('should support incremental validation skipping unchanged', async () => {
    const engine = new ValidatorEngine();
    let executions = 0;

    engine.registerRule({
      id: 'test',
      description: '',
      version: '',
      enabled: true,
      severity: 'info',
      category: '',
      validate: async () => {
        executions++;
        return [];
      },
    });

    const ctx = { skillPath: '/skill', contentHash: 'abc' };

    await engine.validateSkill(ctx); // executions = 1
    await engine.validateSkill(ctx); // cached, executions = 1

    expect(executions).toBe(1);
  });

  it('should validate multiple skills concurrently in parallel', async () => {
    const engine = new ValidatorEngine();
    engine.registerRule(new MetadataPresenceRule());

    const contexts: ValidationContext[] = [
      {
        skillPath: '/skill1',
        contentHash: '1',
        metadata: { id: 's1' } as unknown as SkillMetadata,
      },
      { skillPath: '/skill2', contentHash: '2' },
    ];

    const results = await engine.validateAll(contexts);
    expect(results.length).toBe(2);
    expect(results[0].isValid).toBe(true);
    expect(results[1].isValid).toBe(false); // missing metadata
  });

  it('should format output correctly for GithubActionsReporter', async () => {
    const { GithubActionsReporter } = await import('../src/reporters/index.js');
    const reporter = new GithubActionsReporter();

    const out = reporter.report([
      {
        skillId: 's1',
        isValid: false,
        diagnostics: [
          {
            id: '1',
            severity: 'error',
            category: 'cat',
            rule: 'r1',
            message: 'err msg',
            location: { file: 'file.txt', line: 10 },
          },
        ],
      },
    ]);

    expect(out).toContain('::error file=file.txt,line=10::err msg');
  });

  it('should validate metadata against JSON schema using MetadataSchemaValidationRule', async () => {
    const engine = new ValidatorEngine();
    engine.registerRule(new MetadataSchemaValidationRule());

    // Invalid metadata (categories must be an array, but we pass a string)
    const invalidMetadata = {
      id: 'test-skill',
      name: 'Test Skill',
      description: 'A test skill description',
      categories: 'not-an-array',
    } as unknown as SkillMetadata;

    const result = await engine.validateSkill({
      skillPath: '/fake/skill',
      contentHash: 'hash-test',
      metadata: invalidMetadata,
    });

    expect(result.isValid).toBe(false);
    expect(result.diagnostics.length).toBe(1);
    expect(result.diagnostics[0].id).toBe('ERR-SCHEMA-VALIDATION');
  });
});
