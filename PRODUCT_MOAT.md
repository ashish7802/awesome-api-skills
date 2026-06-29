# Product Moat

**Date:** 2026-06-29  
**Question:** What existing assets create long-term differentiation?

---

## 1. Knowledge Graph

**What exists:** `registry/graph.json` — 100 nodes, 200+ edges with types: `depends_on`, `integrates_with`, `works_well_with`, `alternative_to`, `related_to`.

**Why it matters:** LLMs pick random stacks. The graph encodes maintainer-curated relationships — Prisma before PostgreSQL, Stripe with Express, OpenAI with Pinecone.

**Moat path:**
- Visual stack explorer (started: `/graph` page)
- "Install stack" command: `awesome-api stack nextjs-prisma-postgres`
- Graph-powered agent prompt: "Use skills in dependency order"

**Defensibility:** Relationships compound with each contributed skill; hard to replicate without community.

---

## 2. Validation Pipeline

**What exists:** `packages/validator`, schema in `packages/shared-types`, 28 tests, `validationStatus` on metadata.

**Why it matters:** Rules and pasted docs are unvalidated prose. Skills pass schema checks before merge.

**Moat path:**
- CI badge per skill: "schema-validated"
- Breaking schema migrations with semver
- Vendor doc link freshness checks (manual → automated)

**Defensibility:** Open schema (`SPECIFICATION.md`) becomes industry standard for agent context.

---

## 3. AI Pitfall Library

**What exists:** Every skill now has `## AI pitfalls` — category-specific LLM failure modes.

**Why it matters:** Generic docs don't say "agents invent webhook event names." We do.

**Moat path:**
- Community-submitted pitfalls from production incidents
- Pitfall severity ratings
- Agent benchmark: skill-on vs skill-off hallucination rate

**Defensibility:** Curated pitfall data is experiential, not scrapable from vendor docs.

---

## 4. Cross-Agent Compatibility

**What exists:** Plain markdown + metadata; `supportedAgents` field; no proprietary format.

**Why it matters:** Cursor Rules lock you to Cursor. Anthropic Skills lock you to Claude. We don't.

**Moat path:**
- Export adapters: `.cursor/rules`, `.clinerules`, Continue config
- Agent-specific prompt templates in `prompts/` (already per skill)

**Defensibility:** Neutrality attracts contributors who won't bet on one IDE.

---

## 5. Registry Architecture

**What exists:** Local `./registry`, federated spec, generator plugins, snapshots.

**Why it matters:** Designed for multiple registries (official, community, private) even if only local is live today.

**Moat path:**
- Public registry host when ready
- Private registry docs for enterprises
- Skill signing / provenance

**Defensibility:** Spec-first approach; first mover on open agent skill standard.

---

## 6. Production Checklists

**What exists:** Per-skill checklists in SKILL.md — ship-ready reminders.

**Why it matters:** Tutorials teach hello-world; checklists teach production (webhook verification, idempotency keys).

**Moat path:**
- Checklist → CI rule generators
- Integration with agent "review mode"

---

## Moat summary

| Asset | Maturity | Moat strength |
| :--- | :--- | :--- |
| Knowledge graph | Built | **High** — unique data |
| AI pitfalls | Built | **High** — unique content type |
| Validation | Built | **Medium** — replicable with effort |
| Cross-agent format | Built | **Medium** — easy to copy format |
| Registry spec | Spec only | **High** if adopted |
| Production checklists | Built | **Medium** |

**Strongest compound moat:** Graph + pitfalls + validation together. No competitor offers all three in one open repo.

---

## What is NOT a moat

- Raw skill count alone (commodity)
- Markdown format (trivially copied)
- CLI without npm distribution (low switching cost)
- Banner design (presentation, not retention)

Focus investment on graph data, pitfall curation, and schema adoption.
