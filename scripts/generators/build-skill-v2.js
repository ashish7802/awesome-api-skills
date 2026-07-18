const fs = require('fs');
const path = require('path');

function buildSkillV2(def) {
  const dir = path.join(__dirname, '../..', 'skills', def.name);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  const metadata = {
    name: def.name,
    version: def.version || '1.0.0',
    description: def.description,
    categories: def.categories || ['Developer Tools'],
    languages: Object.keys(def.examples || {}),
    author: 'Awesome API Skills Team',
    license: 'MIT',
    links: def.links || {},
    relatedSkills: def.relatedSkills || [],
  };
  fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  let skillMd = `# ${def.displayName} API Skill\n\n`;
  skillMd += `## Quick Start\n${def.quickStart}\n\n`;

  if (def.commonWorkflows) skillMd += `## Common Workflows\n${def.commonWorkflows}\n\n`;
  if (def.productionPatterns) skillMd += `## Production Patterns\n${def.productionPatterns}\n\n`;
  if (def.errorRecovery) skillMd += `## Error Recovery\n${def.errorRecovery}\n\n`;
  if (def.securityNotes) skillMd += `## Security Notes\n${def.securityNotes}\n\n`;
  if (def.performanceConsiderations)
    skillMd += `## Performance Considerations\n${def.performanceConsiderations}\n\n`;
  if (def.testingGuidance) skillMd += `## Testing Guidance\n${def.testingGuidance}\n\n`;
  if (def.troubleshooting) skillMd += `## Troubleshooting\n${def.troubleshooting}\n\n`;

  if (def.migrationNotes) skillMd += `## Migration Notes\n${def.migrationNotes}\n\n`;

  skillMd += `## References\n`;
  for (const [k, v] of Object.entries(def.links || {})) {
    skillMd += `- [${k}](${v})\n`;
  }

  if (def.relatedSkills && def.relatedSkills.length > 0) {
    skillMd += `\n## Related Skills\n`;
    for (const related of def.relatedSkills) {
      skillMd += `- [${related}](/skills/${related.toLowerCase()})\n`;
    }
  }

  fs.writeFileSync(path.join(dir, 'SKILL.md'), skillMd);

  const examplesDir = path.join(dir, 'examples');
  if (!fs.existsSync(examplesDir)) fs.mkdirSync(examplesDir);
  for (const [lang, files] of Object.entries(def.examples || {})) {
    const ext =
      lang === 'typescript' ? 'ts' : lang === 'python' ? 'py' : lang === 'go' ? 'go' : lang;
    if (typeof files === 'string') {
      fs.writeFileSync(path.join(examplesDir, `example.${ext}`), files);
    } else {
      for (const [filename, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(examplesDir, `${filename}.${ext}`), content);
      }
    }
  }

  const promptsDir = path.join(dir, 'prompts');
  if (!fs.existsSync(promptsDir)) fs.mkdirSync(promptsDir);
  for (const [pName, pContent] of Object.entries(def.prompts || {})) {
    fs.writeFileSync(path.join(promptsDir, `${pName}.md`), pContent);
  }

  const testsDir = path.join(dir, 'tests');
  if (!fs.existsSync(testsDir)) fs.mkdirSync(testsDir);
  fs.writeFileSync(
    path.join(testsDir, 'skill.test.ts'),
    def.test || `// Basic test for ${def.name}`,
  );

  console.log(`[SUCCESS] Generated skill: ${def.name}`);
}

module.exports = { buildSkillV2 };
