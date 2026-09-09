---
title: azure-openai
---

# azure-openai

<p class="skill-meta">AI · Enterprise</p>


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
      <span class="trust-val">typescript, python, go</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://learn.microsoft.com/en-us/azure/ai-services/openai/" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **related to** → [openai](/skills/openai)
- **related to** → [anthropic](/skills/anthropic)

---


## Quick Start
Azure OpenAI provides the same models as OpenAI (GPT-4) but within the Azure compliance boundary, utilizing Active Directory and custom domain endpoints.

```bash
npm install openai
```

## Common Workflows
### Enterprise Model Deployment
Unlike the public OpenAI API, Azure requires you to explicitly deploy a model in your resource. You must use your unique Deployment ID rather than the generic model name (e.g., `gpt-4`) in your API calls.

## Production Patterns
### Content Filtering
Azure OpenAI applies aggressive, customizable content filters. You can detect if a response was filtered by inspecting the `finish_reason` which will evaluate to `content_filter` instead of `stop`.

## Error Recovery
Handle `429 Too Many Requests`. Azure OpenAI rate limits are based on Tokens-Per-Minute (TPM) assigned to your deployment. If you exceed this, you must retry. Use the `@azure/core-rest-pipeline` to inject automated retry policies.

## Security Notes
Avoid static API keys. Use Managed Identities (Entra ID / Azure AD) to authenticate your application servers to the Azure OpenAI endpoint securely without rotating secrets.

## Performance Considerations
Latency is heavily dependent on the Azure region. Deploy your models in the same region as your application servers to minimize network RTT (Round Trip Time).

## Testing Guidance
Use the official OpenAI SDK, but configure the `baseURL` and `defaultHeaders` to point to your Azure endpoint (`https://<resource>.openai.azure.com/openai/deployments/<deployment>`).

## Troubleshooting
If you receive a 'Resource not found' error, verify that the `api-version` query parameter is correct and supported by your specific model deployment.

## References
- [Azure OpenAI Docs](https://learn.microsoft.com/en-us/azure/ai-services/openai/)

## Related Skills
- [OpenAI](/skills/openai)
- [Anthropic](/skills/anthropic)

## Why use this skill
Use this when your agent works with **azure-openai** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using deprecated model IDs or wrong API endpoints
- Confusing chat vs completions vs embeddings APIs
- Omitting rate-limit and token budget handling

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`openai`](../openai/SKILL.md) — related to
- [`anthropic`](../anthropic/SKILL.md) — related to

---
> **Last Verified:** 2026-07-02

