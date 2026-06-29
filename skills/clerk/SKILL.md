# Clerk API Skill

## Quick Start
Clerk provides comprehensive authentication UIs and a powerful backend API. Install the specific SDK for your framework (e.g., `@clerk/nextjs`).

```bash
npm install @clerk/nextjs
```

## Common Workflows
### Webhook Synchronization
Do not continuously query Clerk for user data. Instead, configure Clerk Webhooks (`user.created`, `user.updated`) to push data to your primary database (Neon, Supabase). Rely on your local database for JOINs.

## Production Patterns
### JWT Verification
For microservices (Go, Python) communicating with a Clerk-secured frontend, extract the Bearer token and verify the JWT signature using Clerk's public JWKS endpoint. Do not rely solely on the frontend session state.

## Error Recovery
Handle webhook delivery failures gracefully. Clerk webhooks include built-in Svix retry logic. Your webhook handler must be idempotent (e.g., using `INSERT ... ON CONFLICT DO UPDATE`).

## Security Notes
Always verify the Svix signature on incoming webhooks to ensure the payload actually originated from Clerk. Never trust unverified JWTs in backend routes.

## Performance Considerations
Clerk heavily optimizes the `Auth` object on the Edge. Use `auth()` or `getAuth()` in server components to avoid unnecessary network round trips when extracting the `userId`.

## Testing Guidance
For E2E testing (Playwright/Cypress), utilize Clerk's dedicated Testing Tokens to bypass the UI flow and programmatically authenticate test runners without hitting rate limits or triggering fraud detection.

## Troubleshooting
If `auth()` returns null in a Next.js App Router setup, ensure your `middleware.ts` is configured correctly and the route isn't accidentally excluded from the `clerkMiddleware` matcher.

## References
- [Backend API](https://clerk.com/docs/reference/backend-api)

## Related Skills
- [Neon](/skills/neon)
- [Supabase](/skills/supabase)
- [Resend](/skills/resend)
