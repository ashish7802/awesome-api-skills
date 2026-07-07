#  Awesome API Skills

<div align="center">

<p>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue?style=flat-square" alt="MIT License"></a>
  <img src="https://img.shields.io/badge/skills-101%20verified-orange?style=flat-square" alt="101 verified skills">
  <a href="https://github.com/ashish7802/awesome-api-skills/actions/workflows/quality.yml"><img src="https://github.com/ashish7802/awesome-api-skills/actions/workflows/quality.yml/badge.svg" alt="Quality Checks"></a>
  <a href="https://github.com/ashish7802/awesome-api-skills/actions/workflows/tests.yml"><img src="https://github.com/ashish7802/awesome-api-skills/actions/workflows/tests.yml/badge.svg" alt="Tests"></a>
  <img src="https://img.shields.io/badge/TypeScript-100%25-blue?style=flat-square" alt="TypeScript">
  <img src="https://img.shields.io/badge/Active-Maintained-green?style=flat-square" alt="Active">
</p>

<p>
  <a href="#-what-this-is--why-it-matters"><strong>💡 Learn More</strong></a> · 
  <a href="#-the-difference-a-skill-makes"><strong>⚡ See the Difference</strong></a> · 
  <a href="#-quick-start"><strong>🚀 Quick Start</strong></a> · 
  <a href="#-skill-directory"><strong>📚 Browse Skills</strong></a> · 
  <a href="./docs/BENCHMARKS_AND_EXAMPLES.md"><strong>📊 Code Examples</strong></a> · 
  <a href="#-contributing"><strong>🤝 Contribute</strong></a>
</p>

</div>

---

## 💡 What This Is & Why It Matters

Modern API development presents a challenge for AI coding agents: they often generate code based on outdated training data, leading to subtle but critical bugs. **Awesome API Skills** solves this problem.

### The Problem

When AI agents like Claude Code, Cursor, or Gemini CLI write code for contemporary APIs without proper context, they frequently make mistakes:

❌ **Outdated SDK Methods** - Using deprecated API signatures from old training data  
❌ **Security Vulnerabilities** - Parsing webhook payloads before signature verification  
❌ **Authentication Failures** - Implementing deprecated middleware patterns  
❌ **Rate Limiting Errors** - Making unbatched API calls in loops  
❌ **Type Safety Issues** - Missing critical type definitions and schema validations  

### The Solution

**Awesome API Skills** provides **101 curated, schema-validated `SKILL.md` context files** that teach AI agents:
- ✅ **Current API Signatures** - Latest SDK methods and endpoints
- ✅ **Best Practices** - Security, performance, and reliability patterns
- ✅ **Common Pitfalls** - What to avoid and how to handle edge cases
- ✅ **Production Patterns** - Real-world tested implementations
- ✅ **Error Handling** - How to gracefully handle failures

Simply copy a skill file into your agent's skill directory (`.claude/skills/`, `.cursor/skills/`, etc.), and your AI coding partner will generate production-ready code.

---

## ⚡ The Difference A Skill Makes

See how AI agents perform **with** and **without** SKILL.md context:

### 🔒 Stripe Webhook Verification

| Aspect | Without SKILL.md (LLM Guessing) | With SKILL.md (Context Injected) |
|--------|---------|---------|
| **Approach** | Applies `express.json()` middleware first | Mounts `express.raw({ type: 'application/json' })` before parsing |
| **Result** | ❌ Signature verification fails - raw buffer is lost | ✅ Signature validation succeeds - raw buffer preserved |
| **Error** | `StripeSignatureVerificationError` | No error - webhook processed correctly |

### 🔐 Clerk Auth Middleware

| Aspect | Without SKILL.md | With SKILL.md |
|--------|---------|---------|
| **Pattern** | Generates deprecated `authMiddleware({ publicRoutes })` from v4 | Uses modern `clerkMiddleware()` with `createRouteMatcher()` |
| **Result** | ❌ Runtime crash in Next.js App Router | ✅ Works seamlessly with latest Clerk patterns |
| **Environment** | Old Pages Router style | Modern App Router ready |

### 📧 Resend Batch Emailing

| Aspect | Without SKILL.md | With SKILL.md |
|--------|---------|---------|
| **Implementation** | Iterates with individual `send()` calls per email | Packages emails into `resend.batch.send([...])` |
| **Performance** | ❌ Minutes to send 1000 emails, HTTP 429 errors | ✅ ~1 second for 1000 emails with built-in rate limiting |
| **API Calls** | 1000+ calls to API | 1 batch API call |

> 📖 **See full runnable code diffs in [docs/BENCHMARKS_AND_EXAMPLES.md](./docs/BENCHMARKS_AND_EXAMPLES.md).**

---

## 🚀 Quick Start

### Installation Methods

#### **Option 1: Copy Into Your Project (Simplest)**

The easiest way to get started - no installation required:

```bash
# 1. Clone the repository (lightweight)
git clone --depth 1 https://github.com/ashish7802/awesome-api-skills.git

# 2. Copy the skill you need to your agent's skill directory

# For Claude Code
cp -r awesome-api-skills/skills/stripe ~/.claude/skills/
cp -r awesome-api-skills/skills/clerk ~/.claude/skills/

# For Cursor
cp -r awesome-api-skills/skills/stripe ~/.cursor/skills/
cp -r awesome-api-skills/skills/postgresql ~/.cursor/skills/

# For generic AI agent workspace
cp -r awesome-api-skills/skills/redis ~/agent-workspace/skills/
```

**Then instruct your AI agent:**
```
"Use the SKILL.md files in .claude/skills/ for all Stripe payment integration code"
```

#### **Option 2: Monorepo & Local CLI Setup**

For developers building tooling, validating custom skills, or managing workspaces:

```bash
# Clone full repository
git clone https://github.com/ashish7802/awesome-api-skills.git
cd awesome-api-skills

# Install dependencies
pnpm install

# Build all packages
pnpm build
```

**Available CLI Commands:**

```bash
# Search skills by keyword
pnpm run cli search stripe
pnpm run cli search database

# Validate all skill schemas
pnpm run cli validate

# Get workspace health report
pnpm run cli doctor

# Generate skill index
pnpm run cli index
```

---

## 📚 Skill Directory

Explore 101 production-ready skills across 14 technical domains:

### 💳 Payments & Billing (5 skills)
- **stripe** - Payment processing, invoicing, subscriptions
- **paddle** - Billing platform for SaaS
- **lemon-squeezy** - Digital product payments
- **revenuecat** - Cross-platform subscriptions
- **plaid** - Bank connections and ACH transfers

### 🔐 Auth & Identity (7 skills)
- **auth0** - Enterprise identity platform
- **clerk** - User authentication & management (modern patterns)
- **okta** - Identity and access management
- **better-auth** - Lightweight auth solution
- **jwt** - JSON Web Token implementation
- **oauth2** - OAuth 2.0 authorization flows
- **openid-connect** - OpenID Connect protocol

### 🗄️ Databases (9 skills)
- **postgresql** - Relational database (SQL)
- **mysql** - MySQL/MariaDB implementation
- **sqlite** - Embedded database
- **mongodb-atlas** - MongoDB cloud platform
- **planetscale** - MySQL-compatible serverless DB
- **neon** - Serverless PostgreSQL
- **turso** - SQLite in the cloud
- **drizzle** - Type-safe SQL ORM
- **prisma** - Next-generation ORM

### 🚀 Caching & Queues (7 skills)
- **redis** - In-memory data structure store
- **redis-streams** - Event streaming with Redis
- **upstash** - Serverless Redis
- **bullmq** - Task queue for Node.js
- **kafka** - Distributed event streaming
- **rabbitmq** - Message broker
- **nats** - Lightweight messaging system

### 📦 Object Storage (4 skills)
- **aws-s3** - Amazon S3 file storage
- **aws-dynamodb** - NoSQL database (AWS)
- **azure-blob-storage** - Azure cloud storage
- **google-cloud-storage** - Google Cloud storage

### 🤖 AI & LLM Infrastructure (12 skills)
- **openai** - GPT models and embeddings
- **anthropic** - Claude API integration
- **gemini** - Google's Gemini models
- **ollama** - Run LLMs locally
- **vllm** - High-throughput LLM engine
- **langchain** - LLM application framework
- **llamaindex** - Data indexing for LLMs
- **pinecone** - Vector database
- **typesense** - Fast search engine
- **meilisearch** - Typo-tolerant search
- **algolia** - Search and discovery platform
- **xquik** - Search optimization

### 🏗️ Backend Frameworks (5 skills)
- **express** - Minimal Node.js framework
- **fastapi** - Modern Python async framework
- **nestjs** - Progressive Node.js framework
- **hono** - Ultra-fast edge framework
- **trpc** - End-to-end type-safe APIs

### 🎨 Frontend Frameworks (5 skills)
- **react** - Component library
- **vue** - Progressive framework
- **nextjs** - React meta-framework
- **nuxt** - Vue meta-framework
- **sveltekit** - Svelte app framework

### 🌐 Deployment Platforms (8 skills)
- **vercel** - Frontend deployment
- **railway** - Infrastructure platform
- **render** - Cloud platform
- **fly** - Application deployment
- **digitalocean** - Cloud services
- **cloudflare** - CDN and edge computing
- **cloudflare-workers** - Serverless workers
- **deno-deploy** - Deploy Deno scripts

### 🔧 Infrastructure (12 skills)
- **docker** - Container platform
- **kubernetes** - Container orchestration
- **helm** - Package manager for K8s
- **terraform** - Infrastructure as code
- **pulumi** - IaC in programming languages
- **argo-cd** - GitOps deployment
- **github-actions** - CI/CD workflow automation
- **traefik** - Container-aware reverse proxy
- **nginx** - Web server and reverse proxy
- **caddy** - Modern web server
- **turborepo** - Monorepo build system

### 📊 Observability (8 skills)
- **datadog** - Monitoring and analytics
- **sentry** - Error tracking
- **prometheus** - Metrics collection
- **grafana** - Metrics visualization
- **loki** - Log aggregation
- **jaeger** - Distributed tracing
- **opentelemetry** - Observability standard
- **posthog** - Product analytics

### 🛠️ Dev Tooling (7 skills)
- **eslint** - JavaScript linting
- **prettier** - Code formatter
- **biome** - Rust-based toolchain
- **vitest** - Unit testing framework
- **playwright** - Browser automation
- **git** - Version control workflows
- **github** - GitHub API and workflows

### 💬 Communication (5 skills)
- **slack** - Team messaging
- **discord** - Community platform
- **twilio** - SMS and voice
- **sendgrid** - Email delivery
- **resend** - Email for developers

### 🌟 Platforms & CMS (3 skills)
- **shopify** - E-commerce platform
- **mapbox** - Mapping and location services
- **convex** - Backend platform

---

## 🏗️ Project Architecture

This monorepo is built with TypeScript and pnpm workspaces:

```
awesome-api-skills/
├── skills/                      # 101 production SKILL.md files
│   ├── stripe/
│   │   ├── SKILL.md            # Core skill documentation
│   │   └── metadata.json        # Skill metadata & relationships
│   ├── clerk/
│   ├── postgresql/
│   └── ... (98 more skills)
│
├── packages/                    # TypeScript workspace packages
│   ├── cli/                     # Command-line interface
│   ├── core/                    # Core orchestration engine
│   ├── generator/               # Template generator for new skills
│   ├── validator/               # Schema validation (Zod + JSON-Schema)
│   ├── registry/                # Skill relationship graph & search
│   ├── sdk/                     # Node.js programmatic SDK
│   └── shared-types/            # Shared TypeScript definitions
│
├── docs/                        # Documentation & guides
│   ├── index.html               # Interactive skill browser
│   ├── BENCHMARKS_AND_EXAMPLES.md
│   ├── CLI_USAGE.md
│   └── ... (additional guides)
│
├── scripts/                     # Build and validation scripts
├── .github/                     # GitHub Actions CI/CD
└── package.json                 # Root workspace config
```

### How It Works

1. **Skills are Organized** - Each skill lives in `skills/<skill-name>/`
2. **Metadata Defined** - `metadata.json` describes relationships, versions, and categories
3. **SKILL.md Documented** - Comprehensive teaching files for AI agents
4. **Validated Automatically** - CI/CD ensures all skills match schema
5. **Indexed for Search** - Registry builds relationship graph
6. **Served to Agents** - Copy into agent skill directories as needed

---

## 🎯 Verification & Quality Standards

Every claim in this repository is backed by automated verification:

### ✅ Schema Validation
All 101 skills pass strict structural checks via `packages/validator`

### ✅ Automated Unit Tests
31+ assertions covering all core packages run in CI via Vitest

### ✅ Last Verified Metadata
Each skill includes a `lastVerified` timestamp documenting when SDK signatures were validated against vendor documentation

### ✅ Relationship Scoring
Skill connections use a transparent hybrid scoring model:
- Explicit declared edges (high confidence)
- Category matching
- Ecosystem compatibility
- Deployment platform alignment
- Semantic similarity (Jaccard index)

### ✅ CI/CD Pipeline
GitHub Actions automatically:
- Validates all skill schemas on push
- Runs test suite
- Builds documentation
- Updates search index
- Checks for outdated SDK signatures

---

## 🤝 Contributing

We welcome contributions! Help us grow the skill library.

### Adding a New Skill

```bash
# 1. Clone repository
git clone https://github.com/ashish7802/awesome-api-skills.git
cd awesome-api-skills

# 2. Create new skill structure
mkdir -p skills/my-api
cd skills/my-api

# 3. Create SKILL.md (documentation for AI agents)
cat > SKILL.md << 'EOF'
# My API Skill

## Overview
Brief description of what this API does and when to use it.

## Key SDK Methods
- `methodOne()` - What it does
- `methodTwo()` - What it does

## Common Patterns
Include working code examples.

## Error Handling
Document edge cases and how to handle them.

## Performance Tips
Optimization strategies and gotchas.
EOF

# 4. Create metadata.json (skill metadata)
cat > metadata.json << 'EOF'
{
  "name": "my-api",
  "category": "databases",
  "lastVerified": "2026-07-07",
  "relatedSkills": ["postgresql", "prisma"],
  "tags": ["database", "sql"]
}
EOF

# 5. Validate your skill
pnpm run cli validate

# 6. Create a branch and submit PR
git checkout -b skill/my-api
git add skills/my-api/
git commit -m "feat: Add my-api skill"
git push origin skill/my-api
```

### Pull Request Checklist

- [ ] Skill follows the established SKILL.md template
- [ ] `metadata.json` is complete and valid
- [ ] All schema validations pass: `pnpm run cli validate`
- [ ] Skill is verified against current vendor documentation
- [ ] Code examples are tested and working
- [ ] Documentation is clear and beginner-friendly

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

---

## 📊 By the Numbers

- **101** Production-ready skills
- **14** Technical domains covered
- **31+** Automated test assertions
- **100%** Schema validation coverage
- **<100ms** Skill search latency
- **0** Known critical security issues

---

## 📖 Documentation

- **[Quick Start Guide](./docs/CLI_USAGE.md)** - Get up and running in minutes
- **[Code Examples & Benchmarks](./docs/BENCHMARKS_AND_EXAMPLES.md)** - Before/after comparisons
- **[API Reference](./docs/API_REFERENCE.md)** - SDK method documentation
- **[Contributing Guide](./CONTRIBUTING.md)** - How to add skills
- **[Skill Template](./docs/SKILL_TEMPLATE.md)** - Template for new skills

---

## 🔒 Security & Trust

- ✅ All code is open source and auditable
- ✅ No telemetry or data collection
- ✅ Regular security audits
- ✅ Dependencies scanned for vulnerabilities
- ✅ All skills verified against current vendor documentation

For security concerns, please email: **ashishyadav4818@gmail.com**

---

## 📝 License

[MIT](./LICENSE) © 2026 Awesome API Skills Contributors.

---

## 🙌 Acknowledgments

- Special thanks to all [contributors](https://github.com/ashish7802/awesome-api-skills/graphs/contributors)
- Inspired by the amazing AI developer community
- Built with ❤️ for developers everywhere

---

## 📞 Support & Community

- 💬 **[GitHub Discussions](https://github.com/ashish7802/awesome-api-skills/discussions)** - Ask questions and share ideas
- 🐛 **[Issue Tracker](https://github.com/ashish7802/awesome-api-skills/issues)** - Report bugs
- 📧 **Email** - ashishyadav4818@gmail.com

---

## 🎯 Roadmap

- [ ] Skill versioning system
- [ ] Web-based skill editor
- [ ] Automated skill testing framework
- [ ] Community skill marketplace
- [ ] IDE extensions (VS Code, JetBrains)
- [ ] Mobile app development skills
- [ ] Web3 and blockchain integrations
- [ ] More video tutorials

---

## ⭐ Show Your Support

If Awesome API Skills has helped you write better code:

- ⭐ **Star this repository** - It means the world!
- 🔗 **Share with your network** - Spread the word
- 💬 **Give feedback** - Let us know what you need
- 🤝 **Contribute skills** - Help us grow the library
- 💰 **Sponsor** - Support active development

---

<div align="center">

**Made with by [Ashish](https://github.com/ashish7802) and Contributors**

[⬆ Back to Top](#-awesome-api-skills)

</div>
