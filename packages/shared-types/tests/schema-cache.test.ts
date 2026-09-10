import { it, expect } from 'vitest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateSkillMetadata } from '../src/validators/index.js';
it('validates new data on cache hits and recompiles a changed schema', () => {
  const dir = mkdtempSync(join(tmpdir(), 'skill-schema-'));
  try {
    const file = join(dir, 'schema.json');
    writeFileSync(file, JSON.stringify({ type: 'string' }));
    expect(validateSkillMetadata('valid', file)).toBe(true);
    expect(() => validateSkillMetadata(123, file)).toThrow('ValidationError');
    writeFileSync(file, JSON.stringify({ type: 'number' }));
    expect(validateSkillMetadata(123, file)).toBe(true);
    expect(() => validateSkillMetadata('invalid', file)).toThrow('ValidationError');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
