<script setup>
import { ref, computed } from 'vue';

const PRESETS = {
  stripe: {
    label: 'Stripe (Payments)',
    data: {
      name: 'stripe',
      version: '1.0.0',
      description: 'Financial infrastructure platform for online payments, billing, and webhooks.',
      categories: ['Payments', 'Commerce'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://stripe.com/docs/api',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://stripe.com/docs/api',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Missing raw body buffer on webhook endpoints causes cryptographic signature verification failures',
        'Failing to pass idempotency keys on payment intent creation during network retries',
        'Storing Stripe API secret keys in client-side bundles instead of server-side environment variables',
      ],
      checklist: [
        'Webhook endpoint uses express.raw({ type: "application/json" })',
        'STRIPE_WEBHOOK_SECRET and STRIPE_SECRET_KEY are loaded via environment variables',
        'All payment intents specify an explicit currency code and integer amount in cents',
      ],
    },
  },
  supabase: {
    label: 'Supabase (Database & Auth)',
    data: {
      name: 'supabase',
      version: '1.0.0',
      description: 'Open source Firebase alternative providing Postgres database, Auth, and Storage.',
      categories: ['Databases', 'Authentication', 'Storage'],
      languages: ['typescript', 'python', 'sql'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://supabase.com/docs/reference/javascript/introduction',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://supabase.com/docs/reference/javascript/introduction',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Querying Postgres tables without enabling Row-Level Security (RLS) exposes all user rows',
        'Using the service_role key in browser-accessible client code instead of anon key',
        'Connecting directly without Supavisor transaction pooler in serverless environments',
      ],
      checklist: [
        'RLS policies are enabled and verified with auth.uid() checks on every public table',
        'Serverless functions connect through port 6543 (transaction pooling)',
        'Client-side calls use createBrowserClient with public anon key',
      ],
    },
  },
  openai: {
    label: 'OpenAI (LLM & Embeddings)',
    data: {
      name: 'openai',
      version: '1.0.0',
      description: 'Frontier AI models for natural language generation, reasoning, embeddings, and vision.',
      categories: ['AI', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://platform.openai.com/docs/api-reference',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://platform.openai.com/docs/api-reference',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy chat completion models instead of modern structured outputs (response_format)',
        'Neglecting to attach AbortController signals to streaming requests when users cancel',
        'Exposing OPENAI_API_KEY in client bundles rather than proxying through secure server routes',
      ],
      checklist: [
        'Responses use zod or JSON schema validation with response_format: { type: "json_object" }',
        'Streaming chunk readers handle [DONE] and stream abort cancellations cleanly',
        'API requests run on Node.js/Edge runtime behind authenticated backend routes',
      ],
    },
  },
  resend: {
    label: 'Resend (Transactional Email)',
    data: {
      name: 'resend',
      version: '1.0.0',
      description: 'Email API for developers to send transactional emails using React Email and modern SDKs.',
      categories: ['Email', 'Communications'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://resend.com/docs/api-reference/introduction',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://resend.com/docs/api-reference/introduction',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Sending emails from unverified domain addresses (failing SPF, DKIM, and DMARC checks)',
        'Sending individual emails in tight for-loops instead of using resend.batch.send()',
        'Hardcoding sender addresses without environment-specific fallback',
      ],
      checklist: [
        'Custom domain DNS records (SPF, DKIM, MX) are verified before production dispatch',
        'Batch sends use resend.batch.send([...]) to avoid HTTP connection exhaustion',
        'RESEND_API_KEY is configured exclusively in server environment variables',
      ],
    },
  },
  clerk: {
    label: 'Clerk (Authentication)',
    data: {
      name: 'clerk',
      version: '1.0.0',
      description: 'Comprehensive authentication, user management, and session middleware for modern web frameworks.',
      categories: ['Authentication', 'Security'],
      languages: ['typescript'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://clerk.com/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://clerk.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using legacy authMiddleware() from @clerk/nextjs instead of clerkMiddleware() in v5+',
        'Missing createRouteMatcher() resulting in unprotected API routes',
        'Accessing auth().userId on client components without checking isLoaded state',
      ],
      checklist: [
        'middleware.ts implements clerkMiddleware() and createRouteMatcher()',
        'Public routes (e.g., /, /sign-in, /sign-up) are explicitly excluded from protection',
        'NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY are set',
      ],
    },
  },
};

const selectedPreset = ref('stripe');
const metadata = ref(JSON.stringify(PRESETS.stripe.data, null, 2));
const activeTab = ref('validator');
const searchQuery = ref('');

function loadPreset(key) {
  selectedPreset.value = key;
  if (PRESETS[key]) {
    metadata.value = JSON.stringify(PRESETS[key].data, null, 2);
  } else {
    metadata.value = JSON.stringify(
      {
        name: 'custom-skill',
        version: '1.0.0',
        description: 'A custom verified API skill specification.',
        categories: ['Developer Tools'],
        languages: ['typescript'],
        author: 'Skill Author',
        license: 'MIT',
        links: {
          'API Reference': 'https://example.com/docs',
        },
        schemaVersion: '1.0.0',
        validationStatus: 'validated',
        maintainer: 'Skill Author',
        lastUpdated: new Date().toISOString().split('T')[0],
        documentationSource: 'https://example.com/docs',
        supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
        compatibility: 'SKILL.md v1.0',
        lastVerified: new Date().toISOString().split('T')[0],
        pitfalls: ['Document common agent hallucination patterns here'],
        checklist: ['Step 1 verification check', 'Step 2 verification check'],
      },
      null,
      2,
    );
  }
}

const parsedMetadata = computed(() => {
  try {
    return JSON.parse(metadata.value);
  } catch (e) {
    return null;
  }
});

const jsonParseError = computed(() => {
  try {
    JSON.parse(metadata.value);
    return null;
  } catch (e) {
    return e.message;
  }
});

const validationDiagnostics = computed(() => {
  if (jsonParseError.value) {
    return [
      {
        rule: 'V-001',
        category: 'Syntax',
        severity: 'error',
        message: `JSON Syntax Error: ${jsonParseError.value}`,
        suggestion: 'Fix syntax error in metadata JSON editor.',
      },
    ];
  }

  const m = parsedMetadata.value;
  if (!m) return [];

  const diagnostics = [];

  // V-001: Required Core Fields
  if (!m.name || typeof m.name !== 'string') {
    diagnostics.push({
      rule: 'V-001',
      category: 'Metadata Presence',
      severity: 'error',
      message: 'Field "name" is missing or not a string.',
      suggestion: 'Add "name": "<skill-slug>" to metadata.json.',
    });
  } else if (!/^[a-z0-9-]+$/.test(m.name)) {
    diagnostics.push({
      rule: 'V-001',
      category: 'Identifier Format',
      severity: 'error',
      message: `Skill name "${m.name}" must be kebab-case (lowercase letters, numbers, and hyphens).`,
      suggestion: 'Format the name like "aws-s3" or "stripe".',
    });
  }

  // V-002: Version validation
  if (!m.version) {
    diagnostics.push({
      rule: 'V-002',
      category: 'Versioning',
      severity: 'error',
      message: 'Field "version" is missing.',
      suggestion: 'Add "version": "1.0.0" following semantic versioning.',
    });
  } else if (!/^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$/.test(m.version)) {
    diagnostics.push({
      rule: 'V-002',
      category: 'Versioning',
      severity: 'error',
      message: `Version "${m.version}" does not follow semantic versioning (e.g., 1.0.0).`,
      suggestion: 'Use a semver string like "1.0.0".',
    });
  }

  // V-003: Description length
  if (!m.description || m.description.length < 10) {
    diagnostics.push({
      rule: 'V-003',
      category: 'Content Completeness',
      severity: 'warning',
      message: 'Description should be descriptive (at least 10 characters).',
      suggestion: 'Provide a clear summary of what the API skill enables.',
    });
  }

  // V-004: Categories array
  if (!Array.isArray(m.categories) || m.categories.length === 0) {
    diagnostics.push({
      rule: 'V-004',
      category: 'Classification',
      severity: 'error',
      message: 'Field "categories" must be a non-empty array of strings.',
      suggestion: 'Add categories such as ["Payments", "Commerce"].',
    });
  }

  // V-005: Agent Compatibility
  const validAgents = ['cursor', 'claude-code', 'cline', 'continue', 'codex', 'gemini-cli'];
  if (!Array.isArray(m.supportedAgents) || m.supportedAgents.length === 0) {
    diagnostics.push({
      rule: 'V-005',
      category: 'Agent Compatibility',
      severity: 'warning',
      message: 'Field "supportedAgents" is missing or empty.',
      suggestion: `Add supported agents, e.g., ["cursor", "claude-code", "cline", "continue"].`,
    });
  } else {
    const unknown = m.supportedAgents.filter((a) => !validAgents.includes(a));
    if (unknown.length > 0) {
      diagnostics.push({
        rule: 'V-005',
        category: 'Agent Compatibility',
        severity: 'warning',
        message: `Unrecognized agent identifier(s): ${unknown.join(', ')}.`,
        suggestion: `Standard supported agents: ${validAgents.join(', ')}.`,
      });
    }
  }

  // V-006: Freshness & Trust Verification
  if (!m.lastVerified) {
    diagnostics.push({
      rule: 'V-006',
      category: 'Trust & Freshness',
      severity: 'warning',
      message: 'Missing "lastVerified" audit timestamp.',
      suggestion: 'Add "lastVerified": "YYYY-MM-DD" to certify verification freshness.',
    });
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(m.lastVerified)) {
    diagnostics.push({
      rule: 'V-006',
      category: 'Trust & Freshness',
      severity: 'warning',
      message: `Invalid "lastVerified" format "${m.lastVerified}". Expected ISO date YYYY-MM-DD.`,
      suggestion: 'Format date as YYYY-MM-DD (e.g., 2026-07-03).',
    });
  }

  // V-007: Documentation URL
  if (m.documentationSource && !/^https?:\/\//.test(m.documentationSource)) {
    diagnostics.push({
      rule: 'V-007',
      category: 'Documentation Link',
      severity: 'error',
      message: '"documentationSource" must be a valid HTTP or HTTPS URL.',
      suggestion: 'Specify a valid link to official documentation.',
    });
  }

  // V-008: AI Pitfalls & Checklist Check
  if (!Array.isArray(m.pitfalls) || m.pitfalls.length === 0) {
    diagnostics.push({
      rule: 'V-008',
      category: 'AI Guidance',
      severity: 'warning',
      message: 'No "pitfalls" array defined. Skills should document common LLM hallucinations.',
      suggestion: 'Include 2-3 specific traps that AI models make when implementing this API.',
    });
  }

  return diagnostics;
});

const isFullyValid = computed(() => {
  return (
    validationDiagnostics.value.length > 0 &&
    !validationDiagnostics.value.some((d) => d.severity === 'error')
  );
});

const generatedSkillMarkdown = computed(() => {
  const m = parsedMetadata.value;
  if (!m) return '# Invalid JSON\n\nPlease fix JSON syntax errors in the editor to preview generated SKILL.md.';

  const agentsList = (m.supportedAgents || ['cursor', 'claude-code', 'cline', 'continue']).join(', ');
  const cats = (m.categories || ['General']).join(', ');
  const langs = (m.languages || ['typescript']).join(', ');
  const pitfallsList = (m.pitfalls || [
    'Hallucinating deprecated method names from older major SDK versions',
    'Omitting required server-side authentication headers or secrets in client runtime',
  ])
    .map((p, idx) => `${idx + 1}. **${p}**`)
    .join('\n');

  const checklistItems = (m.checklist || [
    'API credentials are securely loaded via environment variables',
    'Input validation conforms to official schema types',
    'Production error handling and retries are implemented',
  ])
    .map((c) => `- [ ] ${c}`)
    .join('\n');

  return `---
name: ${m.name || 'unnamed-skill'}
version: ${m.version || '1.0.0'}
description: ${m.description || ''}
compatibility: ${m.compatibility || 'SKILL.md v1.0'}
lastVerified: ${m.lastVerified || new Date().toISOString().split('T')[0]}
supportedAgents: [${agentsList}]
---

# ${m.name ? m.name.toUpperCase() : 'SKILL'} Integration Guide

> **Category:** ${cats} | **SDK Languages:** ${langs}  
> **Source:** [Official Documentation](${m.documentationSource || '#'})  
> **Agent Compatibility:** ${agentsList}

${m.description || ''}

---

## 1. Quickstart & Setup

\`\`\`bash
# Install required dependencies
npm install ${m.name || 'api-package'}
\`\`\`

\`\`\`typescript
// Environment setup and client initialization
import { Client } from '${m.name || 'api-package'}';

const client = new Client({
  apiKey: process.env.${(m.name || 'API').toUpperCase().replace(/[^A-Z0-9]/g, '_')}_KEY!,
});
\`\`\`

---

## 2. Critical AI Pitfalls & Anti-Hallucination Guidelines

${pitfallsList}

---

## 3. Production Verification Checklist

${checklistItems}
`;
});

const registryNodeEntry = computed(() => {
  const m = parsedMetadata.value;
  if (!m) return null;
  return {
    id: m.name || 'unnamed',
    version: m.version || '1.0.0',
    description: m.description || '',
    categories: m.categories || [],
    languages: m.languages || [],
    supportedAgents: m.supportedAgents || [],
    status: m.validationStatus || 'validated',
    lastVerified: m.lastVerified || new Date().toISOString().split('T')[0],
    documentationSource: m.documentationSource || null,
    links: m.links || {},
  };
});

const searchIndexEntry = computed(() => {
  const m = parsedMetadata.value;
  if (!m) return null;

  const rawTokens = [
    m.name,
    ...(m.categories || []),
    ...(m.languages || []),
    ...(m.supportedAgents || []),
    ...(m.pitfalls || []).flatMap((p) => p.toLowerCase().split(/\W+/).filter((w) => w.length > 3)),
  ]
    .filter(Boolean)
    .map((t) => t.toLowerCase());

  const uniqueTokens = Array.from(new Set(rawTokens));

  const query = searchQuery.value.trim().toLowerCase();
  const matchedTokens = query ? uniqueTokens.filter((t) => t.includes(query)) : [];
  const score = query ? (matchedTokens.length * 10 + (m.name?.includes(query) ? 50 : 0)) : null;

  return {
    id: m.name || 'unnamed',
    tokenCount: uniqueTokens.length,
    indexedTokens: uniqueTokens.slice(0, 30),
    queryTest: query
      ? {
          query,
          matched: matchedTokens.length > 0,
          matchedTokens,
          relevanceScore: score,
        }
      : { message: 'Type in Search Query Test below to simulate match relevance' },
  };
});
</script>

<template>
  <div class="playground-container">
    <!-- Preset Header Controls -->
    <div class="preset-bar">
      <span class="preset-label">Load Realistic Skill Preset:</span>
      <div class="preset-buttons">
        <button
          v-for="(val, key) in PRESETS"
          :key="key"
          type="button"
          :class="['preset-btn', { active: selectedPreset === key }]"
          @click="loadPreset(key)"
        >
          {{ val.data.name }}
        </button>
        <button
          type="button"
          :class="['preset-btn', { active: selectedPreset === 'custom' }]"
          @click="loadPreset('custom')"
        >
          + Custom
        </button>
      </div>
    </div>

    <div class="playground">
      <!-- Editor Column -->
      <div class="editor-pane">
        <div class="pane-header">
          <span>metadata.json</span>
          <span v-if="jsonParseError" class="badge error">JSON Syntax Error</span>
          <span v-else-if="isFullyValid" class="badge success">Schema Valid</span>
          <span v-else class="badge warning">Needs Attention</span>
        </div>
        <textarea
          v-model="metadata"
          aria-label="Skill metadata JSON editor"
          spellcheck="false"
        ></textarea>
      </div>

      <!-- Preview Column -->
      <div class="preview-pane">
        <div class="tabs">
          <button
            type="button"
            :class="{ active: activeTab === 'validator' }"
            @click="activeTab = 'validator'"
          >
            Validator
            <span
              v-if="validationDiagnostics.some((d) => d.severity === 'error')"
              class="tab-count error"
            >
              {{ validationDiagnostics.filter((d) => d.severity === 'error').length }}
            </span>
          </button>
          <button
            type="button"
            :class="{ active: activeTab === 'docs' }"
            @click="activeTab = 'docs'"
          >
            SKILL.md Preview
          </button>
          <button
            type="button"
            :class="{ active: activeTab === 'registry' }"
            @click="activeTab = 'registry'"
          >
            Registry Node
          </button>
          <button
            type="button"
            :class="{ active: activeTab === 'search' }"
            @click="activeTab = 'search'"
          >
            Search Index
          </button>
        </div>

        <div class="preview-content">
          <!-- Validator Tab -->
          <div v-if="activeTab === 'validator'" class="validator-view">
            <div v-if="isFullyValid && validationDiagnostics.length === 0" class="diagnostic-card success">
              <div class="diag-header">
                <span class="status-icon">✓</span>
                <strong>All Validation Checks Passed</strong>
              </div>
              <p>Metadata conforms to the official SKILL.md v1.0 specification with no diagnostics or warnings.</p>
            </div>

            <div
              v-for="(diag, idx) in validationDiagnostics"
              :key="idx"
              :class="['diagnostic-card', diag.severity]"
            >
              <div class="diag-header">
                <span class="diag-rule">[{{ diag.rule }}]</span>
                <span class="diag-category">{{ diag.category }}</span>
                <span :class="['severity-pill', diag.severity]">{{ diag.severity.toUpperCase() }}</span>
              </div>
              <div class="diag-msg">{{ diag.message }}</div>
              <div class="diag-sugg"><strong>Recommendation:</strong> {{ diag.suggestion }}</div>
            </div>

            <div class="rule-summary">
              <h4>Active Rules (@awesome-api-skills/validator)</h4>
              <ul>
                <li><strong>V-001:</strong> Identifier & JSON syntax validation</li>
                <li><strong>V-002:</strong> Semantic versioning check (semver)</li>
                <li><strong>V-003:</strong> Description completeness check</li>
                <li><strong>V-004:</strong> Category tagging validation</li>
                <li><strong>V-005:</strong> Agent compatibility verification</li>
                <li><strong>V-006:</strong> Freshness audit timestamp (lastVerified)</li>
                <li><strong>V-007:</strong> Documentation URL validation</li>
                <li><strong>V-008:</strong> AI anti-hallucination pitfalls coverage</li>
              </ul>
            </div>
          </div>

          <!-- Documentation Tab -->
          <div v-if="activeTab === 'docs'" class="docs-view">
            <div class="docs-notice">
              This preview illustrates the generated <code>SKILL.md</code> ingested by Cursor, Claude Code, Cline, and Continue:
            </div>
            <pre class="code-block">{{ generatedSkillMarkdown }}</pre>
          </div>

          <!-- Registry Tab -->
          <div v-if="activeTab === 'registry'" class="registry-view">
            <div class="docs-notice">
              Exact schema representation inside <code>registry/graph.json</code> & <code>registry/manifest.json</code>:
            </div>
            <pre class="code-block">{{ JSON.stringify(registryNodeEntry, null, 2) }}</pre>
          </div>

          <!-- Search Tab -->
          <div v-if="activeTab === 'search'" class="search-view">
            <div class="search-tester">
              <label for="search-sim-input" class="search-label">Simulate Search Query:</label>
              <input
                id="search-sim-input"
                v-model="searchQuery"
                type="text"
                placeholder="e.g. stripe, rls, webhook, embeddings, auth..."
                class="search-input"
              />
            </div>
            <pre class="code-block">{{ JSON.stringify(searchIndexEntry, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.playground-container {
  margin-top: 1.5rem;
  margin-bottom: 3rem;
}

.preset-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.preset-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.preset-btn {
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.25rem 0.65rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: all 0.15s ease;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.preset-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 900px) {
  .playground {
    flex-direction: row;
    height: 640px;
  }
}

.editor-pane,
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
}

.badge.success {
  background: #dcfce7;
  color: #166534;
}

.badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.badge.error {
  background: #fee2e2;
  color: #991b1b;
}

textarea {
  flex: 1;
  width: 100%;
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  line-height: 1.5;
  border: none;
  background: transparent;
  color: var(--vp-c-text-1);
  resize: none;
  outline: none;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.tabs button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.65rem 0.5rem;
  font-size: 0.8rem;
  background: none;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: color 0.15s ease;
}

.tabs button:last-child {
  border-right: none;
}

.tabs button.active {
  color: var(--vp-c-brand-1);
  border-bottom: 2px solid var(--vp-c-brand-1);
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

.tab-count.error {
  background: #ef4444;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 999px;
  padding: 0 0.4rem;
  font-weight: 700;
}

.preview-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
}

.docs-notice {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  margin-bottom: 0.75rem;
  padding: 0.4rem 0.75rem;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.code-block {
  margin: 0;
  padding: 0.85rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.8rem;
  line-height: 1.45;
  white-space: pre-wrap;
  word-break: break-word;
  background: var(--vp-c-bg);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.diagnostic-card {
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  border: 1px solid;
}

.diagnostic-card.error {
  background: #fef2f2;
  border-color: #fca5a5;
  color: #991b1b;
}

.diagnostic-card.warning {
  background: #fffbeb;
  border-color: #fcd34d;
  color: #92400e;
}

.diagnostic-card.success {
  background: #f0fdf4;
  border-color: #86efac;
  color: #166534;
}

.dark .diagnostic-card.error {
  background: #450a0a;
  border-color: #991b1b;
  color: #fca5a5;
}

.dark .diagnostic-card.warning {
  background: #451a03;
  border-color: #92400e;
  color: #fcd34d;
}

.dark .diagnostic-card.success {
  background: #052e16;
  border-color: #166534;
  color: #86efac;
}

.diag-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.diag-rule {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  font-size: 0.75rem;
}

.diag-category {
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
}

.severity-pill {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.4rem;
  border-radius: 999px;
  margin-left: auto;
}

.severity-pill.error {
  background: #ef4444;
  color: #fff;
}

.severity-pill.warning {
  background: #f59e0b;
  color: #fff;
}

.diag-msg {
  margin-bottom: 0.35rem;
  font-weight: 500;
}

.diag-sugg {
  font-size: 0.8rem;
  opacity: 0.9;
}

.rule-summary {
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  font-size: 0.8rem;
}

.rule-summary h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.85rem;
}

.rule-summary ul {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.6;
}

.search-tester {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.search-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.search-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  outline: none;
}

.search-input:focus {
  border-color: var(--vp-c-brand-1);
}
</style>
