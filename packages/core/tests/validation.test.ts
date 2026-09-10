import { it, expect } from 'vitest';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  Container,
  ConfigurationManager,
  WorkspaceManager,
  ValidationManager,
  Workflows,
} from '../src/index.js';
it('reports missing and malformed metadata and missing Markdown through workspace validation', async () => {
  const root = mkdtempSync(join(tmpdir(), 'skill-validation-'));
  try {
    for (const id of ['missing', 'malformed', 'no-markdown'])
      mkdirSync(join(root, 'skills', id), { recursive: true });
    writeFileSync(join(root, 'skills/malformed/metadata.json'), '{bad');
    writeFileSync(
      join(root, 'skills/no-markdown/metadata.json'),
      JSON.stringify({ name: 'Test', description: 'Test' }),
    );
    const c = new Container();
    c.register('WorkspaceManager', new WorkspaceManager(new ConfigurationManager()));
    c.register('ValidationManager', new ValidationManager());
    const { results } = await new Workflows(c).validateWorkspace(root);
    expect(results).toHaveLength(3);
    expect(results.every((r) => !r.isValid)).toBe(true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
