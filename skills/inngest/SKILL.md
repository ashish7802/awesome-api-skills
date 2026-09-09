# Inngest API Skill

## Overview
Inngest is a developer-first platform for writing durable background jobs, scheduled tasks, and complex multi-step workflows directly in your codebase.

## Installation
```bash
npm install inngest
```

## Client & Workflow Definition
```typescript
import { Inngest } from 'inngest';

export const inngest = new Inngest({ id: 'my-saas-app' });

// Define a multi-step durable workflow
export const onboardUserWorkflow = inngest.createFunction(
  { id: 'onboard-user', retries: 3 },
  { event: 'app/user.signup' },
  async ({ event, step }) => {
    // Step 1: Create Stripe customer
    const customer = await step.run('create-stripe-customer', async () => {
      return { customerId: 'cus_123', email: event.data.email };
    });

    // Step 2: Sleep for 3 days without keeping server active
    await step.sleep('wait-for-trial', '3 days');

    // Step 3: Send check-in email
    await step.run('send-checkin-email', async () => {
      console.log('Sending follow up email to', customer.email);
      return { sent: true };
    });

    return { completed: true };
  }
);
```

## Next.js / Framework Route Setup
```typescript
// app/api/inngest/route.ts
import { serve } from 'inngest/next';
import { inngest, onboardUserWorkflow } from '@/lib/inngest';

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [onboardUserWorkflow],
});
```

## Sending Events
```typescript
await inngest.send({
  name: 'app/user.signup',
  data: {
    userId: 'usr_456',
    email: 'alex@example.com',
  },
});
```

## AI Pitfalls & Anti-Hallucination Guidelines
- **Step Code Execution**: Inngest re-executes function code between steps to memoize results. Code outside `step.run()` will run multiple times. Put all side-effects inside `step.run()`.
- **Serialization**: Return values from `step.run()` must be JSON-serializable (no raw socket handles or circular references).

## Production Verification Checklist
- [ ] `serve()` endpoint is publicly reachable or routed via Inngest Dev Server
- [ ] Side-effects wrapped inside `step.run()`
- [ ] Concurrency and rate limit keys configured for external API calls

---
> **Last Verified:** 2026-07-03
