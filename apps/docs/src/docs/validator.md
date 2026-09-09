# Validation Engine

The `@awesome-api-skills/validator` package enforces structural, schema, and trust integrity across all skills.

## Validation Rules

1. **`V-001 (MetadataPresenceRule)`**: Ensures `metadata.json` exists and parses as valid JSON.
2. **`V-002 (SkillMarkdownPresenceRule)`**: Verifies that `SKILL.md` is present and non-empty.
3. **`V-003 (LastVerifiedMetadataRule)`**: Confirms `lastVerified` timestamp is present to maintain freshness.
4. **`V-004 (MetadataSchemaValidationRule)`**: Validates metadata fields against the formal JSON schema.

## Programmatic Usage

```typescript
import { ValidatorEngine, RuleSet } from '@awesome-api-skills/validator';

const engine = new ValidatorEngine();
const results = await engine.validateSkill('/path/to/skills/stripe');

console.log(`Passed: ${results.passed}, Diagnostics: ${results.diagnostics.length}`);
```

