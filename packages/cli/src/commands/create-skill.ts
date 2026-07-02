import fs from 'fs';
import path from 'path';
import { Command } from '../interfaces.js';
import pc from 'picocolors';

function findRepoRoot(): string {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    if (fs.existsSync(path.join(dir, 'skills'))) return dir;
    dir = path.dirname(dir);
  }
  return process.cwd();
}

const command: Command = {
  name: 'create-skill',
  aliases: ['new', 'scaffold'],
  description: 'Scaffold a new API skill template',
  arguments: '<skill-id>',
  options: {
    category: { type: 'string', description: 'Primary skill category (e.g. Payments, AI)' },
    auth: { type: 'string', description: 'Authentication type (APIKey, OAuth2, BearerToken)' },
  },
  examples: [
    'awesome-api create-skill my-api',
    'awesome-api create-skill payment-gateway --category=Payments --auth=APIKey',
  ],
  async execute(context) {
    const skillId = context.args[0];
    if (!skillId) {
      throw new Error('Skill ID is required. Example: awesome-api create-skill my-api');
    }

    const root = findRepoRoot();
    const targetDir = path.join(root, 'skills', skillId);

    if (fs.existsSync(targetDir)) {
      throw new Error(`Skill folder '${skillId}' already exists at ${targetDir}`);
    }

    fs.mkdirSync(targetDir, { recursive: true });

    const category = (context.options.category as string) || 'General';
    const authType = (context.options.auth as string) || 'APIKey';

    const metadata = {
      id: skillId,
      name: skillId
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      description: `Official SKILL.md context file for ${skillId} API integration`,
      version: '1.0.0',
      license: 'MIT',
      categories: [category],
      tags: [skillId, 'api', 'integration'],
      sdkLanguages: ['TypeScript', 'Python'],
      authType,
      supportedAgents: ['ClaudeCode', 'Cursor', 'Antigravity'],
      lastVerified: new Date().toISOString().split('T')[0],
    };

    const skillMarkdown = `---
name: ${skillId}
description: ${metadata.description}
---

# ${metadata.name} Skill

> **Last Verified:** ${metadata.lastVerified}

## Overview
Learn how to authenticate, request, and integrate with the ${metadata.name} API.

## Authentication
Configure your API credentials:
\`\`\`bash
export ${skillId.toUpperCase().replace(/-/g, '_')}_API_KEY="your_api_key_here"
\`\`\`

## Quickstart Example
\`\`\`typescript
// Quickstart code snippet for ${metadata.name}
console.log("Integrating with ${metadata.name}...");
\`\`\`
`;

    fs.writeFileSync(
      path.join(targetDir, 'metadata.json'),
      JSON.stringify(metadata, null, 2) + '\n',
      'utf8',
    );
    fs.writeFileSync(path.join(targetDir, 'SKILL.md'), skillMarkdown, 'utf8');

    return {
      skillId,
      createdPath: targetDir,
      filesCreated: ['metadata.json', 'SKILL.md'],
      message: `Scaffolding completed for skill '${skillId}'`,
    };
  },
};

export default command;

export function formatCreateSkillOutput(data: {
  skillId: string;
  createdPath: string;
  filesCreated: string[];
  message: string;
}): string {
  return [
    pc.green(`✔ ${data.message}`),
    `  ${pc.bold('Folder:')} ${data.createdPath}`,
    `  ${pc.bold('Files:')} ${data.filesCreated.join(', ')}`,
  ].join('\n');
}
