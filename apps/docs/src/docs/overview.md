# Overview

Stop AI from guessing APIs. This repository ships **101 verified skills** — markdown packages your coding agent reads to eliminate SDK hallucinations, broken method calls, and missing configuration flags.

## Why API Skills?

LLMs are regularly trained on outdated API documentation. When asking an agent to write code for modern SDKs (like Stripe, Clerk v5+, Next.js App Router, or Supabase), models frequently invent deprecated parameters or hallucinate methods.

Awesome API Skills provides deterministic context files (`SKILL.md`) that provide:
- **Exact SDK Import Patterns & Signatures**
- **Critical AI Pitfalls**: Known traps where models make mistakes (e.g., Stripe raw body webhooks, Clerk v5 middleware, Supabase RLS)
- **Production Verification Checklists**: Concrete steps to test your integration

## Supported Agents

Skills are formatted for instant ingestion across leading AI coding tools:
- **Cursor**: Reference in `.cursorrules` or directly prompt `@skills/<skill-name>/SKILL.md`
- **Claude Code**: Include in project root `CLAUDE.md` or run `/context skills/<skill-name>/SKILL.md`
- **Cline**: Place in `.cline/skills/` or pass via workspace instructions
- **Continue**: Configure under `.continue/config.json` or context providers

## Getting Started

1. **Browse Skills**: Explore the [Skills Directory](/skills/) or [Knowledge Graph](/graph)
2. **Interactive Playground**: Test and validate skills in the [Playground](/playground)
3. **Local CLI**: Search and validate skills directly with `node packages/cli/dist/bin.js`

