# Contributing to Awesome API Skills

Thank you for your interest in contributing.

## Development setup

```bash
git clone https://github.com/ashish7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
pnpm test
pnpm lint
```

## Adding a new skill

1. Scaffold with the generator:

   ```bash
   node scripts/generators/build-skill-v4.js
   ```

2. Write production-quality content in `SKILL.md`.

3. Add runnable examples under `examples/`.

4. Define relationships in `metadata.json`.

5. Rebuild registry artifacts:

   ```bash
   node scripts/dev/build-registry-v1.js
   node scripts/dev/build-knowledge-graph.js
   ```

6. Validate:

   ```bash
   node scripts/dev/run-validation-v2.js
   ```

## Quality standards

- Every skill must contain real, actionable content.
- No placeholder text or TODO sections.
- Code examples should be runnable or clearly scoped as snippets.
- Relationship targets must reference existing skill IDs.

## Code of Conduct

This project follows the [Contributor Covenant](https://www.contributor-covenant.org/) Code of Conduct.
