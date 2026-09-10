const { spawnSync } = require('node:child_process');
const path = require('node:path');
const result = spawnSync(
  process.execPath,
  [path.resolve(__dirname, '../../packages/cli/dist/bin.js'), 'validate'],
  { stdio: 'inherit' },
);
if (result.error) console.error(result.error);
process.exitCode = result.status ?? 1;
