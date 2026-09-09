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
  qdrant: {
    label: 'Qdrant (Vector DB & RAG)',
    data: {
      name: 'qdrant',
      version: '1.0.0',
      description: 'Vector similarity search engine and database for production AI embeddings and RAG pipelines.',
      categories: ['AI', 'Databases', 'Search'],
      languages: ['typescript', 'python', 'rust'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://qdrant.tech/documentation/',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://qdrant.tech/documentation/',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Inserting vector dimensions that mismatch collection vector parameters (e.g., 1536 vs 3072)',
        'Forgetting to create payload indexes on filter fields before running large filtered searches',
        'Passing integer IDs as strings or UUIDs when collection expects a specific ID format',
      ],
      checklist: [
        'Collection vector size matches the exact embedding model output dimensions',
        'Payload fields used in filter queries are indexed with createPayloadIndex',
        'QDRANT_URL and QDRANT_API_KEY are configured in server-side environment variables',
      ],
    },
  },
  deepseek: {
    label: 'DeepSeek (R1 Reasoning & V3)',
    data: {
      name: 'deepseek',
      version: '1.0.0',
      description: 'DeepSeek frontier reasoning (R1) and general chat (V3) models with OpenAI-compatible API endpoints.',
      categories: ['AI', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://platform.deepseek.com/api-docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://platform.deepseek.com/api-docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Omitting baseURL: "https://api.deepseek.com" when using the standard openai SDK client',
        'Confusing reasoning model "deepseek-reasoner" (which includes reasoning_content) with "deepseek-chat"',
        'Setting temperature too high on deepseek-reasoner (recommended: 0.6 or default)',
      ],
      checklist: [
        'Client sets baseURL: "https://api.deepseek.com"',
        'DEEPSEEK_API_KEY loaded securely in server environment variables',
        'Streaming handler separates delta.reasoning_content from delta.content on deepseek-reasoner',
      ],
    },
  },
  groq: {
    label: 'Groq (Ultra-Fast LPU Inference)',
    data: {
      name: 'groq',
      version: '1.0.0',
      description: 'Ultra-low latency inference engine powered by Groq LPU chips for real-time AI and voice pipelines.',
      categories: ['AI', 'Performance', 'Machine Learning'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://console.groq.com/docs/quickstart',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://console.groq.com/docs/quickstart',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Using deprecated model names like llama3-8b-8192 instead of modern llama-3.3-70b-versatile',
        'Not handling streaming backpressure when processing high token generation rates (500+ tok/s)',
        'Hardcoding GROQ_API_KEY in frontend client code',
      ],
      checklist: [
        'Using groq-sdk or OpenAI client with baseURL: "https://api.groq.com/openai/v1"',
        'GROQ_API_KEY loaded securely in backend environment',
        'Model ID verified against current Groq production catalog',
      ],
    },
  },
  inngest: {
    label: 'Inngest (Durable Workflows)',
    data: {
      name: 'inngest',
      version: '1.0.0',
      description: 'Event-driven durable execution engine for background jobs, workflows, and step functions without queues.',
      categories: ['Developer Tools', 'Serverless', 'Workflows'],
      languages: ['typescript', 'python'],
      author: 'Awesome API Skills Team',
      license: 'Apache-2.0',
      links: {
        'API Reference': 'https://www.inngest.com/docs',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://www.inngest.com/docs',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Executing non-deterministic operations (e.g. Math.random(), Date.now()) outside step.run() blocks',
        'Not returning serializable JSON data from step.run() calls',
        'Forgetting to export serve() handler from the API route (e.g., /api/inngest)',
      ],
      checklist: [
        'API handler exposed at /api/inngest with serve({ client: inngest, functions: [...] })',
        'All side-effects and external API calls wrapped in step.run()',
        'INNGEST_SIGNING_KEY and INNGEST_EVENT_KEY set in production',
      ],
    },
  },
  svix: {
    label: 'Svix (Webhooks Verification)',
    data: {
      name: 'svix',
      version: '1.0.0',
      description: 'Enterprise webhook sending service and cryptographic signature verification standard.',
      categories: ['Developer Tools', 'Security', 'Communications'],
      languages: ['typescript', 'python', 'go'],
      author: 'Awesome API Skills Team',
      license: 'MIT',
      links: {
        'API Reference': 'https://docs.svix.com',
      },
      schemaVersion: '1.0.0',
      validationStatus: 'validated',
      maintainer: 'Awesome API Skills Team',
      lastUpdated: '2026-07-02',
      documentationSource: 'https://docs.svix.com',
      supportedAgents: ['cursor', 'claude-code', 'cline', 'continue'],
      compatibility: 'SKILL.md v1.0',
      lastVerified: '2026-07-03',
      pitfalls: [
        'Attempting to verify webhook signatures against parsed JSON objects instead of raw string bodies',
        'Missing required headers: svix-id, svix-timestamp, svix-signature',
        'Not handling replay attack protection (timestamp drift validation)',
      ],
      checklist: [
        'Webhook headers passed exactly: svix-id, svix-timestamp, svix-signature',
        'Webhook secret starts with whsec_ and is retrieved from environment variables',
        'Verification runs on the raw, unparsed request payload string',
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

const copiedTarget = ref('');
function copyToClipboard(text, id) {
  if (!text) return;
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(typeof text === 'string' ? text : JSON.stringify(text, null, 2));
    copiedTarget.value = id;
    setTimeout(() => {
      if (copiedTarget.value === id) copiedTarget.value = '';
    }, 2000);
  }
}
</script>

<template>
  <div class="playground-container">
    <!-- Preset Header Controls -->
    <div class="preset-bar">
      <div class="preset-bar-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span>Preset Blueprints:</span>
      </div>
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
          :class="['preset-btn', 'custom-btn', { active: selectedPreset === 'custom' }]"
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
          <div class="pane-title">
            <span class="file-icon">📄</span>
            <span>metadata.json</span>
          </div>
          <div class="pane-actions">
            <span v-if="jsonParseError" class="badge error">JSON Syntax Error</span>
            <span v-else-if="isFullyValid" class="badge success">✓ Schema Valid</span>
            <span v-else class="badge warning">Needs Attention</span>
            <button
              type="button"
              class="copy-btn"
              title="Copy JSON"
              @click="copyToClipboard(metadata, 'metadata')"
            >
              {{ copiedTarget === 'metadata' ? 'Copied!' : 'Copy' }}
            </button>
          </div>
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
            <div class="preview-bar-actions">
              <div class="docs-notice">
                Generated <code>SKILL.md</code> ingested by Cursor, Claude Code, Cline, and Continue:
              </div>
              <button
                type="button"
                class="copy-btn preview-copy"
                @click="copyToClipboard(generatedSkillMarkdown, 'skillmd')"
              >
                {{ copiedTarget === 'skillmd' ? 'Copied SKILL.md!' : 'Copy SKILL.md' }}
              </button>
            </div>
            <pre class="code-block">{{ generatedSkillMarkdown }}</pre>
          </div>

          <!-- Registry Tab -->
          <div v-if="activeTab === 'registry'" class="registry-view">
            <div class="preview-bar-actions">
              <div class="docs-notice">
                Exact schema representation inside <code>registry/graph.json</code> & <code>registry/manifest.json</code>:
              </div>
              <button
                type="button"
                class="copy-btn preview-copy"
                @click="copyToClipboard(registryNodeEntry, 'registry')"
              >
                {{ copiedTarget === 'registry' ? 'Copied JSON!' : 'Copy Node JSON' }}
              </button>
            </div>
            <pre class="code-block">{{ JSON.stringify(registryNodeEntry, null, 2) }}</pre>
          </div>

          <!-- Search Tab -->
          <div v-if="activeTab === 'search'" class="search-view">
            <div class="search-tester">
              <label for="search-sim-input" class="search-label">Simulate Agent In-Memory Search Query:</label>
              <input
                id="search-sim-input"
                v-model="searchQuery"
                type="text"
                placeholder="e.g. stripe, rls, webhook, embeddings, vector, auth..."
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
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding: 0.85rem 1.15rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.preset-bar-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.84rem;
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
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}

.preset-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-elv);
}

.preset-btn.active {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  border-color: #38bdf8;
  font-weight: 600;
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.2);
}

.custom-btn {
  border-style: dashed;
}

.playground {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 900px) {
  .playground {
    flex-direction: row;
    height: 660px;
  }
}

.editor-pane,
.preview-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  background-color: var(--vp-c-bg-soft);
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.pane-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.pane-title {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--vp-c-text-1);
}

.pane-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.copy-btn {
  font-size: 0.75rem;
  padding: 0.2rem 0.55rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.preview-bar-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.preview-copy {
  white-space: nowrap;
}

.badge {
  font-size: 0.75rem;
  padding: 0.15rem 0.55rem;
  border-radius: 4px;
  font-weight: 600;
}

.badge.success {
  background: rgba(16, 185, 129, 0.15);
  color: #34d399;
  border: 1px solid rgba(16, 185, 129, 0.3);
}

.badge.warning {
  background: rgba(245, 158, 11, 0.15);
  color: #fbbf24;
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge.error {
  background: rgba(244, 63, 94, 0.15);
  color: #fda4af;
  border: 1px solid rgba(244, 63, 94, 0.3);
}

textarea {
  flex: 1;
  width: 100%;
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.85rem;
  line-height: 1.55;
  border: none;
  background: #090d16;
  color: #f8fafc;
  resize: none;
  outline: none;
}

.tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-alt);
}

.tabs button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.7rem 0.5rem;
  font-size: 0.82rem;
  background: none;
  border: none;
  border-right: 1px solid var(--vp-c-divider);
  cursor: pointer;
  color: var(--vp-c-text-2);
  transition: all 0.15s ease;
}

.tabs button:last-child {
  border-right: none;
}

.tabs button.active {
  color: #38bdf8;
  border-bottom: 2px solid #38bdf8;
  font-weight: 600;
  background: var(--vp-c-bg-soft);
}

.tab-count.error {
  background: #f43f5e;
  color: #fff;
  font-size: 0.7rem;
  border-radius: 999px;
  padding: 0 0.45rem;
  font-weight: 700;
}

.preview-content {
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
}

.docs-notice {
  font-size: 0.82rem;
  color: var(--vp-c-text-2);
  padding: 0.45rem 0.75rem;
  background: var(--vp-c-bg-alt);
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  flex-grow: 1;
}

.code-block {
  margin: 0;
  padding: 1rem;
  font-family: var(--vp-font-family-mono);
  font-size: 0.82rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
  background: #090d16;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  color: #f8fafc;
}

.diagnostic-card {
  padding: 0.85rem 1.15rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  border: 1px solid;
}

.diagnostic-card.error {
  background: rgba(244, 63, 94, 0.1);
  border-color: rgba(244, 63, 94, 0.35);
  color: #fda4af;
}

.diagnostic-card.warning {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.35);
  color: #fcd34d;
}

.diagnostic-card.success {
  background: rgba(16, 185, 129, 0.1);
  border-color: rgba(16, 185, 129, 0.35);
  color: #86efac;
}

.diag-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.diag-rule {
  font-family: var(--vp-font-family-mono);
  font-weight: 700;
  font-size: 0.78rem;
}

.diag-category {
  font-size: 0.78rem;
  color: var(--vp-c-text-2);
}

.severity-pill {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.1rem 0.45rem;
  border-radius: 999px;
  margin-left: auto;
}

.severity-pill.error {
  background: #f43f5e;
  color: #fff;
}

.severity-pill.warning {
  background: #f59e0b;
  color: #000;
}

.diag-msg {
  margin-bottom: 0.4rem;
  font-weight: 500;
}

.diag-sugg {
  font-size: 0.82rem;
  opacity: 0.95;
}

.rule-summary {
  margin-top: 1.5rem;
  padding: 0.85rem 1.15rem;
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  font-size: 0.82rem;
}

.rule-summary h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.88rem;
  color: var(--vp-c-text-1);
}

.rule-summary ul {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.search-tester {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-bottom: 0.75rem;
}

.search-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.search-input {
  width: 100%;
  padding: 0.6rem 0.85rem;
  font-size: 0.85rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: #090d16;
  color: #f8fafc;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #38bdf8;
  box-shadow: 0 0 8px rgba(56, 189, 248, 0.2);
}
</style>
