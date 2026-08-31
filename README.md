  <div align="center">

![Awesome API Skills — Visual Overview](https://raw.githubusercontent.com/ashish7802/awesome-api-skills/master/media/banner.png)

### Structured, verified SKILL.md context files that teach AI coding agents how to work with real APIs

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/skills-101%20verified-orange?style=flat-square" alt="101 verified skills">
  <a href="https://github.com/ashish7802/awesome-api-skills/actions/workflows/quality.yml"><img src="https://github.com/ashish7802/awesome-api-skills/actions/workflows/quality.yml/badge.svg" alt="Quality Gates"></a>
  <a href="https://github.com/ashish7802/awesome-api-skills/actions/workflows/tests.yml"><img src="https://github.com/ashish7802/awesome-api-skills/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
</p>

<p>
  <a href="./docs/index.html"><strong>🔍 Searchable Directory</strong></a> · 
  <a href="./docs/BENCHMARKS_AND_EXAMPLES.md"><strong>⚡ Before vs. After Code</strong></a> · 
  <a href="./docs/CLI_USAGE.md"><strong>💻 CLI Reference</strong></a> · 
  <a href="#quick-start"><strong>🚀 Quick Start</strong></a> · 
  <a href="#skill-directory"><strong>📚 Skill Directory</strong></a> · 
  <a href="#contributing"><strong>🤝 Contributing</strong></a>
</p>

</div>

---

## 💡 What This Is & Why It Matters

When an AI coding agent (Claude Code, Cursor, Codex CLI, Gemini CLI, etc.) writes code for modern APIs, it frequently makes critical mistakes:

- Reaching for **outdated SDK methods** present in old training data.
- **Parsing raw request bodies** with `express.json()` before validating Stripe webhook signatures, breaking cryptographic checks.
- Using **deprecated authentication helpers** (e.g. `@clerk/nextjs` v4 `authMiddleware` instead of v5 `clerkMiddleware`).
- Calling transactional email endpoints inside unbatched loops, hitting **HTTP 429 rate limit errors**.

`awesome-api-skills` fixes this by providing **101 curated, schema-validated `SKILL.md` context files**. Dropping a skill file into your agent's skills directory (`.claude/skills/`, `.cursor/skills/`, `.agents/skills/`) gives the model exact, current API instructions, preventing guesswork before code is written.

---

## ⚡ The Difference A Skill Makes

Here is how an AI agent performs with and without `SKILL.md` context:

| Scenario                        | Without SKILL.md (LLM Guessing)                                                                                               | With SKILL.md (Context Injected)                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Stripe Webhook Verification** | Parses JSON first (`express.json()`), ruining the raw buffer signature check and throwing `StripeSignatureVerificationError`. | Mounts `express.raw({ type: 'application/json' })` on the webhook route so `stripe.webhooks.constructEvent()` verifies signature cryptographically. |
| **Clerk Auth Middleware**       | Generates deprecated `authMiddleware({ publicRoutes })` from v4, causing runtime crashes in Next.js App Router.               | Uses modern `clerkMiddleware()` with `createRouteMatcher()` matching Next.js v5+ App Router specs.                                                  |
| **Resend Batch Emailing**       | Iterates a `for...of` loop with individual `send()` calls, taking minutes and triggering HTTP 429 rate limits.                | Packages emails into `resend.batch.send([])`, dispatching 500 emails in a single low-latency HTTP request.                                          |

> 📖 **See full runnable code diffs in [docs/BENCHMARKS_AND_EXAMPLES.md](./docs/BENCHMARKS_AND_EXAMPLES.md).**

---

## 🚀 Quick Start

### Option 1: Direct Copy into Your Project (No Installation Required)

Simply copy the skill folder for the API you are using into your agent's skill directory:

```bash
# Clone the repository lightweight
git clone --depth 1 https://github.com/ashish7802/awesome-api-skills.git

# Copy Stripe skill to Claude Code
cp -r awesome-api-skills/skills/stripe .claude/skills/

# Copy Clerk skill to Cursor
cp -r awesome-api-skills/skills/clerk .cursor/skills/

# Copy Redis skill to generic agent workspace
cp -r awesome-api-skills/skills/redis .agents/skills/
```

Then instruct your agent:

> _"Use `.claude/skills/stripe/SKILL.md` for payment integration."_

---

### Option 2: Monorepo & Local CLI Setup

For developers building tooling, validating custom skills, or managing workspaces:

```bash
git clone https://github.com/ashish7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
pnpm build
```

Run CLI commands locally:

```bash
# Search skills by keyword
pnpm run cli search stripe

# Validate all skill schemas
pnpm run cli validate

# Inspect workspace health
pnpm run cli doctor
```

---

## 📚 Skill Directory

Explore 101 skills across 14 core technical domains:

| Category                 | Available Skills                                                                                                                         |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Payments & Billing**   | `stripe`, `paddle`, `lemon-squeezy`, `revenuecat`, `plaid`                                                                               |
| **Auth & Identity**      | `auth0`, `clerk`, `okta`, `better-auth`, `jwt`, `oauth2`, `openid-connect`                                                               |
| **Databases**            | `postgresql`, `mysql`, `sqlite`, `mongodb-atlas`, `planetscale`, `neon`, `turso`, `drizzle`, `prisma`                                    |
| **Caching & Queues**     | `redis`, `redis-streams`, `upstash`, `bullmq`, `kafka`, `rabbitmq`, `nats`                                                               |
| **Object Storage**       | `aws-s3`, `aws-dynamodb`, `azure-blob-storage`, `google-cloud-storage`                                                                   |
| **AI & LLM Infra**       | `openai`, `anthropic`, `gemini`, `ollama`, `vllm`, `langchain`, `llamaindex`, `pinecone`, `typesense`, `meilisearch`, `algolia`, `xquik` |
| **Backend Frameworks**   | `express`, `fastapi`, `nestjs`, `hono`, `trpc`                                                                                           |
| **Frontend Frameworks**  | `react`, `vue`, `nextjs`, `nuxt`, `sveltekit`                                                                                            |
| **Deployment Platforms** | `vercel`, `railway`, `render`, `fly`, `digitalocean`, `cloudflare`, `cloudflare-workers`, `deno-deploy`                                  |
| **Infrastructure**       | `docker`, `kubernetes`, `helm`, `terraform`, `pulumi`, `argo-cd`, `github-actions`, `traefik`, `nginx`, `caddy`, `turborepo`             |
| **Observability**        | `datadog`, `sentry`, `prometheus`, `grafana`, `loki`, `jaeger`, `opentelemetry`, `mixpanel`, `posthog`                                   |
| **Dev Tooling**          | `eslint`, `prettier`, `biome`, `vitest`, `playwright`, `git`, `github`, `xquik`                                                          |
| **Communication**        | `slack`, `discord`, `twilio`, `sendgrid`, `resend`                                                                                       |
| **Platforms & CMS**      | `shopify`, `mapbox`, `convex`                                                                                                            |

> 🌐 **Browse the interactive web catalog at [docs/index.html](./docs/index.html).**

---

## 🏗️ Monorepo Architecture

`awesome-api-skills` is built as a TypeScript pnpm workspace:

```
skills/                 101 SKILL.md files + metadata.json contracts
packages/
  cli/                  CLI binary for searching, validating, and managing skills
  core/                 Core orchestration engine and workspace management
  generator/            Pipeline generator enforcing consistent SKILL.md templates
  validator/            Zod & JSON-Schema validation engine for skills
  registry/             Graph relationship index & search resolver
  sdk/                  Programmatic Node.js SDK for accessing skill data
  shared-types/         TypeScript definitions & schemas shared across packages
scripts/
  dev/                  Validation, indexing, and static build scripts
docs/                   Searchable web directory, benchmarks, and CLI reference
```

---

## 🎯 Verification & Quality Standards

Every claim in this repository is verified by automated tests and CI checks:

1. **Schema Validation**: All 101 skills pass strict structural checks via `packages/validator`.
2. **Automated Unit Tests**: 31 assertions run in CI via Vitest covering all core packages.
3. **Last Verified Metadata**: Every skill contains a `lastVerified` timestamp in its `metadata.json` and `SKILL.md` header indicating when SDK signatures were verified against vendor documentation.
4. **Relationship Scoring**: Skill graph connections follow a transparent 5-factor hybrid scoring model (Explicit edges, Category match, Ecosystem match, Deployment match, Jaccard similarity) detailed in [SPECIFICATION.md](./SPECIFICATION.md#15-related-skills-scoring-methodology).

---

## 🤝 Contributing

We welcome contributions! All new skills must adhere to the standard schema:

1. **Scaffold or Write Skill**: Add your skill folder under `skills/<skill-name>/` containing `SKILL.md` and `metadata.json`.
2. **Run Validation**:
   ```bash
   pnpm run validate:skills
   ```
3. **Run Unit Tests**:
   ```bash
   pnpm test
   ```
4. **Submit PR**: Open a Pull Request. GitHub Actions will automatically validate schema compliance using `packages/validator`.

See [CONTRIBUTING.md](./CONTRIBUTING.md) and [.github/PULL_REQUEST_TEMPLATE.md](./.github/PULL_REQUEST_TEMPLATE.md) for details.
---

## 📄 License

[MIT](./LICENSE) © 2026 Awesome API Skills Team.
