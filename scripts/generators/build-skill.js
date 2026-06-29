const fs = require('fs');
const path = require('path');

function buildSkill(def) {
  const dir = path.join(__dirname, '../..', 'skills', def.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // 1. metadata.json
  const metadata = {
    name: def.name,
    version: def.version || '1.0.0',
    description: def.description,
    categories: def.categories || ['Developer Tools'],
    languages: Object.keys(def.examples || {}),
    author: 'Awesome API Skills Team',
    license: 'MIT',
    links: def.links || {},
  };
  fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  // 2. SKILL.md
  let skillMd = `# ${def.displayName} API Skill\n\n`;
  skillMd += `## Overview\n${def.overview}\n\n`;
  skillMd += `## Installation\n${def.installation}\n\n`;
  skillMd += `## Authentication\n${def.authentication}\n\n`;
  skillMd += `## Core Concepts\n${def.coreConcepts}\n\n`;
  skillMd += `## Common Workflows\n${def.workflows}\n\n`;
  skillMd += `## Error Handling\n${def.errorHandling}\n\n`;
  skillMd += `## Security\n${def.security}\n\n`;
  skillMd += `## Rate Limits\n${def.rateLimits}\n\n`;
  skillMd += `## Best Practices\n${def.bestPractices}\n\n`;
  skillMd += `## Troubleshooting\n${def.troubleshooting}\n\n`;
  skillMd += `## References\n${Object.entries(def.links || {})
    .map(([k, v]) => `- [${k}](${v})`)
    .join('\n')}\n`;
  fs.writeFileSync(path.join(dir, 'SKILL.md'), skillMd);

  // 3. examples/
  const examplesDir = path.join(dir, 'examples');
  if (!fs.existsSync(examplesDir)) fs.mkdirSync(examplesDir);
  for (const [lang, code] of Object.entries(def.examples || {})) {
    const ext =
      lang === 'typescript' ? 'ts' : lang === 'python' ? 'py' : lang === 'go' ? 'go' : lang;
    fs.writeFileSync(path.join(examplesDir, `example.${ext}`), code);
  }

  // 4. prompts/
  const promptsDir = path.join(dir, 'prompts');
  if (!fs.existsSync(promptsDir)) fs.mkdirSync(promptsDir);
  for (const [pName, pContent] of Object.entries(def.prompts || {})) {
    fs.writeFileSync(path.join(promptsDir, `${pName}.md`), pContent);
  }

  // 5. tests/
  const testsDir = path.join(dir, 'tests');
  if (!fs.existsSync(testsDir)) fs.mkdirSync(testsDir);
  fs.writeFileSync(
    path.join(testsDir, 'skill.test.ts'),
    def.test || `// Basic test for ${def.name}`,
  );

  console.log(`[SUCCESS] Generated skill: ${def.name}`);
}

module.exports = { buildSkill };
