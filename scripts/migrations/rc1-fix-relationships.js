const fs = require('fs');
const path = require('path');
const skillsDir = path.join(__dirname, '../..', 'skills');

// Fix biome: remove typescript dep, replace with react
const fixes = {
  biome: (meta) => {
    meta.relationships = meta.relationships.filter((r) => r.target !== 'typescript');
    meta.relationships.push({ target: 'react', type: 'works_well_with' });
  },
  eslint: (meta) => {
    meta.relationships = meta.relationships.filter((r) => r.target !== 'typescript');
    meta.relationships.push({ target: 'nextjs', type: 'works_well_with' });
  },
  pulumi: (meta) => {
    meta.relationships = meta.relationships.filter((r) => r.target !== 'typescript');
    meta.relationships.push({ target: 'terraform', type: 'alternative_to' });
  },
};

for (const [skill, fix] of Object.entries(fixes)) {
  const metaPath = path.join(skillsDir, skill, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    fix(meta);
    fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    console.log(`[FIXED] ${skill}: removed broken 'typescript' target`);
  }
}
