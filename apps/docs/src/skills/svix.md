---
title: svix
---

# svix

<p class="skill-meta">Developer Tools · Security · Communications</p>


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
  <div class="trust-doc-link"><a href="https://docs.svix.com" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **works well with** → [stripe](/skills/stripe)
- **works well with** → [clerk](/skills/clerk)
- **works well with** → [resend](/skills/resend)

---


## Overview
Svix is the industry standard for sending and verifying webhooks reliably, used by Clerk, Brex, Resend, and thousands of platforms.

## Installation
```bash
npm install svix
pip install svix
```

## Verifying Inbound Webhooks
To verify a webhook received from Svix or a service that uses standard Svix signatures (like Clerk or Resend):

```typescript
import { Webhook } from 'svix';

export async function verifyIncomingWebhook(
  rawBody: string,
  headers: Record<string, string>
) {
  const secret = process.env.WEBHOOK_SECRET!;
  const wh = new Webhook(secret);

  const payload = wh.verify(rawBody, {
    'svix-id': headers['svix-id'],
    'svix-timestamp': headers['svix-timestamp'],
    'svix-signature': headers['svix-signature'],
  });

  return payload;
}
```

## Sending Outbound Webhooks via Svix API
```typescript
import { Svix } from 'svix';

const svix = new Svix(process.env.SVIX_AUTH_TOKEN!);

// Create an application for a tenant
const app = await svix.application.create({
  name: 'Customer Org 42',
  uid: 'org_42',
});

// Send an event message
await svix.message.create('org_42', {
  eventType: 'invoice.created',
  payload: {
    id: 'inv_9981',
    amount: 5000,
    currency: 'USD',
  },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Raw Body Requirement**: Passing a JSON-parsed object to `wh.verify` fails cryptographic verification. Always pass the exact raw body string or buffer.
- **Header Casing**: Svix headers are lowercase: `svix-id`, `svix-timestamp`, `svix-signature`.

## Production Verification Checklist
- [ ] Express / Next.js route handler configures raw body reader
- [ ] Webhook secret verified against environment (whsec_...)
- [ ] Svix timestamp tolerance checked (default 5 minutes)

---
> **Last Verified:** 2026-07-03

