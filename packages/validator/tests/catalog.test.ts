import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { MetadataSchemaValidationRule } from '../src/index.js';
const root = resolve(__dirname, '../../../skills');
const ids = readdirSync(root).filter((id) => statSync(join(root, id)).isDirectory());
describe('Repository skill catalog', () => {
  it.each(ids)('%s has valid metadata and nonempty instructions', async (id) => {
    const skillPath = join(root, id);
    const metadata = JSON.parse(readFileSync(join(skillPath, 'metadata.json'), 'utf8'));
    expect(readFileSync(join(skillPath, 'SKILL.md'), 'utf8').trim().length).toBeGreaterThan(0);
    expect(
      await new MetadataSchemaValidationRule().validate({
        skillPath,
        metadata,
        contentHash: 'present',
      }),
    ).toEqual([]);
  });
});
