import { describe, it, expect } from 'vitest';
import { Category, AgentType } from '../src/enums/index.js';
import { validateSkillMetadata } from '../src/validators/index.js';
import * as path from 'path';

describe('Enums', () => {
  it('should serialize correctly', () => {
    expect(Category.AI).toBe('AI');
    expect(AgentType.ClaudeCode).toBe('claude-code');
  });
});

describe('Validation', () => {
  it('should validate valid skill metadata', () => {
    const validMetadata = {
      id: 'test',
      name: 'Test',
      description: 'Test description',
      version: '1.0.0',
      license: 'MIT',
      categories: ['AI'],
      tags: ['test'],
      sdkLanguages: ['typescript'],
      authType: 'api_key',
      supportedAgents: ['cursor'],
    };

    const schemaPath = path.resolve(__dirname, '../schema/skill.schema.json');
    expect(validateSkillMetadata(validMetadata, schemaPath)).toBe(true);
  });

  it('should throw on invalid skill metadata', () => {
    const invalidMetadata = {
      id: 'test', // missing required fields
    };

    const schemaPath = path.resolve(__dirname, '../schema/skill.schema.json');
    expect(() => validateSkillMetadata(invalidMetadata, schemaPath)).toThrow(/ValidationError/);
  });
});
