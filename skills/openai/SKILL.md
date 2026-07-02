# OpenAI API Skill

## Overview
OpenAI provides advanced machine learning models via REST API. This skill covers Chat Completions, Embeddings, and Vision models, focusing on streaming architectures and context management.

## Installation
```bash
npm install openai
pip install openai
```

## Authentication
Authenticate using a Bearer token (`OPENAI_API_KEY`). For enterprise organizations, supply the `OPENAI_ORG_ID` to properly attribute billing.

## Core Concepts
- **Messages**: An array of `{ role, content }` objects representing conversation history.
- **Temperature**: Controls randomness (0.0 for deterministic, 1.0 for creative).
- **Tokens**: The atomic unit of billing and context limits.

## Common Workflows
1. Construct a system prompt.
2. Append user input to the messages array.
3. Call `chat.completions.create` with `stream: true` for low-latency UX.

## Error Handling
Catch `OpenAIError`. Handle `RateLimitError` (HTTP 429) via exponential backoff. Handle `LengthError` by dynamically summarizing or trimming the context window before retrying.

## Security
Never inject unsanitized user input directly into system prompts to avoid prompt injection attacks. Do not leak API keys in frontend bundles.

## Rate Limits
Limits are tiered based on usage. Tier 1 allows 500 RPM for GPT-3.5 and 500 RPM for GPT-4. Tier 5 allows 10,000 RPM.

## Best Practices
Use `max_tokens` defensively to bound costs. Utilize function calling (`tools`) to ensure the model outputs strictly typed JSON data rather than relying on regex parsing.

## Troubleshooting
If you receive 'Context window exceeded', count tokens using `tiktoken` before sending the request.

## References
- [API Reference](https://platform.openai.com/docs/api-reference)

## Why use this skill
Use this when your agent works with **openai** — structured patterns beat pasted docs and prevent common hallucinations.

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

---
> **Last Verified:** 2026-07-02
