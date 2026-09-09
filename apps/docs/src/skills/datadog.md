---
title: datadog
---

# datadog

<p class="skill-meta">Monitoring · DevOps</p>


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
  <div class="trust-doc-link"><a href="https://docs.datadoghq.com/api/" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **alternative to** ← [grafana](/skills/grafana)

---


## Overview
The Datadog API allows you to submit metrics, events, and manage dashboards programmatically. This skill focuses on the `@datadog/datadog-api-client` library.

## Installation
```bash
npm install @datadog/datadog-api-client
pip install datadog-api-client
```

## Authentication
Requires two headers: `DD-API-KEY` (for submitting data) and `DD-APPLICATION-KEY` (for reading data or managing configuration).

## Core Concepts
- **Metric**: Time-series data points.
- **Tags**: Key:Value pairs attached to metrics (crucial for filtering).
- **Monitor**: An alert configured to trigger on thresholds.

## Common Workflows
1. Instantiate the API client.
2. Construct a `Series` object with points and tags.
3. Call `metricsApi.submitMetrics`.

## Error Handling
Catch HTTP 403 (Invalid Keys) and HTTP 429. If submitting metrics fails, log the `response.body.errors` array.

## Security
API keys have agent-level permissions. Application keys should be scoped strictly (e.g., `dashboards_read`).

## Rate Limits
Submit Metrics endpoint allows 100 requests per 10 seconds. Use batching heavily.

## Best Practices
Batch metrics before sending. Never submit a single data point per API call in high-throughput environments.

## Troubleshooting
If metrics don't appear, ensure the UNIX timestamp attached to your points is in seconds, not milliseconds.

## References
- [API Reference](https://docs.datadoghq.com/api/)

## Why use this skill
Use this when your agent works with **datadog** — structured patterns beat pasted docs and prevent common hallucinations.

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

