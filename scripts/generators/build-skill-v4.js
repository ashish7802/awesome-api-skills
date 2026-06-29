const fs = require('fs');
const path = require('path');

function buildSkillV4(def) {
  const dir = path.join(__dirname, '..', 'skills', def.name);
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

    // Schema V2 Fields
    learningLevel: def.learningLevel || 'intermediate',
    useCases: def.useCases || [],
    deploymentTargets: def.deploymentTargets || [],
    ecosystem: def.ecosystem || '',
    maintainers: def.maintainers || [],
    stability: def.stability || 'production',
    relationships: def.relationships || [],
  };
  fs.writeFileSync(path.join(dir, 'metadata.json'), JSON.stringify(metadata, null, 2));

  let skillMd = `# ${def.displayName} Skill\n\n`;
  skillMd += `> ${def.description}\n\n`;

  // The Graph Preview and Recommendations will be injected in the second pass
  // by build-registry-v1.js after the entire graph is compiled.
  skillMd += `<!-- INJECT_GRAPH_PREVIEW -->\n\n`;
  skillMd += `<!-- INJECT_RECOMMENDATIONS -->\n\n`;

  skillMd += `## Quick Start\n${def.quickStart}\n\n`;

  if (def.productionPatterns) skillMd += `## Production Patterns\n${def.productionPatterns}\n\n`;
  if (def.architecture) skillMd += `## Architecture & Scaling\n${def.architecture}\n\n`;
  if (def.errorRecovery) skillMd += `## Error Recovery\n${def.errorRecovery}\n\n`;
  if (def.securityNotes) skillMd += `## Security Notes\n${def.securityNotes}\n\n`;

  skillMd += `## References\n`;
  for (const [k, v] of Object.entries(def.links || {})) {
    skillMd += `- [${k}](${v})\n`;
  }

  fs.writeFileSync(path.join(dir, 'SKILL.md'), skillMd);

  const examplesDir = path.join(dir, 'examples');
  if (!fs.existsSync(examplesDir)) fs.mkdirSync(examplesDir);
  for (const [lang, files] of Object.entries(def.examples || {})) {
    const ext =
      lang === 'typescript'
        ? 'ts'
        : lang === 'python'
          ? 'py'
          : lang === 'go'
            ? 'go'
            : lang === 'yaml'
              ? 'yml'
              : lang;
    if (typeof files === 'string') {
      fs.writeFileSync(path.join(examplesDir, `example.${ext}`), files);
    } else {
      for (const [filename, content] of Object.entries(files)) {
        fs.writeFileSync(path.join(examplesDir, `${filename}.${ext}`), content);
      }
    }
  }

  console.log(`[SUCCESS] Generated V4 skill: ${def.name}`);
}

module.exports = { buildSkillV4 };
