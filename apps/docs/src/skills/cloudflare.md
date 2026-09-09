---
title: cloudflare
---

# cloudflare

<p class="skill-meta">Cloud · Security</p>


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
      <span class="trust-val">typescript, python</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://developers.cloudflare.com/api/" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **deploys to** ← [hono](/skills/hono)
- **related to** ← [planetscale](/skills/planetscale)
- **related to** ← [upstash](/skills/upstash)

---


## Overview
The Cloudflare API manages DNS, CDN caching, Workers, and WAF rules. This skill covers the Node.js SDK and REST patterns.

## Installation
```bash
npm install cloudflare
pip install cloudflare
```

## Authentication
Use API Tokens (recommended) instead of the Global API Key. Tokens can be scoped to specific zones and permissions.

## Core Concepts
- **Zone**: Represents a domain name.
- **Workers**: Serverless execution environments at the edge.
- **Cache Purge**: Invalidating stored assets.

## Common Workflows
1. Instantiate client with API token.
2. Fetch Zone ID using domain name.
3. Execute action (e.g., `client.zones.purgeCache`).

## Error Handling
Errors are returned in the `errors` array of the JSON response payload. Watch for code `10000` (Authentication error).

## Security
Scope API Tokens tightly (e.g., 'Zone.DNS.Edit' for a single domain). Never use the Global API key in automated scripts.

## Rate Limits
The API allows 1200 requests per 5 minutes per IP address.

## Best Practices
When purging cache, try to purge by URL, Tag, or Prefix rather than 'Purge Everything' to maintain CDN performance.

## Troubleshooting
If DNS records aren't updating, verify the 'proxied' (orange cloud) status, which alters how Cloudflare serves the record.

## References
- [API Reference](https://developers.cloudflare.com/api/)

## Why use this skill
Use this when your agent works with **cloudflare** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

---
> **Last Verified:** 2026-07-02

