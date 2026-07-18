# Real Agent Comparisons — Before vs. After SKILL.md Context

This document provides verified side-by-side comparisons showing how supplying a `SKILL.md` file eliminates common LLM hallucinations and API misuse when building integrations.

---

## 1. Stripe Webhooks (Express.js)

### User Prompt

> "Create an Express.js endpoint to handle Stripe webhooks at `/webhook`."

### Without `stripe/SKILL.md` (LLM Baseline Output)

```typescript
import express from 'express';
import Stripe from 'stripe';

const app = express();
app.use(express.json()); // ❌ ERROR: Modifies raw body buffer!

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

app.post('/webhook', (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    // Fails with: StripeSignatureVerificationError: No signatures found matching...
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
    res.json({ received: true });
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

### With `stripe/SKILL.md` (Corrected Output)

```typescript
import express from 'express';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// ✅ CORRECT: Raw body buffer required for cryptographic signature verification
app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  try {
    const event = stripe.webhooks.constructEvent(
      req.body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      // Process successful payment...
    }

    res.json({ received: true });
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});
```

---

## 2. Clerk Auth Middleware (Next.js App Router)

### User Prompt

> "Add Clerk authentication middleware to protect `/dashboard` in a Next.js App Router project."

### Without `clerk/SKILL.md` (LLM Baseline Output)

```typescript
// middleware.ts
import { authMiddleware } from '@clerk/nextjs'; // ❌ Deprecated in @clerk/nextjs v5+

export default authMiddleware({
  publicRoutes: ['/', '/login', '/register'],
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
```

### With `clerk/SKILL.md` (Corrected Output)

```typescript
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'; // ✅ Modern v5+ pattern

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|webp|png|jpg|jpeg|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
```

---

## 3. Resend Batch Emailing

### User Prompt

> "Send product update emails to 500 users using Resend in Node.js."

### Without `resend/SKILL.md` (LLM Baseline Output)

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// ❌ Fails with HTTP 429 Rate Limit Errors (10 req/sec limit) & high latency
async function notifyUsers(users: { email: string; name: string }[]) {
  for (const user of users) {
    await resend.emails.send({
      from: 'updates@example.com',
      to: user.email,
      subject: 'Product Update',
      html: `<p>Hi ${user.name}, check out our new features!</p>`,
    });
  }
}
```

### With `resend/SKILL.md` (Corrected Output)

```typescript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

// ✅ Single HTTP POST request using batch API, respecting rate limits and latency
async function notifyUsers(users: { email: string; name: string }[]) {
  const payload = users.map((user) => ({
    from: 'updates@example.com',
    to: user.email,
    subject: 'Product Update',
    html: `<p>Hi ${user.name}, check out our new features!</p>`,
  }));

  const { data, error } = await resend.batch.send(payload);
  if (error) {
    console.error('Batch email sending failed:', error);
    return;
  }
  console.log(`Successfully sent ${data?.data.length} emails in batch.`);
}
```
