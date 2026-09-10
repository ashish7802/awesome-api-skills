import { describe, it, expect } from 'vitest';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import {
  SearchIndexPlugin,
  RegistryPlugin,
  IntegrityReportPlugin,
  GeneratorCache,
  BuildGraph,
} from '../src/index.js';
import { SkillMetadata } from '@awesome-api-skills/shared-types';
describe('Artifact cache regressions', () => {
  it('regenerates same-length edits, deleted outputs and different destinations with real checksums', async () => {
    const dir = mkdtempSync(join(tmpdir(), 'skill-generator-'));
    try {
      const plugins = [new SearchIndexPlugin(), new RegistryPlugin(), new IntegrityReportPlugin()];
      const skill = {
        id: 'test',
        name: 'Alpha',
        tags: [],
        categories: [],
      } as unknown as SkillMetadata;
      const context = {
        skills: [skill],
        outputDir: dir,
        cache: new GeneratorCache(),
        graph: new BuildGraph(),
        isIncremental: true,
      };
      for (const p of plugins) await p.generate(context);
      skill.name = 'Bravo';
      for (const p of plugins) expect((await p.generate(context)).outputsCreated).toBe(1);
      expect(JSON.parse(readFileSync(join(dir, 'search-index.json'), 'utf8'))[0].name).toBe(
        'Bravo',
      );
      expect(JSON.parse(readFileSync(join(dir, 'integrity-report.json'), 'utf8'))[0].checksum).toBe(
        createHash('sha256').update(JSON.stringify(skill)).digest('hex'),
      );
      rmSync(join(dir, 'search-index.json'));
      expect((await plugins[0].generate(context)).outputsCreated).toBe(1);
      expect(
        (await plugins[0].generate({ ...context, outputDir: join(dir, 'other') })).outputsCreated,
      ).toBe(1);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
});
