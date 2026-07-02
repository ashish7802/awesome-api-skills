---
title: git
---

# git

<p class="skill-meta">Developer Tools</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-07-02 |
| **Languages** | yaml |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://git-scm.com/doc) |

</div>


## Graph

- **works well with** → [github-actions](/skills/github-actions)

---

# Git Skill

> Distributed version control system.

## Ecosystem Graph

```mermaid
graph LR
  git["Git"]
  git -- "works well with" --> github-actions
```

## Quick Start
Git tracks changes in source code during software development.

```bash
git init
git commit -m "Initial commit"
```

## Production Patterns
### Interactive Rebase
Before merging a feature branch into main, use `git rebase -i main` to squash messy "WIP" commits into clean, atomic, descriptive commits that clearly outline the feature's history.

## Architecture & Scaling
### Branching Strategies
Trunk-Based Development (short-lived feature branches merging into `main` quickly) is preferred over long-lived GitFlow branches to prevent massive, unresolvable merge conflicts.

## Error Recovery
If you accidentally commit secrets, using `git rm` is not enough as the secret remains in history. Use `git filter-repo` or BFG Repo-Cleaner to permanently scrub the file from all historical commits, and invalidate the secret immediately.

## Security Notes
Sign your commits using GPG or SSH keys. Platforms like GitHub verify these signatures, assuring team members that the commit wasn't spoofed.

## Relationships
**Works Well With**: [github-actions](/skills/github-actions)

## References
- [Git Docs](https://git-scm.com/doc)

## Why use this skill
Use this when your agent works with **git** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`github-actions`](../github-actions/SKILL.md) — works well with

---
> **Last Verified:** 2026-07-02

