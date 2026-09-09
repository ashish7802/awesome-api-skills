---
title: playwright
---

# playwright

<p class="skill-meta">Developer Tools · Testing</p>


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
  <div class="trust-doc-link"><a href="https://playwright.dev/docs/intro" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **integrates with** → [github-actions](/skills/github-actions)
- **works well with** → [nextjs](/skills/nextjs)
- **works well with** ← [vitest](/skills/vitest)
- **related to** ← [xquik](/skills/xquik)

---


> End-to-end testing for modern web apps.

## Ecosystem Graph

```mermaid
graph LR
  playwright["Playwright"]
  playwright -- "integrates with" --> github-actions
  playwright -- "works well with" --> nextjs
```

## Quick Start
Playwright is a framework for Web Testing and Automation. It runs headless browsers (Chromium, WebKit, Firefox) to simulate user interactions.

```bash
npm init playwright@latest
```

## Production Patterns
### Auto-Waiting and Locators
Never use `page.waitForTimeout(5000)`. Rely on Playwright's Locators (`page.getByRole('button')`) which automatically wait for the element to be visible, enabled, and stable before clicking.

## Architecture & Scaling
### Parallel Execution
Playwright runs tests in parallel by default using multiple worker processes. Ensure your backend database can handle concurrent test executions, or use isolated database branches (e.g., Neon) for each test shard.

## Error Recovery
If tests flake due to network latency, configure automatic retries in `playwright.config.ts` (`retries: process.env.CI ? 2 : 0`).

## Security Notes
Do not expose real user credentials in your test files. Seed a test database dynamically before the test run, or utilize dedicated test environment variables injected by the CI runner.

## Relationships
**Works Well With**: [github-actions](/skills/github-actions), [nextjs](/skills/nextjs)

## References
- [Playwright Docs](https://playwright.dev/docs/intro)

## Why use this skill
Use this when your agent works with **playwright** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`github-actions`](../github-actions/SKILL.md) — integrates with
- [`nextjs`](../nextjs/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02

