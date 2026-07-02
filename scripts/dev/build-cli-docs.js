const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = process.cwd();
const cliPath = path.join(root, 'packages/cli/dist/bin.js');

function runCli(args) {
  try {
    return execSync(`node "${cliPath}" ${args}`, { encoding: 'utf8' }).trim();
  } catch (e) {
    return e.stdout ? e.stdout.trim() : e.message;
  }
}

const mainHelp = runCli('help');
const doctorOutput = runCli('doctor --json');
const searchOutput = runCli('search stripe --json');
const validateOutput = runCli('validate --json');

const markdown = `# Awesome API Skills CLI Reference

This document is generated directly from the \`@awesome-api-skills/cli\` binary to ensure zero documentation drift.

---

## Command Overview

\`\`\`
${mainHelp}
\`\`\`

---

## Core Commands

### 1. \`awesome-api search <term>\`

Search for skills by API name, category, or keyword.

**Example:**
\`\`\`bash
awesome-api search stripe --json
\`\`\`

**Actual Output:**
\`\`\`json
${searchOutput}
\`\`\`

---

### 2. \`awesome-api doctor\`

Inspect workspace health, local skill folders, and registry state.

**Example:**
\`\`\`bash
awesome-api doctor --json
\`\`\`

**Actual Output:**
\`\`\`json
${doctorOutput}
\`\`\`

---

### 3. \`awesome-api validate\`

Validate skill schemas against \`@awesome-api-skills/validator\` rules.

**Example:**
\`\`\`bash
awesome-api validate --json
\`\`\`

**Actual Output:**
\`\`\`json
${validateOutput}
\`\`\`
`;

fs.writeFileSync(path.join(root, 'docs/CLI_USAGE.md'), markdown, 'utf8');
console.log('Successfully generated docs/CLI_USAGE.md from CLI binary output.');
