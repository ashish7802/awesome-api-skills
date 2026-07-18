# UX Audit

**Date:** 2026-06-29  
**Scope:** Repository, CLI, docs site, skill content, developer journey

---

## Navigation

| Area     | Before                         | After                             | Impact                        |
| :------- | :----------------------------- | :-------------------------------- | :---------------------------- |
| Docs nav | 8 items including Playground   | 4 items: Skills, Graph, CLI, Spec | High — reduced cognitive load |
| Sidebar  | Broken provider/language links | All skills + Categories + Popular | High                          |
| README   | Architecture table first       | Value + quick start first         | Critical                      |

---

## Search & discovery

| Feature                | Status      | Notes                            |
| :--------------------- | :---------- | :------------------------------- |
| Docs skill search      | Implemented | Client-side filter on `/skills/` |
| Category filters       | Implemented | Pill buttons by category         |
| CLI search             | Fixed       | Real scan of 100 skills          |
| VitePress local search | Existing    | Works on generated pages         |

---

## Skill reading flow

```
Discover (README / docs home)
  → Browse (/skills/ with filter)
  → Skill page (trust panel + graph relations + SKILL.md)
  → Copy to project (.skills/ or agent path)
```

Friction removed:

- Trust metadata visible before reading skill body
- Graph relationships shown at top of skill page
- Related skills in SKILL.md link to sibling skills

---

## Mobile experience

| Item                  | Status                                      |
| :-------------------- | :------------------------------------------ |
| Responsive skill grid | CSS grid auto-fill                          |
| Search input          | Full width, 480px max                       |
| Filter pills          | flex-wrap                                   |
| Mermaid graph         | Renders on mobile (may scroll horizontally) |

Recommendation (medium): collapse trust panel to accordion on small screens.

---

## CLI UX

| Command    | Improvement                                  |
| :--------- | :------------------------------------------- |
| `help`     | "Start here" block: search, doctor, validate |
| `search`   | Formatted results + next action              |
| `doctor`   | Issues list + next steps                     |
| `validate` | Unchanged (stub)                             |
| Errors     | Removed fake domain; shorter output          |
| Verbose    | Performance logs only with `--verbose`       |

---

## Developer journey map

| Stage      | Steps                        | Friction             | Fix                                |
| :--------- | :--------------------------- | :------------------- | :--------------------------------- |
| Discover   | GitHub README                | Value unclear        | Value-first README                 |
| Install    | clone + pnpm install + build | 3 commands           | Documented as single line          |
| Search     | CLI or docs                  | Mock CLI             | Real search                        |
| Use        | copy skill folder            | Unclear path         | README shows `cp -r skills/stripe` |
| Update     | git pull                     | Standard             | No change needed                   |
| Contribute | CONTRIBUTING.md              | Script paths updated | Already fixed in prior sprint      |

Unnecessary steps removed: no fake npm install; no mock search results.

---

## Accessibility

| Item                    | Status                   |
| :---------------------- | :----------------------- |
| Search input aria-label | Added                    |
| Filter buttons          | `type="button"`          |
| Color contrast          | VitePress theme defaults |

---

## Priority backlog (not implemented)

| Priority | Item                                 |
| :------- | :----------------------------------- |
| High     | Hosted docs at public URL            |
| High     | npm publish for CLI                  |
| Medium   | Interactive graph explorer component |
| Medium   | Skill page table of contents         |
| Low      | Dark/light banner variant for README |
