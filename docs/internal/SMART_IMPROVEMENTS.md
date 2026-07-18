# Smart Improvements

**Date:** 2026-06-29  
**Principle:** 20% of changes → 80% of product improvement  
**Status:** High-impact items **implemented** in this sprint

---

## Implemented (High impact)

|  #  | Change                              | Impact                                   | Files                                                   |
| :-: | :---------------------------------- | :--------------------------------------- | :------------------------------------------------------ |
|  1  | Value-first README                  | Critical — 10-second comprehension       | `README.md`                                             |
|  2  | Skill enrichment (100 skills)       | Critical — pitfalls, checklists, related | `scripts/dev/enrich-skills.js`, all `skills/*/SKILL.md` |
|  3  | Trust metadata on skills            | High — validation, schema, doc source    | all `skills/*/metadata.json`                            |
|  4  | Knowledge graph page                | Critical — visible stacks & paths        | `apps/docs/src/graph.md`, generator                     |
|  5  | Skills index search + filter        | High — find skill in seconds             | `apps/docs/scripts/generate.js`                         |
|  6  | Skill detail pages with trust panel | High — credibility at glance             | generated `/skills/{id}.md`                             |
|  7  | Real CLI search                     | High — functional discovery              | `packages/cli/src/commands/search.ts`                   |
|  8  | CLI doctor next steps               | Medium — reduces "now what?"             | `packages/cli/src/commands/doctor.ts`                   |
|  9  | Docs nav simplification             | Medium — less friction                   | `.vitepress/config.mts`                                 |
| 10  | Docs home value prop                | High — "Stop guessing APIs"              | `apps/docs/src/index.md`                                |

---

## Recommended next (High — not implemented)

|  #  | Improvement                        | Effort | Impact                       |
| :-: | :--------------------------------- | :----- | :--------------------------- |
| H1  | Publish CLI to npm                 | Medium | Removes #1 install friction  |
| H2  | Deploy docs to GitHub Pages        | Low    | Public URL for sharing       |
| H3  | `awesome-api stack <name>` command | Medium | Graph → actionable install   |
| H4  | Cursor rules exporter from skills  | Medium | Compete with native rules UX |

---

## Recommended next (Medium)

|  #  | Improvement                           | Effort | Impact                      |
| :-: | :------------------------------------ | :----- | :-------------------------- |
| M1  | Interactive graph (D3/Cytoscape)      | High   | Graph moat visualization    |
| M2  | Skill freshness bot (check doc links) | Medium | Trust layer automation      |
| M3  | Category landing pages with use cases | Low    | Better discovery            |
| M4  | `validate` CLI scans real skills/     | Low    | Credible validation command |
| M5  | Remove mock CLI commands from help    | Low    | Honest CLI surface          |

---

## Recommended next (Low)

|  #  | Improvement                     | Effort | Impact                       |
| :-: | :------------------------------ | :----- | :--------------------------- |
| L1  | Skill page TOC                  | Low    | Reading flow                 |
| L2  | Mobile trust panel accordion    | Low    | Mobile UX                    |
| L3  | Graph PNG export for README     | Low    | GitHub-visible graph preview |
| L4  | Changelog per skill in metadata | Medium | Update journey               |

---

## Impact matrix

```
         HIGH IMPACT
              │
    H1 npm    │  ✓ README value
    H2 pages  │  ✓ Skill enrichment
    H3 stack  │  ✓ Graph page
              │  ✓ Search/filter
              │
 LOW EFFORT ──┼── HIGH EFFORT
              │
    M3 cats   │  M1 interactive graph
    L1 TOC    │  H4 rules exporter
              │
         LOW IMPACT
```

---

## What we deliberately did NOT do

- New runtime features (install command still mock)
- npm publish (honesty preserved)
- Rewrite all 100 skills manually (scripted enrichment instead)
- MCP server (future moat, out of scope)
- Vendor partnership claims

---

## Success metrics to track post-launch

| Metric                        | Target                  |
| :---------------------------- | :---------------------- |
| README → clone conversion     | Baseline + measure      |
| `pnpm dev` → skill page views | Skills index engagement |
| CLI `search` usage            | If npm published        |
| PRs adding skills             | Community growth        |
| Graph page time-on-page       | Moat validation         |
