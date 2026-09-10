import { it, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
const cli = resolve(__dirname, '../dist/bin.js');
it('returns a failing exit status and JSON result for invalid workspaces and unknown skills', () => {
  const dir = mkdtempSync(join(tmpdir(), 'skill-cli-'));
  try {
    mkdirSync(join(dir, 'skills/broken'), { recursive: true });
    const invalid = spawnSync(process.execPath, [cli, 'validate', '--json'], {
      cwd: dir,
      encoding: 'utf8',
    });
    expect(invalid.status).toBe(1);
    expect(JSON.parse(invalid.stdout).success).toBe(false);
    expect(JSON.parse(invalid.stdout).data.valid).toBe(false);
    const unknown = spawnSync(process.execPath, [cli, 'validate', 'missing', '--json'], {
      cwd: dir,
      encoding: 'utf8',
    });
    expect(unknown.status).toBe(1);
    expect(unknown.stderr).toContain('Unknown skill');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}, 15000);
