---
title: express
---

# express

<p class="skill-meta">Backend Frameworks</p>


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
  <div class="trust-doc-link"><a href="https://expressjs.com/" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **alternative to** → [fastapi](/skills/fastapi)
- **alternative to** → [hono](/skills/hono)
- **alternative to** → [nestjs](/skills/nestjs)
- **works well with** → [redis](/skills/redis)
- **integrates with** ← [discord](/skills/discord)
- **monitors** ← [sentry](/skills/sentry)

---


> Fast, unopinionated, minimalist web framework for Node.js.

## Ecosystem Graph

```mermaid
graph LR
  express["Express"]
  express -- "alternative to" --> fastapi
  express -- "alternative to" --> hono
  express -- "alternative to" --> nestjs
  express -- "works well with" --> redis
```

## Quick Start
Express is the most mature Node.js HTTP framework. It utilizes a simple middleware chain architecture.

```bash
npm install express cors
```

## Production Patterns
### Controller Pattern
Do not write massive anonymous functions inside your `app.get()` routes. Extract business logic into dedicated controller files (e.g., `user.controller.js`) and pass them to the Express router.

## Architecture & Scaling
### Middleware Chains
Express executes middleware sequentially. Always ensure your JSON body parser (`express.json()`) is registered *before* the routes that need to read `req.body`. Ensure you call `next()` to pass control.

## Error Recovery
Express 4 does not automatically catch asynchronous errors. You must wrap your async route handlers in a `try/catch` block and pass the error to `next(err)`. (Note: Express 5 changes this behavior). Always register a global error handler at the very bottom of your middleware chain.

## Security Notes
Install and configure `helmet` to automatically set secure HTTP headers. Rate limit endpoints using `express-rate-limit` backed by Redis to prevent brute-force attacks.

## Relationships
**Alternatives**: [fastapi](/skills/fastapi), [hono](/skills/hono), [nestjs](/skills/nestjs)

**Works Well With**: [redis](/skills/redis)

## References
- [Express Docs](https://expressjs.com/)

## Why use this skill
Use this when your agent works with **express** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`fastapi`](../fastapi/SKILL.md) — alternative to
- [`hono`](../hono/SKILL.md) — alternative to
- [`nestjs`](../nestjs/SKILL.md) — alternative to
- [`redis`](../redis/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02

