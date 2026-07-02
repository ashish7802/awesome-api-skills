# Competitive Analysis

**Date:** 2026-06-29  
**Compared against:** Anthropic Skills, Cursor Rules, Cline, Continue, Roo Code, Windsurf, generic AI context systems

---

## Landscape overview

| Approach | What it is | Strength | Weakness |
| :--- | :--- | :--- | :--- |
| **Paste API docs** | Raw vendor docs in chat | Always current if from source | Unstructured, large, re-pasted every session |
| **Cursor Rules** | Project `.cursorrules` / rules | Deep project integration | Per-project, manual, no API catalog |
| **Anthropic Skills** | Claude-native skill format | First-party agent support | Ecosystem lock-in, limited catalog |
| **Cline / Continue rules** | Editor rule files | IDE-native | No cross-API graph or validation |
| **Roo Code modes** | Custom modes + prompts | Workflow-focused | Not API-reference oriented |
| **Windsurf rules** | Cascade rules | Tight IDE coupling | Same as Cursor rules pattern |
| **Awesome API Skills** | Repo of validated skill packages + graph | Agent-agnostic, relationship-aware | No npm yet; no hosted registry |

---

## Feature matrix

| Capability | Paste docs | Cursor Rules | Anthropic Skills | **Awesome API Skills** |
| :--- | :---: | :---: | :---: | :---: |
| Agent-agnostic | ✓ | Partial | ✗ | ✓ |
| API-specific pitfalls | ✗ | Manual | Varies | ✓ (100 skills) |
| Production checklists | ✗ | Manual | Varies | ✓ |
| Knowledge graph | ✗ | ✗ | ✗ | ✓ |
| Schema validation | ✗ | ✗ | Varies | ✓ |
| Runnable examples | Varies | Manual | Varies | ✓ |
| One-command install | ✗ | ✗ | ✓ | ✗ (source build) |
| Vendor official status | ✓ | N/A | Some | ✗ (community curated) |

---

## Where we are stronger

1. **Cross-agent portability** — Markdown skills work in Cursor, Claude Code, Cline, Continue without vendor SDK
2. **AI pitfalls per API** — Explicit "what LLMs get wrong" section; rules tools leave this to the user
3. **Knowledge graph** — Prerequisites, alternatives, stacks (Next.js → Prisma → Postgres) — unique in this space
4. **Validation pipeline** — Schema + tests; most rule systems are unvalidated prose
5. **Breadth** — 100 APIs vs typical single-project rules file
6. **Honest positioning** — Post trust sprint, no fake npm/registry claims

---

## Where we are weaker

1. **Install friction** — Anthropic Skills and npm tools win on `npx install`
2. **IDE native integration** — Cursor/Windsurf rules apply automatically; our skills require explicit pointer
3. **Live doc sync** — Pasted official docs are always latest; our skills need manual updates
4. **Brand trust** — Anthropic/Stripe official docs beat community repo for enterprise buyers
5. **No MCP server yet** — Continue/Cline increasingly use MCP for tool context

---

## Where we can become unique

| Opportunity | Moat |
| :--- | :--- |
| **Stack-aware agent context** | Graph recommends full stack, not single API |
| **Pitfall-first documentation** | Optimized for LLM failure modes, not human tutorials |
| **Validated skill marketplace** | Registry + schema as open standard (see SPECIFICATION.md) |
| **CLI + docs + skills trinity** | Search → validate → copy in one repo |
| **Community graph contributions** | Relationships as first-class PRs |

---

## Strategic recommendation

Do not compete on "official" or "largest." Compete on:

> **The only open, validated, relationship-aware API context system for AI agents.**

Near-term: npm publish + hosted docs.  
Mid-term: Cursor rule generator from skills (`skills/stripe/` → `.cursor/rules/stripe.mdc`).  
Long-term: MCP server exposing graph + skill lookup.
