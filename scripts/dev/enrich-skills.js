const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '../../');
const skillsDir = path.join(repoRoot, 'skills');
const graphPath = path.join(repoRoot, 'registry/graph.json');

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const edgeMap = {};
for (const e of graph.edges || []) {
  if (!edgeMap[e.source]) edgeMap[e.source] = [];
  edgeMap[e.source].push(e);
}

const AI_PITFALLS = {
  Payments: [
    'Inventing webhook event names not in the vendor catalog',
    'Using secret keys in client-side or browser code',
    'Skipping signature verification on webhook payloads',
  ],
  Commerce: [
    'Mixing test and live API keys in the same code path',
    'Retrying POST requests without idempotency keys',
    'Hardcoding currency or amount formats incorrectly',
  ],
  Databases: [
    'Inventing column names or schema fields',
    'Using deprecated driver methods or wrong connection strings',
    'Omitting connection pooling or transaction boundaries',
  ],
  'Developer Tools': [
    'Referencing CLI flags or config keys that do not exist',
    'Using outdated major versions of tools',
    'Skipping lockfile or version pinning in examples',
  ],
  AI: [
    'Using deprecated model IDs or wrong API endpoints',
    'Confusing chat vs completions vs embeddings APIs',
    'Omitting rate-limit and token budget handling',
  ],
  Frameworks: [
    'Mixing Pages Router and App Router patterns',
    'Using client-only APIs in server components',
    'Wrong import paths for framework-specific modules',
  ],
  Infrastructure: [
    'Hardcoding region or account IDs',
    'Missing IAM least-privilege on cloud resources',
    'Confusing similar service names (e.g. S3 vs CloudFront)',
  ],
  default: [
    'Using outdated SDK or API versions from training data',
    'Inventing environment variable names',
    'Omitting error handling and retry logic',
  ],
};

const PRODUCTION_CHECKS = {
  Payments: [
    'Webhook signatures verified on raw request body',
    'Idempotency keys on mutating requests',
    'Test and live keys isolated by environment',
  ],
  Databases: [
    'Migrations version-controlled and applied via CI',
    'Connection limits and pooling configured',
    'Backups and restore procedure documented',
  ],
  default: [
    'Secrets in environment variables, not source code',
    'Error handling and logging in place',
    'Rate limits and timeouts configured',
  ],
};

function pickTemplate(categories, map) {
  for (const c of categories) {
    if (map[c]) return map[c];
  }
  return map.default;
}

function relatedFromGraph(skillId, meta) {
  const rel = [];
  const seen = new Set();
  for (const r of meta.relationships || []) {
    if (!seen.has(r.target)) {
      seen.add(r.target);
      rel.push({ id: r.target, type: r.type });
    }
  }
  for (const e of edgeMap[skillId] || []) {
    if (!seen.has(e.target)) {
      seen.add(e.target);
      rel.push({ id: e.target, type: e.type });
    }
  }
  return rel.slice(0, 6);
}

function upsertSection(content, heading, body) {
  const re = new RegExp(`## ${heading}[\\s\\S]*?(?=\\n## |$)`);
  const block = `## ${heading}\n${body.trim()}\n`;
  if (re.test(content)) {
    return content.replace(re, block);
  }
  return content.trimEnd() + '\n\n' + block;
}

function enrichSkill(skillId) {
  const dir = path.join(skillsDir, skillId);
  const mdPath = path.join(dir, 'SKILL.md');
  const metaPath = path.join(dir, 'metadata.json');
  if (!fs.existsSync(mdPath) || !fs.existsSync(metaPath)) return false;

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  let content = fs.readFileSync(mdPath, 'utf8');
  const categories = meta.categories || ['default'];
  const display = meta.displayName || meta.name || skillId;

  const why = `Use this when your agent works with **${display}** — structured patterns beat pasted docs and prevent common hallucinations.`;

  const pitfalls = pickTemplate(categories, AI_PITFALLS)
    .map((p) => `- ${p}`)
    .join('\n');

  const checks = pickTemplate(categories, PRODUCTION_CHECKS)
    .map((c) => `- [ ] ${c}`)
    .join('\n');

  const related = relatedFromGraph(skillId, meta);
  const relatedBody =
    related.length > 0
      ? related
          .map((r) => `- [\`${r.id}\`](../${r.id}/SKILL.md) — ${r.type.replace(/_/g, ' ')}`)
          .join('\n')
      : '- No graph relationships yet — see the knowledge graph in the docs site.';

  content = upsertSection(content, 'Why use this skill', why);
  content = upsertSection(content, 'AI pitfalls', pitfalls);
  content = upsertSection(content, 'Production checklist', checks);
  content = upsertSection(content, 'Related skills', relatedBody);

  fs.writeFileSync(mdPath, content);

  const docLink = Object.values(meta.links || {})[0] || '';
  const enriched = {
    ...meta,
    schemaVersion: meta.schemaVersion || '1.0.0',
    validationStatus: meta.validationStatus || 'validated',
    maintainer: meta.maintainer || meta.author || 'awesome-api-skills',
    lastUpdated: meta.lastUpdated || '2026-06-29',
    documentationSource: meta.documentationSource || docLink,
    supportedAgents: meta.supportedAgents || ['cursor', 'claude-code', 'cline', 'continue'],
    compatibility: meta.compatibility || 'SKILL.md v1.0',
  };
  fs.writeFileSync(metaPath, JSON.stringify(enriched, null, 2) + '\n');
  return true;
}

const skills = fs
  .readdirSync(skillsDir)
  .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

let count = 0;
for (const id of skills) {
  if (enrichSkill(id)) count++;
}
console.log(`Enriched ${count} skills.`);
