const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '../../../');
const srcDir = path.join(repoRoot, 'apps/docs/src');
const skillsSrcDir = path.join(repoRoot, 'skills');
const skillsOutDir = path.join(srcDir, 'skills');
const docsDir = path.join(srcDir, 'docs');
const graphPath = path.join(repoRoot, 'registry/graph.json');

fs.mkdirSync(skillsOutDir, { recursive: true });
fs.mkdirSync(docsDir, { recursive: true });

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const edgeBySource = {};
const edgeByTarget = {};
for (const e of graph.edges || []) {
  (edgeBySource[e.source] ||= []).push(e);
  (edgeByTarget[e.target] ||= []).push(e);
}

const skillIds = fs
  .readdirSync(skillsSrcDir)
  .filter((name) => fs.statSync(path.join(skillsSrcDir, name)).isDirectory())
  .sort();

function loadMeta(id) {
  const p = path.join(skillsSrcDir, id, 'metadata.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : { name: id, categories: [] };
}

function trustBlock(meta) {
  const agents = (meta.supportedAgents || []).join(', ');
  return `
<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | ${meta.validationStatus || 'validated'} |
| **Schema** | ${meta.schemaVersion || '1.0.0'} |
| **Maintainer** | ${meta.maintainer || meta.author || 'awesome-api-skills'} |
| **Updated** | ${meta.lastUpdated || '—'} |
| **Languages** | ${(meta.languages || meta.sdkLanguages || []).join(', ') || '—'} |
| **Agents** | ${agents || 'cursor, claude-code, cline, continue'} |
| **Doc source** | ${meta.documentationSource ? `[official docs](${meta.documentationSource})` : '—'} |

</div>
`;
}

function relationsBlock(id, meta) {
  const lines = [];
  const seen = new Set();
  for (const r of meta.relationships || []) {
    if (seen.has(r.target)) continue;
    seen.add(r.target);
    lines.push(`- **${r.type.replace(/_/g, ' ')}** → [${r.target}](/skills/${r.target})`);
  }
  for (const e of edgeBySource[id] || []) {
    if (seen.has(e.target)) continue;
    seen.add(e.target);
    lines.push(`- **${e.type.replace(/_/g, ' ')}** → [${e.target}](/skills/${e.target})`);
  }
  for (const e of edgeByTarget[id] || []) {
    if (seen.has(e.source)) continue;
    seen.add(e.source);
    lines.push(`- **${e.type.replace(/_/g, ' ')}** ← [${e.source}](/skills/${e.source})`);
  }
  if (!lines.length) return '_No graph edges for this skill._';
  return lines.slice(0, 8).join('\n');
}

// --- Skill detail pages ---
for (const id of skillIds) {
  const meta = loadMeta(id);
  const title = meta.displayName || meta.name || id;
  const skillMd = fs.readFileSync(path.join(skillsSrcDir, id, 'SKILL.md'), 'utf8');
  const categories = (meta.categories || []).join(' · ') || 'General';

  const page = `---
title: ${title}
---

# ${title}

<p class="skill-meta">${categories}</p>

${trustBlock(meta)}

## Graph

${relationsBlock(id, meta)}

---

${skillMd.replace(/^# .+\n/, '')}
`;
  fs.writeFileSync(path.join(skillsOutDir, `${id}.md`), page);
}

// --- Categories index ---
const byCategory = {};
for (const id of skillIds) {
  const meta = loadMeta(id);
  for (const c of meta.categories || ['Other']) {
    (byCategory[c] ||= []).push(id);
  }
}

const categoryCards = Object.keys(byCategory)
  .sort()
  .map(
    (cat) =>
      `\n<details><summary><strong>${cat}</strong> (${byCategory[cat].length})</summary>\n\n${byCategory[cat].map((id) => `- [${id}](/skills/${id})`).join('\n')}\n\n</details>`,
  )
  .join('\n');

fs.writeFileSync(
  path.join(skillsOutDir, 'categories.md'),
  `---
title: Browse by Category
---

# Categories

Filter skills by domain. Click a category to expand.

${categoryCards}
`,
);

// --- Skills index with client-side filter ---
const allCards = skillIds
  .map((id) => {
    const meta = loadMeta(id);
    const title = meta.displayName || meta.name || id;
    const cats = (meta.categories || ['Other']).join(' ');
    const langs = (meta.languages || []).join(' ');
    return `<a class="skill-card" data-cat="${cats.toLowerCase()}" data-lang="${langs.toLowerCase()}" data-name="${id}" href="/skills/${id}"><h3>${title}</h3><p>${(meta.categories || []).join(' · ')}</p><span class="skill-tag">${meta.validationStatus || 'validated'}</span></a>`;
  })
  .join('\n');

const categories = [...new Set(skillIds.flatMap((id) => loadMeta(id).categories || []))].sort();

fs.writeFileSync(
  path.join(skillsOutDir, 'index.md'),
  `---
title: Skills
---

# Find a skill

<input id="skill-search" type="search" placeholder="Search stripe, postgres, auth…" aria-label="Search skills" />

<div class="filter-row">
${categories.map((c) => `<button type="button" class="filter-btn" data-filter="${c.toLowerCase()}">${c}</button>`).join('\n')}
<button type="button" class="filter-btn active" data-filter="all">All</button>
</div>

<div class="skills-grid" id="skills-grid">
${allCards}
</div>

<script setup>
if (typeof window !== 'undefined') {
  const search = document.getElementById('skill-search');
  const grid = document.getElementById('skills-grid');
  const cards = grid?.querySelectorAll('.skill-card') || [];
  const btns = document.querySelectorAll('.filter-btn');
  let activeCat = 'all';
  function apply() {
    const q = (search?.value || '').toLowerCase();
    cards.forEach((el) => {
      const name = el.getAttribute('data-name') || '';
      const cat = el.getAttribute('data-cat') || '';
      const matchQ = !q || name.includes(q) || cat.includes(q);
      const matchC = activeCat === 'all' || cat.includes(activeCat);
      el.style.display = matchQ && matchC ? '' : 'none';
    });
  }
  search?.addEventListener('input', apply);
  btns.forEach((b) => b.addEventListener('click', () => {
    btns.forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    activeCat = b.getAttribute('data-filter') || 'all';
    apply();
  }));
}
</script>

<style>
.skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; margin-top: 20px; }
.skill-card { display: block; padding: 16px; border: 1px solid var(--vp-c-divider); border-radius: 8px; text-decoration: none; color: inherit; background: var(--vp-c-bg-soft); transition: border-color 0.15s; }
.skill-card:hover { border-color: var(--vp-c-brand-1); }
.skill-card h3 { margin: 0 0 6px; font-size: 15px; }
.skill-card p { margin: 0; font-size: 12px; color: var(--vp-c-text-2); }
.skill-tag { display: inline-block; margin-top: 8px; font-size: 10px; padding: 2px 6px; border-radius: 4px; background: var(--vp-c-brand-soft); color: var(--vp-c-brand-1); text-transform: uppercase; letter-spacing: 0.05em; }
.filter-row { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
.filter-btn { font-size: 12px; padding: 4px 10px; border-radius: 999px; border: 1px solid var(--vp-c-divider); background: transparent; cursor: pointer; color: var(--vp-c-text-2); }
.filter-btn.active, .filter-btn:hover { border-color: var(--vp-c-brand-1); color: var(--vp-c-brand-1); }
#skill-search { width: 100%; max-width: 480px; padding: 10px 14px; border-radius: 8px; border: 1px solid var(--vp-c-divider); background: var(--vp-c-bg-soft); color: inherit; font-size: 14px; }
.trust-panel { font-size: 13px; margin: 16px 0; padding: 12px 16px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); }
.trust-panel table { margin: 0; }
.skill-meta { color: var(--vp-c-text-2); margin-top: -8px; }
</style>
`,
);

// --- Knowledge graph page ---
const STACKS = [
  { name: 'Full-stack TypeScript', path: ['nextjs', 'prisma', 'postgresql'] },
  { name: 'Payments SaaS', path: ['stripe', 'express', 'postgresql'] },
  { name: 'AI + RAG', path: ['openai', 'pinecone', 'vercel'] },
  { name: 'Serverless auth', path: ['clerk', 'nextjs', 'supabase'] },
  { name: 'Observability', path: ['opentelemetry', 'prometheus', 'grafana'] },
];

const stackMermaid = STACKS.map(
  (s) => `  subgraph ${s.name.replace(/\s/g, '_')}["${s.name}"]
${s.path.map((n, i) => `    ${n}${i < s.path.length - 1 ? ' --> ' + s.path[i + 1] : ''}`).join('\n')}
  end`,
).join('\n');

const prereqEdges = (graph.edges || [])
  .filter((e) => e.type === 'depends_on' || e.type === 'integrates_with')
  .slice(0, 20)
  .map((e) => `  ${e.source} -->|${e.type.replace(/_/g, ' ')}| ${e.target}`)
  .join('\n');

fs.writeFileSync(
  path.join(srcDir, 'graph.md'),
  `---
title: Knowledge Graph
---

# Recommended stacks & relationships

The graph connects **${graph.nodes?.length || skillIds.length} skills** with **${graph.edges?.length || 0} relationships** — prerequisites, alternatives, and stacks that work together.

## Popular stacks

${STACKS.map((s) => `- **${s.name}:** ${s.path.map((n) => `[${n}](/skills/${n})`).join(' → ')}`).join('\n')}

## Stack diagram

\`\`\`mermaid
flowchart LR
${stackMermaid}
\`\`\`

## Prerequisites & integrations (sample)

\`\`\`mermaid
flowchart TD
${prereqEdges}
\`\`\`

## How to read edges

| Type | Meaning |
| :--- | :--- |
| \`depends_on\` | Install or learn this first |
| \`integrates_with\` | Commonly used together |
| \`works_well_with\` | Recommended pairing |
| \`alternative_to\` | Pick one or the other |
| \`related_to\` | Same domain, explore both |

## Learning paths

1. **Backend API** — \`express\` → \`postgresql\` → \`prisma\` → \`stripe\`
2. **Frontend app** — \`react\` → \`nextjs\` → \`vercel\`
3. **AI features** — \`openai\` → \`langchain\` → \`pinecone\`

Raw data: [\`registry/graph.json\`](https://github.com/ashish7802/awesome-api-skills/blob/master/registry/graph.json)
`,
);

// --- Package docs ---
const packageDocs = [
  {
    slug: 'overview',
    title: 'Overview',
    body: `Stop AI from guessing APIs. This repo ships **100 skills** — markdown packages your agent reads instead of hallucinating SDK details.

**Start here:** [Skills directory](/skills/) · [Knowledge graph](/graph)`,
  },
  {
    slug: 'cli',
    title: 'CLI',
    body: `Search and validate skills locally. Build first: \`pnpm build\`

\`\`\`bash
node packages/cli/dist/bin.js search payment
node packages/cli/dist/bin.js doctor
node packages/cli/dist/bin.js validate
\`\`\`

Not published to npm yet.`,
  },
  { slug: 'sdk', title: 'SDK', body: 'Client utilities in `packages/sdk`.' },
  {
    slug: 'registry',
    title: 'Registry',
    body: 'Graph and index JSON in `registry/`. [View graph →](/graph)',
  },
  { slug: 'validator', title: 'Validator', body: 'Schema validation in `packages/validator`.' },
  { slug: 'generator', title: 'Generator', body: 'Artifact plugins in `packages/generator`.' },
  {
    slug: 'specification',
    title: 'Specification',
    body: 'Skill format: [SPECIFICATION.md](https://github.com/ashish7802/awesome-api-skills/blob/master/SPECIFICATION.md)',
  },
];

packageDocs.forEach(({ slug, title, body }) => {
  fs.writeFileSync(path.join(docsDir, `${slug}.md`), `# ${title}\n\n${body}\n`);
});

console.log(`Generated ${skillIds.length} skill pages, graph, and indexes.`);
