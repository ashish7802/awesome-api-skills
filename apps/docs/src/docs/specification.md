# SKILL.md Specification

Every skill in this repository follows the open `SKILL.md v1.0` specification.

## Directory Layout

Each skill occupies an isolated folder under `skills/<name>/`:

```text
skills/stripe/
├── SKILL.md       # Primary agent context and implementation patterns
└── metadata.json  # Machine-readable schema metadata
```

## Required Metadata Fields

```json
{
  "name": "stripe",
  "version": "1.0.0",
  "description": "Financial infrastructure platform for the internet.",
  "categories": ["Payments", "Commerce"],
  "languages": ["typescript", "python"],
  "license": "MIT",
  "documentationSource": "https://stripe.com/docs/api",
  "supportedAgents": ["cursor", "claude-code", "cline", "continue"],
  "compatibility": "SKILL.md v1.0",
  "lastVerified": "2026-07-03"
}
```

## Markdown Structure

1. **Title & Frontmatter**: Skill name and summary.
2. **Quickstart**: Minimal copy-pasteable configuration and initialization.
3. **Core API Patterns**: Standard operations (CRUD, pagination, async processing).
4. **Critical AI Pitfalls**: High-priority rules warning against known LLM hallucinations.
5. **Verification Checklist**: Concrete commands or checks to verify the integration.

