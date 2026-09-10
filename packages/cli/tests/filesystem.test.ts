import { it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const cli = resolve(__dirname, '../dist/bin.js');
it('clears cache while preserving built output and rejects traversing skill IDs', () => {
  const root = mkdtempSync(join(tmpdir(), 'skill-filesystem-'));
  try {
    mkdirSync(join(root, 'dist'));
    mkdirSync(join(root, '.cache'));
    writeFileSync(join(root, 'dist/index.html'), 'keep');
    writeFileSync(join(root, '.cache/entry'), 'cached');
    const result = spawnSync(process.execPath, [cli, 'cache', 'clear', '--json'], {
      cwd: root,
      encoding: 'utf8',
    });
    expect(result.status).toBe(0);
    expect(existsSync(join(root, '.cache'))).toBe(false);
    expect(readFileSync(join(root, 'dist/index.html'), 'utf8')).toBe('keep');
    for (const command of ['install', 'uninstall', 'create-skill', 'update']) {
      for (const id of ['../dist']) {
        const invalid = spawnSync(process.execPath, [cli, command, id, '--json'], {
          cwd: root,
          encoding: 'utf8',
        });
        expect(invalid.status).toBe(1);
        expect(invalid.stderr).toContain('Skill ID');
      }
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}, 30000);
