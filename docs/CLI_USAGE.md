# Awesome API Skills CLI Reference

This document is generated directly from the `@awesome-api-skills/cli` binary to ensure zero documentation drift.

---

## Command Overview

```
[1mAwesome API Skills CLI[22m
[2mFind and validate API skills for your agent[22m

[1mUsage:[22m
  awesome-api <command> [options]

[1mStart here:[22m
  [36msearch[39m [2m<term>[22m   Find a skill (stripe, postgres, auth…)
  [36mdoctor[39m              Check workspace & next steps
  [36mvalidate[39m            Validate skill schemas

[1mAll commands:[22m
  [36mhelp           [39m
  [36mdoctor         [39m
  [36msearch         [39m
  [36mvalidate       [39m
  [36mcompletion     [39m
  [36minit           [39m
  [36minstall        [39m
  [36muninstall      [39m
  [36mlist           [39m
  [36mregistry       [39m
  [36mgenerate       [39m
  [36mbuild          [39m
  [36msync           [39m
  [36mbenchmark      [39m
  [36mcreate-skill   [39m
  [36mupdate         [39m
  [36mcache          [39m
  [36mconfig         [39m
  [36mversion        [39m

[1mGlobal Options:[22m
  --json     Output in JSON format
  --verbose  Show verbose output
  --quiet    Suppress non-error output
  --help     Show help
```

---

## Core Commands

### 1. `awesome-api search <term>`

Search for skills by API name, category, or keyword.

**Example:**
```bash
awesome-api search stripe --json
```

**Actual Output:**
```json
{
  "success": true,
  "summary": "search completed",
  "data": {
    "query": "stripe",
    "count": 1,
    "results": [
      {
        "id": "stripe",
        "name": "stripe",
        "categories": [
          "Payments",
          "Commerce"
        ],
        "path": "skills/stripe/SKILL.md",
        "score": 1
      }
    ],
    "next": "Open skills/stripe/SKILL.md or run: pnpm dev → /skills/stripe"
  }
}
```

---

### 2. `awesome-api doctor`

Inspect workspace health, local skill folders, and registry state.

**Example:**
```bash
awesome-api doctor --json
```

**Actual Output:**
```json
{
  "success": true,
  "summary": "doctor completed",
  "data": {
    "status": "healthy",
    "nodeVersion": "v24.11.1",
    "platform": "win32",
    "skillsFound": 100,
    "registriesConfigured": 1,
    "issues": [],
    "nextSteps": [
      "awesome-api search <topic>  — find a skill",
      "pnpm dev                    — browse skills in docs",
      "cp -r skills/stripe .skills/stripe — use in your project"
    ]
  }
}
```

---

### 3. `awesome-api validate`

Validate skill schemas against `@awesome-api-skills/validator` rules.

**Example:**
```bash
awesome-api validate --json
```

**Actual Output:**
```json
{
  "success": true,
  "summary": "validate completed",
  "data": {
    "valid": true,
    "diagnostics": []
  }
}
```
