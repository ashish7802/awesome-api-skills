# Novu Notification Platform API Skill

## Overview
Novu provides an open-source, full-stack notification infrastructure. Route and coordinate multi-channel notifications (In-app inbox, Email via Resend/SendGrid, SMS via Twilio, Push via FCM, and Slack/Discord).

## Installation
```bash
npm install @novu/node
```

## Initialization & Triggering Notification Workflows
```typescript
import { Novu } from '@novu/node';

const novu = new Novu(process.env.NOVU_SECRET_KEY!);

// Trigger a workflow across all configured channels
await novu.trigger('comment-mention-workflow', {
  to: {
    subscriberId: 'usr_87612',
    email: 'sarah@example.com',
    phone: '+15550199283',
    firstName: 'Sarah',
  },
  payload: {
    authorName: 'David',
    commentSnippet: 'Can you review this pull request before deploying?',
    documentUrl: 'https://app.example.com/docs/42',
  },
});
```

## Managing Subscriber Preferences
```typescript
// Update subscriber channel preferences
await novu.subscribers.updatePreference('usr_87612', 'comment-mention-workflow', {
  channel: {
    type: 'email',
    enabled: true,
  },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Workflow Slugs**: The workflow identifier must match the exact workflow ID configured in your Novu organization.
- **Client vs Server SDK**: Never use `@novu/node` on client-side React apps; use `@novu/notification-center` for in-app UI widgets.

## Production Verification Checklist
- [ ] In-app notification center mounted on frontend
- [ ] Email/SMS providers configured and connected in Novu integrations tab
- [ ] Subscriber IDs correspond to primary user database IDs

---
> **Last Verified:** 2026-07-03
