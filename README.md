<div align="center">

<img src=".design/banner.svg" alt="Awesome API Skills" width="100%">

### Structured skill files that teach AI coding agents how to work with real APIs

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/skills-100-orange?style=flat-square" alt="100 skills">
  <img src="https://img.shields.io/badge/status-active%20development-yellow?style=flat-square" alt="Active development">
</p>

<p><a href="#what-this-is">What this is</a> · <a href="#quick-start">Quick start</a> · <a href="#skill-directory">Skill directory</a> · <a href="#repo-structure">Repo structure</a> · <a href="#roadmap">Roadmap</a> · <a href="#contributing">Contributing</a></p>

</div>

---

## What this is

This repo is a collection of 100 `SKILL.md` files — one per API, database, framework, or dev tool. Each file gives an AI coding agent (Claude Code, Cursor, Codex CLI, Gemini CLI, etc.) the specific, current information it usually gets wrong: correct SDK method names, current webhook event names, auth patterns, common mistakes, and which other tools it's typically paired with.

The problem this solves is simple. Ask an agent to "add Stripe payments" and it will often reach for outdated method names or skip webhook signature verification, because that's what shows up most in its training data. Dropping a skill file into the agent's context directory gives it a shortcut to the current, correct pattern instead of guessing from old blog posts.

Every skill follows the same structure, so once you're used to reading one, you can read all of them:

- A short description of what the tool is and when to use it
- A relationship map showing which tools it's commonly paired with, and why
- Setup and authentication basics
- Common mistakes agents make with this specific tool
- A quick-reference block of the patterns that matter most

This is not a tutorial for humans and not a replacement for official docs — it's meant to sit inside a repo's `.claude/skills/` or `.cursor/skills/` folder and get read automatically by the agent when it's relevant.

## Quick start

The repo works today by copying skill folders directly into your project. There's no package to install yet — see [Roadmap](#roadmap) for what that would add.

```bash
# Clone the repo (or just the parts you need)
git clone --depth 1 https://github.com/ashish7802/awesome-api-skills.git

# Copy the skill you need into your agent's skills folder
cp -r awesome-api-skills/skills/stripe .claude/skills/
# or, for Cursor
cp -r awesome-api-skills/skills/stripe .cursor/skills/
```

Then just tell the agent to use it, e.g. "follow `.claude/skills/stripe/SKILL.md` when working with payments." Most agents that support skill/rule files will pick it up automatically once it's in the right folder.

If you want to browse everything locally instead of copying one at a time:

```bash
git clone https://github.com/ashish7802/awesome-api-skills.git
cd awesome-api-skills
pnpm install
```

This also gives you the monorepo packages (`core`, `cli`, `sdk`, `validator`, `generator`, `registry`) if you want to build or extend the tooling used to generate and validate skills.

## Skill directory

100 skills across the following areas:

| Category | Skills |
|---|---|
| Payments & billing | stripe, paddle, lemon-squeezy, revenuecat, plaid |
| Auth & identity | auth0, clerk, okta, better-auth, jwt, oauth2, openid-connect |
| Databases | postgresql, mysql, sqlite, mongodb-atlas, planetscale, neon, turso |
| Caching & queues | redis, redis-streams, upstash, bullmq, kafka, rabbitmq, nats |
| Object storage | aws-s3, aws-dynamodb, azure-blob-storage, google-cloud-storage |
| AI & LLM infra | openai, anthropic, gemini, ollama, vllm, langchain, llamaindex, pinecone, typesense, meilisearch, algolia |
| Backend frameworks | express, fastapi, nestjs, hono, trpc |
| Frontend frameworks | react, vue, nextjs, nuxt, sveltekit |
| Deployment platforms | vercel, railway, render, fly, digitalocean, cloudflare, cloudflare-workers, deno-deploy |
| Infrastructure | docker, kubernetes, helm, terraform, pulumi, argo-cd, github-actions, traefik, nginx, caddy, turborepo |
| Observability | datadog, sentry, prometheus, grafana, loki, jaeger, opentelemetry, mixpanel, posthog |
| Dev tooling | eslint, prettier, biome, vitest, playwright, git, github |
| Communication | slack, discord, twilio, sendgrid, resend |
| Other | shopify, mapbox, convex |

Full, browsable list: [`/skills`](./skills)

## Repo structure

```
skills/              100 SKILL.md files, one folder per tool
packages/
  cli/                Command-line tool for browsing/validating skills (not yet published)
  core/                Shared logic used by cli and generator
  generator/           Builds SKILL.md files from a consistent template
  validator/            Checks skill files against the schema in shared-types
  registry/             Metadata for the relationship graph between skills
  sdk/                   Programmatic access to skill data
  shared-types/          Zod/JSON-schema types shared across packages
scripts/
  generators/            Build scripts used to generate skill content in batches
  dev/                    Local dev scripts (benchmarking, etc.)
docs/                 Additional documentation
```

The skill files are built through a shared generator (`scripts/generators`, `packages/generator`) so that all 100 files stay structurally consistent — same sections, same relationship-graph format — rather than each one being hand-formatted separately. The actual technical content (auth flows, common mistakes, SDK patterns) is written per tool, not copy-pasted.

## Roadmap

Things that are planned but not done yet — listed here instead of implied as already working:

- **Publish the CLI to npm.** The `packages/cli` code exists and works locally, but `@awesome-api-skills/cli` is not yet published to the npm registry. Right now, "install" means cloning the repo and copying skill folders — there's no `npx` install path yet.
- **Automated validation in CI.** `packages/validator` exists; wiring it into GitHub Actions so every skill file is schema-checked on PR is still pending.
- **Coverage expansion.** More payment providers, more cloud-native tooling, more AI/agent frameworks.
- **Versioning per skill.** Right now skills don't track which SDK/API version they were written against explicitly in the metadata — that's worth adding so stale skills can be flagged.

If any of this is important to you, open an issue — it'll help prioritize.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Short version: skills follow the template in `packages/generator`, so the easiest way to add one is to look at an existing skill in the same category and match its structure, then open a PR.

## License

MIT — see [LICENSE](./LICENSE).
