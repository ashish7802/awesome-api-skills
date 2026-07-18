# First Impression Report

**Date:** 2026-06-29  
**Perspective:** Developer discovering the repo on GitHub for the first time  
**Goal:** Understand in under 10 seconds; feel "I need this"

---

## Executive summary

Before this sprint, the repo answered _what it is_ (architecture, folder layout) but not _why it matters_. A developer had to infer value from structure. After improvements, the README leads with the problem (AI hallucinates APIs) and the outcome (structured skills with pitfalls and graph).

---

## Severity-ranked problems (pre-fix)

### Critical

|  #  | Moment              | Developer question | Issue                                                    |
| :-: | :------------------ | :----------------- | :------------------------------------------------------- |
| C1  | README first screen | What is this?      | Led with "100 skills" and folder layout, not the problem |
| C2  | README              | Why do I need it?  | No comparison to pasting docs; no "before/after"         |
| C3  | Skills (`SKILL.md`) | Why this skill?    | Missing explicit "AI pitfalls" and production checklist  |
| C4  | Knowledge graph     | Why is it better?  | `graph.json` only — invisible to visitors                |

### High

|  #  | Moment       | Developer question    | Issue                                                              |
| :-: | :----------- | :-------------------- | :----------------------------------------------------------------- |
| H1  | Docs home    | What do I do first?   | Fake stats removed but no clear CTA funnel                         |
| H2  | Skills index | How do I find Stripe? | Only 24 cards; no search/filter                                    |
| H3  | CLI `search` | Does this work?       | Returned mock data                                                 |
| H4  | Trust        | Why trust this skill? | No validation status, schema version, or doc source on skill pages |

### Medium

|  #  | Moment       | Developer question  | Issue                                        |
| :-: | :----------- | :------------------ | :------------------------------------------- |
| M1  | CLI `doctor` | Am I set up?        | Generic "Healthy" with no next steps         |
| M2  | Nav          | Where is the graph? | Graph not in navigation                      |
| M3  | Sidebar      | Broken links        | `providers`, `languages` pages did not exist |
| M4  | CLI help     | Where do I start?   | Flat command list, no "start here"           |

### Low

|  #  | Moment     | Developer question | Issue                             |
| :-: | :--------- | :----------------- | :-------------------------------- |
| L1  | CLI errors | Where is docs?     | Fake `awesome.api` URL            |
| L2  | README     | Where is banner?   | Banner at top was marketing-heavy |

---

## Post-fix status

| ID    | Resolution                                                                             |
| :---- | :------------------------------------------------------------------------------------- |
| C1–C2 | README rewritten value-first with problem/outcome table                                |
| C3    | All 100 skills enriched: Why use / AI pitfalls / Production checklist / Related skills |
| C4    | `/graph` page with stacks, Mermaid diagrams, learning paths                            |
| H1    | Docs home hero: "Stop guessing APIs" + dual CTAs                                       |
| H2    | Full skills index with search + category filters (100 skills)                          |
| H3    | CLI search scans real `skills/` metadata                                               |
| H4    | Trust panel on every generated skill page                                              |
| M1–M4 | CLI doctor next steps; nav simplified; sidebar fixed                                   |
| L1    | Error docs point to repo path                                                          |

---

## 10-second test (target)

A developer landing on GitHub should read:

> **Stop your AI from guessing APIs.**  
> 100 structured skill packages with AI pitfalls and a knowledge graph.

And know the next action: `pnpm dev` or copy `skills/stripe/`.

---

## Remaining gaps (future)

- npm publish for one-command install
- Hosted docs URL (not just localhost)
- Interactive graph (click-to-explore) vs static Mermaid
- Per-skill "last verified against vendor docs" date (manual curation)
