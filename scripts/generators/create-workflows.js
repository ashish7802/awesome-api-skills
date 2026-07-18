const fs = require('fs');
const path = require('path');

const workflowsDir = path.join(__dirname, '../../.github', 'workflows');

const templates = {
  'tests.yml': { name: 'Tests', command: 'pnpm test' },
  'build.yml': { name: 'Build', command: 'pnpm build' },
  'docs.yml': { name: 'Documentation', command: 'pnpm --filter @awesome-api-skills/docs build' },
  'benchmarks.yml': { name: 'Benchmarks', command: 'pnpm run benchmark' },
  'snapshots.yml': { name: 'Snapshot Tests', command: 'pnpm test -u --passWithNoTests' },
  'registry.yml': { name: 'Registry Sync', command: 'npx tsx scripts/dev/dogfood.ts' },
};

const matrixStr = `
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [22.x, 24.x]
`;

Object.entries(templates).forEach(([file, data]) => {
  const content = `name: ${data.name}

on:
  push:
    branches: [main]
  pull_request:

jobs:
  execute:
    name: ${data.name}
    runs-on: \${{ matrix.os }}
${matrixStr}
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - name: Setup Node.js \${{ matrix.node-version }}
        uses: actions/setup-node@v4
        with:
          node-version: \${{ matrix.node-version }}
          cache: 'pnpm'
          
      - name: Install dependencies
        run: pnpm install --frozen-lockfile
        
      - name: Run ${data.name}
        run: ${data.command}
`;
  fs.writeFileSync(path.join(workflowsDir, file), content);
});

// Write security.yml
const securityContent = `name: Security
on:
  push:
    branches: [main]
  pull_request:
  schedule:
    - cron: '44 19 * * 0'

jobs:
  analyze:
    name: Analyze CodeQL
    runs-on: ubuntu-latest
    permissions:
      actions: read
      contents: read
      security-events: write

    steps:
    - name: Checkout repository
      uses: actions/checkout@v4

    - name: Initialize CodeQL
      uses: github/codeql-action/init@v3
      with:
        languages: javascript, typescript

    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v3
      with:
        category: "/language:javascript"

  dependency-review:
    name: Dependency Review
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
`;
fs.writeFileSync(path.join(workflowsDir, 'security.yml'), securityContent);

// Write release.yml
const releaseContent = `name: Release

on:
  push:
    branches: [main]

concurrency: \${{ github.workflow }}-\${{ github.ref }}

jobs:
  release:
    name: Release
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v3
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 22.x
          cache: 'pnpm'
          
      - name: Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: Create Release Pull Request or Publish
        id: changesets
        uses: changesets/action@v1
        with:
          publish: pnpm changeset publish
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
          NPM_TOKEN: \${{ secrets.NPM_TOKEN }}
`;
fs.writeFileSync(path.join(workflowsDir, 'release.yml'), releaseContent);

// Security policy
fs.writeFileSync(
  path.join(__dirname, '../../SECURITY.md'),
  `# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| v1.0.x  | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

Please report vulnerabilities directly to security@awesome.api.
Do not open a public issue.
`,
);

console.log('Workflows created.');
