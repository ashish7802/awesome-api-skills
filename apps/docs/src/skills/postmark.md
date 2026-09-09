---
title: postmark
---

# postmark

<p class="skill-meta">Email · Communications</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://postmarkapp.com/developer) |

</div>


## Graph

- **alternative to** → [resend](/skills/resend)
- **alternative to** → [sendgrid](/skills/sendgrid)

---


## Overview
Postmark specializes in lightning-fast transactional email delivery with industry-leading inbox placement, detailed bounce classification, and templating.

## Installation
```bash
npm install postmark
```

## Setup & Sending Emails
```typescript
import { ServerClient } from 'postmark';

const client = new ServerClient(process.env.POSTMARK_SERVER_API_TOKEN!);

// Send single transactional email
await client.sendEmail({
  From: 'support@myverifieddomain.com',
  To: 'user@example.com',
  Subject: 'Password Reset Request',
  HtmlBody: '<p>Click <a href="https://example.com/reset">here</a> to reset your password.</p>',
  TextBody: 'Visit https://example.com/reset to reset your password.',
  MessageStream: 'outbound',
});
```

## Sending via Postmark Template
```typescript
await client.sendEmailWithTemplate({
  From: 'notifications@myverifieddomain.com',
  To: 'customer@example.com',
  TemplateAlias: 'welcome-email',
  TemplateModel: {
    name: 'Alex',
    action_url: 'https://myverifieddomain.com/dashboard',
    product_name: 'Awesome Platform',
  },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Token Confusion**: Postmark has Account API Tokens (admin operations) and Server API Tokens (sending emails). Do not send emails using Account Tokens.
- **Sender Signatures**: Attempting to send from an unverified `From` address will return an HTTP 422 error.

## Production Verification Checklist
- [ ] SPF, DKIM, and DMARC DNS records configured on sending domain
- [ ] Inbound webhooks verified with IP filtering or basic auth
- [ ] Bounce webhook configured to suppress inactive email addresses

---
> **Last Verified:** 2026-07-03

