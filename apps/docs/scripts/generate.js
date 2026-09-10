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
  const langs = (meta.languages || meta.sdkLanguages || []).join(', ') || '—';
  return `
<div class="trust-panel">
  <div class="trust-header">
    <div class="trust-badge">
      <span class="pulse-dot"></span>
      <span>${meta.validationStatus || 'validated'}</span>
    </div>
    <span class="trust-version">Schema v${meta.schemaVersion || '1.0.0'}</span>
  </div>
  <div class="trust-grid">
    <div class="trust-item">
      <span class="trust-label">Maintainer</span>
      <span class="trust-val">${meta.maintainer || meta.author || 'awesome-api-skills'}</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Last Verified</span>
      <span class="trust-val">${meta.lastVerified || meta.lastUpdated || '2026-07-03'}</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">${langs}</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">${agents || 'cursor, claude-code, cline, continue'}</span>
    </div>
  </div>
  ${meta.documentationSource ? `<div class="trust-doc-link"><a href="${meta.documentationSource}" target="_blank" rel="noopener">Official Documentation ↗</a></div>` : ''}
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
  const skillMd = fs
    .readFileSync(path.join(skillsSrcDir, id, 'SKILL.md'), 'utf8')
    .replace(/\r\n/g, '\n');
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
    const desc = meta.description || 'Verified API skill specification for AI coding agents.';
    return `<a class="skill-card" data-cat="${cats.toLowerCase()}" data-lang="${langs.toLowerCase()}" data-name="${id}" href="/skills/${id}">
  <div class="skill-card-top">
    <h3>${title}</h3>
    <span class="skill-badge-status"><span class="badge-dot"></span>${meta.validationStatus || 'validated'}</span>
  </div>
  <p class="skill-desc">${desc}</p>
  <div class="skill-card-footer">
    <span class="skill-cat-pill">${(meta.categories || ['Tools'])[0]}</span>
    <span class="skill-arrow">→</span>
  </div>
</a>`;
  })
  .join('\n');

const categories = [...new Set(skillIds.flatMap((id) => loadMeta(id).categories || []))].sort();

fs.writeFileSync(
  path.join(skillsOutDir, 'index.md'),
  `---
title: Skills Directory
---

# Verified API Skills Catalog

<p class="catalog-subtitle">Explore <strong>${skillIds.length} structured skill specifications</strong> tested against AI coding agents (Claude Code, Cursor, Cline, Continue).</p>

<div class="search-container">
  <div class="search-box-wrapper">
    <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    <input id="skill-search" type="search" placeholder="Search by skill name, category, or keyword (e.g., stripe, rag, auth, postgres)..." aria-label="Search skills" autofocus />
  </div>
  <div class="catalog-stats" id="catalog-stats">Showing ${skillIds.length} of ${skillIds.length} skills</div>
</div>

<div class="filter-row">
  <button type="button" class="filter-btn active" data-filter="all">All (${skillIds.length})</button>
${categories
  .map((c) => {
    const count = skillIds.filter((id) => (loadMeta(id).categories || []).includes(c)).length;
    return `  <button type="button" class="filter-btn" data-filter="${c.toLowerCase()}">${c} (${count})</button>`;
  })
  .join('\n')}
</div>

<div class="skills-grid" id="skills-grid">
${allCards}
</div>

<script setup>
if (typeof window !== 'undefined') {
  const search = document.getElementById('skill-search');
  const grid = document.getElementById('skills-grid');
  const stats = document.getElementById('catalog-stats');
  const cards = grid?.querySelectorAll('.skill-card') || [];
  const btns = document.querySelectorAll('.filter-btn');
  let activeCat = 'all';
  function apply() {
    const q = (search?.value || '').toLowerCase().trim();
    let visibleCount = 0;
    cards.forEach((el) => {
      const name = el.getAttribute('data-name') || '';
      const cat = el.getAttribute('data-cat') || '';
      const matchQ = !q || name.includes(q) || cat.includes(q);
      const matchC = activeCat === 'all' || cat.includes(activeCat);
      const isVisible = matchQ && matchC;
      el.style.display = isVisible ? '' : 'none';
      if (isVisible) visibleCount++;
    });
    if (stats) {
      stats.textContent = \`Showing \${visibleCount} of \${cards.length} skills\`;
    }
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
.catalog-subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
  margin-bottom: 1.5rem;
}
.search-container {
  margin: 1.5rem 0 1rem;
}
.search-box-wrapper {
  position: relative;
  max-width: 640px;
}
.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vp-c-text-3);
  pointer-events: none;
}
#skill-search {
  width: 100%;
  padding: 12px 16px 12px 42px;
  border-radius: 10px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  font-size: 0.95rem;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}
#skill-search:focus {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 0 14px rgba(56, 189, 248, 0.25);
}
.catalog-stats {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-top: 0.6rem;
  font-family: var(--vp-font-family-mono);
}
.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 1.25rem 0 2rem;
}
.filter-btn {
  font-size: 0.82rem;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.15s ease;
}
.filter-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
}
.filter-btn.active {
  border-color: var(--vp-c-brand-1);
  background: rgba(56, 189, 248, 0.15);
  color: var(--vp-c-brand-1);
  font-weight: 600;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 20px;
}
.skill-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  text-decoration: none !important;
  color: inherit !important;
  background: var(--vp-c-bg-soft);
  transition: all 0.2s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
}
.skill-card:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 12px rgba(56, 189, 248, 0.15);
}
.skill-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 8px;
}
.skill-card h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}
.skill-desc {
  margin: 0 0 14px;
  font-size: 0.84rem;
  line-height: 1.45;
  color: var(--vp-c-text-2);
  flex-grow: 1;
}
.skill-badge-status {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  font-family: var(--vp-font-family-mono);
  font-weight: 600;
  text-transform: uppercase;
}
.badge-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}
.skill-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 10px;
  margin-top: auto;
}
.skill-cat-pill {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  font-weight: 500;
}
.skill-arrow {
  color: var(--vp-c-brand-1);
  font-weight: 700;
  transition: transform 0.15s ease;
}
.skill-card:hover .skill-arrow {
  transform: translateX(4px);
}
.trust-panel {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  padding: 16px 20px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}
.trust-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--vp-c-divider);
}
.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 3px 8px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
}
.pulse-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 8px #10b981;
}
.trust-version {
  font-size: 0.78rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}
.trust-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.trust-label {
  font-size: 0.75rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.trust-val {
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
  font-weight: 500;
}
.trust-doc-link {
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.85rem;
}
.trust-doc-link a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
}
.skill-meta {
  color: var(--vp-c-brand-1);
  font-size: 0.95rem;
  font-weight: 600;
  margin-top: -8px;
}
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
    body: `Stop AI from guessing APIs. This repository ships **${skillIds.length} verified skills** — markdown packages your coding agent reads to eliminate SDK hallucinations, broken method calls, and missing configuration flags.

## Why API Skills?

LLMs are regularly trained on outdated API documentation. When asking an agent to write code for modern SDKs (like Stripe, Clerk v5+, Next.js App Router, or Supabase), models frequently invent deprecated parameters or hallucinate methods.

Awesome API Skills provides deterministic context files (\`SKILL.md\`) that provide:
- **Exact SDK Import Patterns & Signatures**
- **Critical AI Pitfalls**: Known traps where models make mistakes (e.g., Stripe raw body webhooks, Clerk v5 middleware, Supabase RLS)
- **Production Verification Checklists**: Concrete steps to test your integration

## Supported Agents

Skills are formatted for instant ingestion across leading AI coding tools:
- **Cursor**: Reference in \`.cursorrules\` or directly prompt \`@skills/<skill-name>/SKILL.md\`
- **Claude Code**: Include in project root \`CLAUDE.md\` or run \`/context skills/<skill-name>/SKILL.md\`
- **Cline**: Place in \`.cline/skills/\` or pass via workspace instructions
- **Continue**: Configure under \`.continue/config.json\` or context providers

## Getting Started

1. **Browse Skills**: Explore the [Skills Directory](/skills/) or [Knowledge Graph](/graph)
2. **Interactive Playground**: Test and validate skills in the [Playground](/playground)
3. **Local CLI**: Search and validate skills directly with \`node packages/cli/dist/bin.js\`
`,
  },
  {
    slug: 'cli',
    title: 'CLI Reference',
    body: `Search, validate, and inspect skills locally using the built-in CLI.

## Build the CLI

\`\`\`bash
npm run build:packages
\`\`\`

## Commands

### Search Skills

Search skills by API name, category, or keyword:

\`\`\`bash
node packages/cli/dist/bin.js search stripe
node packages/cli/dist/bin.js search database --json
\`\`\`

### Doctor & Environment Health

Inspect local workspace setup, skills coverage, and build integrity:

\`\`\`bash
node packages/cli/dist/bin.js doctor
\`\`\`

### Validate Skills

Run structural, schema, and trust verification across all \`skills/*\` packages:

\`\`\`bash
node packages/cli/dist/bin.js validate
\`\`\`

### Real-Time Performance Benchmark

Measure real loading throughput, validation rules, graph traversal, and query speed:

\`\`\`bash
npm run benchmark
\`\`\`
`,
  },
  {
    slug: 'sdk',
    title: 'SDK Guide',
    body: `The \`@awesome-api-skills/sdk\` package provides core programmatic access for embedding skill management, lifecycle hooks, and plugin events into custom developer tooling.

## Installation & Import

\`\`\`typescript
import { SDKCore, DefaultLogger, DefaultEventBus } from '@awesome-api-skills/sdk';

const sdk = new SDKCore();

// Listen to lifecycle events
sdk.events.on('PluginLoaded', (event) => {
  console.log(\`Loaded skill plugin: \${event.data.name}\`);
});
\`\`\`

## Architecture

- **\`SDKCore\`**: Central coordinator managing plugin lifecycles, configuration, and event dispatching.
- **\`DefaultEventBus\`**: Typed event emitter for tracking load, validation, and execution events.
- **\`LifecycleManager\`**: Controls plugin registration, initialization hooks, and version compatibility checks.
- **\`RegistryClient\`**: Client for querying local or remote skill manifests and relationship graphs.
`,
  },
  {
    slug: 'registry',
    title: 'Registry & Knowledge Graph',
    body: `The registry maintains metadata, category indexes, and dependency relationships for all **${skillIds.length} skills**.

## Graph Data

The complete dependency and integration graph is located in \`registry/graph.json\`:

- **Nodes**: ${graph.nodes?.length || skillIds.length} unique skill nodes with version, categories, and agent compatibility.
- **Edges**: ${graph.edges?.length || 0} directed relationships categorizing stacks, prerequisites, and alternatives.

## Edge Types

| Relationship | Description | Example |
| :--- | :--- | :--- |
| \`depends_on\` | Required underlying dependency | \`argo-cd\` → \`kubernetes\` |
| \`integrates_with\` | Frequently paired in production | \`auth0\` → \`nextjs\` |
| \`works_well_with\` | Complementary technology | \`drizzle\` → \`postgresql\` |
| \`alternative_to\` | Direct technology alternative | \`fastapi\` → \`express\` |
| \`related_to\` | Shared technology domain | \`redis\` → \`upstash\` |

[Explore the interactive graph visualization →](/graph)
`,
  },
  {
    slug: 'validator',
    title: 'Validation Engine',
    body: `The \`@awesome-api-skills/validator\` package enforces structural, schema, and trust integrity across all skills.

## Validation Rules

1. **\`V-001 (MetadataPresenceRule)\`**: Ensures \`metadata.json\` exists and parses as valid JSON.
2. **\`V-002 (SkillMarkdownPresenceRule)\`**: Verifies that \`SKILL.md\` is present and non-empty.
3. **\`V-003 (LastVerifiedMetadataRule)\`**: Confirms \`lastVerified\` timestamp is present to maintain freshness.
4. **\`V-004 (MetadataSchemaValidationRule)\`**: Validates metadata fields against the formal JSON schema.

## Programmatic Usage

\`\`\`typescript
import { ValidatorEngine, RuleSet } from '@awesome-api-skills/validator';

const engine = new ValidatorEngine();
const results = await engine.validateSkill('/path/to/skills/stripe');

console.log(\`Passed: \${results.passed}, Diagnostics: \${results.diagnostics.length}\`);
\`\`\`
`,
  },
  {
    slug: 'generator',
    title: 'Generator & Exporters',
    body: `The \`@awesome-api-skills/generator\` package transforms raw skill metadata and markdown into agent-specific formats.

## Supported Export Targets

- **Cursor Rules**: Generates \`.cursorrules\` context chunks for instant workspace indexing.
- **Claude Code**: Formats unified project references for \`CLAUDE.md\`.
- **VitePress Docs**: Builds high-performance documentation pages with search indexes and relationship maps.
`,
  },
  {
    slug: 'specification',
    title: 'SKILL.md Specification',
    body: `Every skill in this repository follows the open \`SKILL.md v1.0\` specification.

## Directory Layout

Each skill occupies an isolated folder under \`skills/<name>/\`:

\`\`\`text
skills/stripe/
├── SKILL.md       # Primary agent context and implementation patterns
└── metadata.json  # Machine-readable schema metadata
\`\`\`

## Required Metadata Fields

\`\`\`json
{
  "name": "stripe",
  "version": "1.0.0",
  "description": "Financial infrastructure platform for the internet.",
  "categories": ["Payments", "Commerce"],
  "languages": ["typescript", "python"],
  "license": "MIT",
  "documentationSource": "https://stripe.com/docs/api",
  "supportedAgents": ["cursor", "claude-code", "cline", "continue"],
  "compatibility": "SKILL.md v1.0",
  "lastVerified": "2026-07-03"
}
\`\`\`

## Markdown Structure

1. **Title & Frontmatter**: Skill name and summary.
2. **Quickstart**: Minimal copy-pasteable configuration and initialization.
3. **Core API Patterns**: Standard operations (CRUD, pagination, async processing).
4. **Critical AI Pitfalls**: High-priority rules warning against known LLM hallucinations.
5. **Verification Checklist**: Concrete commands or checks to verify the integration.
`,
  },
];

packageDocs.forEach(({ slug, title, body }) => {
  fs.writeFileSync(path.join(docsDir, `${slug}.md`), `# ${title}\n\n${body}\n`);
});

console.log(`Generated ${skillIds.length} skill pages, graph, and indexes.`);
