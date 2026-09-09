---
title: unkey
---

# unkey

<p class="skill-meta">Security · Developer Tools · Serverless</p>


<div class="trust-panel">
  <div class="trust-header">
    <div class="trust-badge">
      <span class="pulse-dot"></span>
      <span>validated</span>
    </div>
    <span class="trust-version">Schema v1.0.0</span>
  </div>
  <div class="trust-grid">
    <div class="trust-item">
      <span class="trust-label">Maintainer</span>
      <span class="trust-val">Awesome API Skills Team</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Last Verified</span>
      <span class="trust-val">2026-07-03</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">typescript, python, go</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://www.unkey.com/docs" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **works well with** → [hono](/skills/hono)
- **works well with** → [cloudflare-workers](/skills/cloudflare-workers)

---


## Overview
Unkey is high-performance infrastructure for minting, revoking, validating API keys, and enforcing distributed rate limits at the edge with global sub-10ms response times.

## Installation
```bash
npm install @unkey/api @unkey/ratelimit
```

## Verifying an Inbound API Key
```typescript
import { verifyKey } from '@unkey/api';

export async function authenticateApiKey(apiKeyValue: string) {
  const { result, error } = await verifyKey({
    key: apiKeyValue,
    apiId: process.env.UNKEY_API_ID!,
  });

  if (error) {
    console.error('Unkey verification failed:', error);
    return { authenticated: false };
  }

  if (!result.valid) {
    return { authenticated: false, reason: result.code };
  }

  return {
    authenticated: true,
    ownerId: result.ownerId,
    meta: result.meta,
  };
}
```

## Creating a New Customer API Key
```typescript
import { Unkey } from '@unkey/api';

const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY! });

const created = await unkey.keys.create({
  apiId: process.env.UNKEY_API_ID!,
  prefix: 'acme',
  ownerId: 'user_9921',
  name: 'Production Worker Key',
  ratelimit: {
    type: 'fast',
    limit: 100,
    duration: 60000, // 100 requests per minute
  },
  meta: {
    tier: 'enterprise',
  },
});

console.log('Customer API Key:', created.result?.key);
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Plaintext Key Security**: The plaintext API key is only returned once upon creation. Store hash or instruct user to copy immediately.
- **Root Key vs Client Verification**: Key creation requires `UNKEY_ROOT_KEY`. Verification only requires `apiId`.

## Production Verification Checklist
- [ ] API keys verified on edge runtime before handler execution
- [ ] Rate limit exhaustion returns HTTP 429 Too Many Requests
- [ ] Key prefixes utilized to simplify customer debugging (e.g. `pk_live_...`)

---
> **Last Verified:** 2026-07-03

