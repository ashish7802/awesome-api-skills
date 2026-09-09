---
title: nuxt
---

# nuxt

<p class="skill-meta">Frontend Frameworks</p>


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
      <span class="trust-val">2026-07-02</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">typescript</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://nuxt.com/docs" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **depends on** → [vue](/skills/vue)
- **alternative to** → [nextjs](/skills/nextjs)
- **deploys to** → [vercel](/skills/vercel)

---


> The Intuitive Vue Framework.

## Ecosystem Graph

```mermaid
graph LR
  nuxt["Nuxt"]
  nuxt -- "depends on" --> vue
  nuxt -- "alternative to" --> nextjs
  nuxt -- "deploys to" --> vercel
```

## Quick Start
Nuxt 3 is the enterprise Vue framework, featuring Nitro (an ultra-fast server engine) and automatic component importing.

```bash
npx nuxi@latest init my-app
```

## Production Patterns
### Server API Routes
Nuxt provides a `server/api` directory. Functions exported here are automatically mapped to `/api/*` endpoints. Use these routes to hide database credentials and interact securely with APIs like Stripe or Neon.

## Architecture & Scaling
### Universal Rendering
By default, Nuxt executes code on both the server (for SSR HTML generation) and the client (hydration). Always guard browser-specific APIs (like `window.localStorage`) by wrapping them in `if (import.meta.client)`.

## Error Recovery
Use the `app.vue` `NuxtErrorBoundary` component to isolate crashes. For server-side API errors, return `createError({ statusCode: 400, statusMessage: 'Invalid' })`.

## Security Notes
Ensure sensitive tokens (like a Stripe Secret Key) are placed in the `runtimeConfig` without exposing them in the `public` sub-object.

## Relationships
**Prerequisites**: [vue](/skills/vue)

**Alternatives**: [nextjs](/skills/nextjs)

**Deploys To**: [vercel](/skills/vercel)

## References
- [Nuxt Docs](https://nuxt.com/docs)

## Why use this skill
Use this when your agent works with **nuxt** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`vue`](../vue/SKILL.md) — depends on
- [`nextjs`](../nextjs/SKILL.md) — alternative to
- [`vercel`](../vercel/SKILL.md) — deploys to

---
> **Last Verified:** 2026-07-02

