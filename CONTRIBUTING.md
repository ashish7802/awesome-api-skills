# Contributing to Awesome API Skills

Thank you for your interest in contributing to the Awesome API Skills ecosystem.

## Development Setup

```bash
# Clone the repository
git clone https://github.com/awesome-api-skills/awesome-api-skills.git
cd awesome-api-skills

# Install dependencies
pnpm install

# Run tests
pnpm test

# Run linting
pnpm lint
```

## Adding a New Skill

1. Use the generator to scaffold a new skill:

   ```bash
   node scripts/build-skill-v4.js
   ```

2. Manually populate `SKILL.md` with production-quality documentation.

3. Add examples to the `examples/` directory.

4. Define relationships in `metadata.json`.

5. Run validation:
   ```bash
   node scripts/build-registry-v1.js
   ```

## Quality Standards

- Every skill must contain real, actionable content.
- No placeholder text or TODO sections.
- Every code example must be runnable.
- Every relationship must reference an existing skill.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.
