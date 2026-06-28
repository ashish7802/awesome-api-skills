# Awesome API Skills Specification

**Version:** 1.0.0  
**Status:** Stable

---

## 1. Vision

The Awesome API Skills Specification defines the universal contract for distributing, consuming, and validating AI coding skills for APIs. As AI agents increasingly automate software development, a standardized format for teaching these agents how to seamlessly interact with APIs becomes paramount.

This specification exists to ensure that every skill is predictable, verifiable, and completely interoperable across any AI agent, CLI, or IDE environment. By establishing a strict, immutable contract, we enable a global ecosystem where API vendors, open-source maintainers, and individual developers can contribute skills that just work—everywhere, forever.

## 2. Design Principles

The specification is guided by the following normative principles:

- **AI-First:** Skills MUST be optimized for ingestion by Large Language Models (LLMs), prioritizing explicit context, precise prompts, and deterministic examples over conversational prose.
- **Human-Readable:** The primary instructional document (`SKILL.md`) MUST remain comprehensible by human developers for manual review, security auditing, and troubleshooting.
- **Machine-Readable:** All routing, categorization, and versioning data MUST be strictly structured in JSON format (`metadata.json`), allowing instant parsing without runtime markdown analysis.
- **Backward Compatible:** The ecosystem MUST prioritize non-breaking evolutions. Older skills MUST continue to function natively in newer environments.
- **Extensible:** The specification MUST support extension fields and a decoupled plugin architecture to accommodate unpredictable future AI capabilities.
- **Vendor Neutral:** The format MUST NOT assume a specific AI model, IDE, or operating system unless explicitly declared in the metadata.
- **Registry Independent:** Skills MUST be highly portable across official, community, local, and private enterprise registries.
- **Zero Duplication:** Centralized search indexes and documentation websites MUST be generated directly from the canonical skill source.

## 3. Repository Standard

A compliant skill is a self-contained package. It MUST follow a strict directory and file convention.

### Required Files

- `SKILL.md`: The canonical markdown document containing instructions, workflows, and best practices tailored for the AI agent.
- `metadata.json`: The strict JSON configuration file defining the skill's identity and capabilities.

### Optional Files and Directories

- `examples/`: Directory containing minimal, copy-pasteable code examples across supported languages.
- `prompts/`: Directory containing pre-defined, optimized system or user prompts.
- `assets/`: Directory for images, diagrams, or static files required by the documentation.
- `tests/`: Directory containing verification logic or unit tests for the skill's code patterns.
- `SECURITY.md`: Security-specific considerations or threat models for the API.

### Conventions

- **Folder Naming:** The root folder of the skill MUST match the `id` field in the metadata exactly (e.g., `stripe-payments`).
- **Formatting:** All markdown MUST be linted and conform to GitHub Flavored Markdown (GFM).

## 4. Metadata Specification

The `metadata.json` file is the machine-readable identity of the skill.

### Required Fields

- `id` _(string)_: A globally unique, immutable identifier (kebab-case). This MUST NOT change.
- `name` _(string)_: The human-readable name of the skill.
- `description` _(string)_: A concise summary (max 200 characters) of the skill's purpose.
- `version` _(string)_: The Semantic Versioning string of the skill itself.
- `license` _(string)_: The SPDX license identifier (e.g., `MIT`).
- `categories` _(string[])_: Array of high-level categories (e.g., `Payments`, `Databases`).
- `tags` _(string[])_: Array of fine-grained keywords for search indexing.
- `sdkLanguages` _(string[])_: Array of supported programming languages (e.g., `typescript`, `python`).
- `authType` _(string)_: The authentication methodology (e.g., `api_key`, `oauth2`).
- `supportedAgents` _(string[])_: Array of explicitly tested AI agents (e.g., `cursor`, `claude-code`).

### Optional / Vendor Fields

- `owner` _(string)_: The organization or vendor that owns the API.
- `verified` _(boolean)_: Indicates if the skill has passed official ecosystem verification.
- `official` _(boolean)_: Indicates if the skill is maintained directly by the API vendor.
- `maintainer` _(string)_: Contact email or handle of the primary maintainer.
- `repository` _(string)_: URL to the skill's source repository.
- `documentation` _(string)_: URL to the API's official documentation.
- `support` _(string)_: URL to the support channel or issue tracker.
- `popularity` _(number)_: A calculated metric for search ranking (injected by the registry).
- `status` _(string)_: The lifecycle status (e.g., `active`, `deprecated`).

### Extension Fields

Consumers MAY include an `x-` prefixed field (e.g., `x-custom-ide-config`) for proprietary metadata. Validators MUST ignore `x-` fields.

## 5. JSON Schema Rules

Every `metadata.json` MUST define its schema using the `$schema` directive.

- **Validation:** All tools processing skills MUST validate the metadata against the declared JSON Schema before execution.
- **Schema Versions:** The platform will publish versioned schemas (e.g., `v1`, `v2`).
- **Compatibility Guarantees:** Schema updates MUST be additive. Required fields MUST NOT be removed in minor versions.
- **Migration Rules:** If a major schema version introduces breaking changes, the SDK MUST provide automated upgrade scripts (codemods) to migrate older `metadata.json` files.

## 6. Skill Lifecycle

A skill progresses through a defined lifecycle, tracked via the `status` metadata field.

1. **Draft:** Work in progress. Tools SHOULD ignore these skills in production registries.
2. **Experimental:** Functional but unstable. APIs might change.
3. **Stable:** Production-ready. Backwards compatibility is guaranteed.
4. **Verified:** A Stable skill that has passed extensive automated and manual review by the registry administrators.
5. **Official:** A Verified skill maintained by the actual API vendor.
6. **Deprecated:** The skill is no longer recommended for new projects. Tools MUST display a warning before installation.
7. **Archived:** The skill is read-only and no longer receives updates.
8. **Removed:** The skill is pulled from the registry (only permitted for extreme security or legal violations).

## 7. Versioning Policy

### Semantic Versioning

All version strings MUST conform strictly to [Semantic Versioning 2.0.0](https://semver.org/).

### Specification Version

The `SPECIFICATION.md` uses SemVer. Major versions represent fundamental shifts in the contract, minor versions add optional fields or rules, and patch versions fix typos or clarify ambiguities.

### Schema Version

JSON Schemas are versioned independently but tightly coupled to the Specification version.

### Skill Version

A skill's `version` field tracks its own iterations.

- **Major:** Breaking changes in the API requiring different prompt structures or major code rewrites.
- **Minor:** New endpoints or features added to the `SKILL.md`.
- **Patch:** Typo fixes, minor prompt optimizations, or updated examples.

### CLI Compatibility

The CLI MUST always support installing skills conforming to older specification versions.

## 8. Registry Protocol

Skills are distributed via registries. A registry is a resolved endpoint providing a `search-index.json` and download URLs for skill packages.

### Registry Types

- **Official Registry:** The default ecosystem registry, governed by strict quality gates.
- **Community Registry:** Public registries with relaxed requirements.
- **Company Registry:** Official vendor registries hosting their specific ecosystem of skills.
- **Private Enterprise Registry:** Secured, internal registries for proprietary, company-specific skills.
- **Local Registry:** File-system based registries for development and testing.

### Resolution Order

When installing a skill without a fully qualified registry prefix, the CLI MUST resolve in the following order:

1. Local Registry
2. Private Enterprise Registry
3. Official Registry
4. Configured Community/Company Registries

## 9. Plugin Standard

To prevent core bloat, the platform utilizes a strict SDK for extensibility. No internal system should require modifying core application code to support new environments.

- **Installer Plugins:** Dictate how a skill is physically injected into an environment (e.g., a Cursor plugin writes to `.cursor/rules/`, a Claude Code plugin updates `claude.json`).
- **Validator Plugins:** Allow injecting custom rules during CI (e.g., a plugin that ensures all Python examples use `asyncio`).
- **Generator Plugins:** Consume skill data to output artifacts (e.g., VitePress sites, PDF manuals, centralized cheatsheets).
- **Exporter Plugins:** Package skills into proprietary formats for closed-source AI agents.

### Lifecycle Hooks

Plugins MAY hook into the lifecycle events: `preInstall`, `postInstall`, `preValidate`, `postValidate`.

## 10. Security

Security is foundational to the ecosystem. Malicious skills can manipulate AI agents into executing harmful code.

- **Trusted Publishers:** Registries SHOULD implement namespace protection (e.g., only Stripe can publish to `@stripe/*`).
- **Verification:** The `verified` and `official` flags MUST NOT be self-declared; they MUST be injected by the registry during the index build phase.
- **Signatures & Checksums:** Registries MUST provide SHA-256 checksums for all skill packages to prevent tampering in transit.
- **Safe Installation:** Installer plugins MUST NOT execute arbitrary shell scripts during installation without explicit user consent.

## 11. Contribution Standard

Contributions to the official registry MUST meet rigorous quality gates.

- **Requirements:** All skills MUST include a complete `SKILL.md`, valid `metadata.json`, and at least one functional example.
- **Review Process:** Changes MUST be submitted via Pull Request and require at least one human review.
- **Quality Gates:** The automated Validator suite MUST pass (schema validation, broken link detection, Markdown linting).
- **Acceptance Criteria:** The skill MUST demonstrably improve an AI agent's ability to implement the target API, proven by a passing benchmark or test case.

## 12. Deprecation Policy

- **Field Deprecation:** If a metadata field is deprecated, it MUST be marked as such in the JSON Schema. Tools MUST emit a warning but MUST NOT fail validation.
- **Schema Evolution:** Old schemas will be supported for a minimum of 24 months after a new major schema version is released.
- **Breaking Change Policy:** Breaking changes to the core CLI, Core SDK, or Specification MUST be announced 3 months prior to release.

## 13. Glossary

- **Skill:** A standardized package of instructional markdown and metadata designed to teach an AI agent how to use an API.
- **Registry:** A collection of indexed skills available for discovery and download.
- **Installer:** The mechanism that adapts a downloaded skill into a specific IDE or agent format.
- **Agent:** An autonomous or semi-autonomous AI system that generates code.

## 14. Future Roadmap

_Note: This section outlines theoretical capabilities and makes no implementation promises._

- **AI-Generated Validation:** Utilizing LLMs in CI to automatically verify if the examples in `SKILL.md` are syntactically valid and current.
- **Skill Ratings:** Community-driven upvoting and rating systems integrated into the search index.
- **Telemetry & Analytics:** Opt-in, privacy-preserving tracking of which skills result in the most successful code generations.
- **Remote Updates:** Background syncing to ensure installed skills automatically receive patch updates.
