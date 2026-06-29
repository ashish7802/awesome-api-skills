---
title: anthropic
---

# anthropic

<p class="skill-meta">AI</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://docs.anthropic.com/en/api/getting-started) |

</div>


## Graph

- **related to** ← [azure-openai](/skills/azure-openai)
- **related to** ← [pinecone](/skills/pinecone)

---

# Anthropic API Skill

## Overview
Anthropic's API provides access to the Claude 3 family (Opus, Sonnet, Haiku). This skill focuses on the Messages API, vision capabilities, and strict system prompt isolation.

## Installation
```bash
npm install @anthropic-ai/sdk
pip install anthropic
```

## Authentication
Use the `x-api-key` header with your `ANTHROPIC_API_KEY`. You must also supply the `anthropic-version` header (e.g., `2023-06-01`).

## Core Concepts
- **System Prompt**: Isolated from the main conversation array for higher adherence.
- **Claude 3.5 Sonnet**: The recommended default model for speed and coding intelligence.
- **Max Tokens**: Required parameter defining the generation limit (e.g., 4096 or 8192).

## Common Workflows
1. Define the system prompt.
2. Pass the conversation history alternating precisely between `user` and `assistant`.
3. Process the response blocks.

## Error Handling
Handle `AnthropicError`. The `OverloadedError` indicates capacity constraints; retry with backoff. `AuthenticationError` indicates invalid or revoked keys.

## Security
Anthropic provides inherent safety filters. Ensure system prompts instruct the model to avoid executing unverified external data.

## Rate Limits
Tiered rate limits applied per minute (RPM) and tokens per minute (TPM). Tier 1 for Claude 3 Sonnet is 50 RPM and 40,000 TPM.

## Best Practices
Always put long reference documents inside `<documents>` XML tags. Claude is specifically trained to parse and pay closer attention to XML structures.

## Troubleshooting
If the API returns a 'roles must alternate' error, ensure your `messages` array strictly follows a `user` -> `assistant` -> `user` sequence without duplicate consecutive roles.

## References
- [API Reference](https://docs.anthropic.com/en/api/getting-started)

## Why use this skill
Use this when your agent works with **anthropic** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using deprecated model IDs or wrong API endpoints
- Confusing chat vs completions vs embeddings APIs
- Omitting rate-limit and token budget handling

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

