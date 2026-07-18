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
        "categories": ["Payments", "Commerce"],
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
    "totalSkills": 100,
    "diagnosticsCount": 0,
    "results": [
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\algolia",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\anthropic",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\argo-cd",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\auth0",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\aws-dynamodb",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\aws-s3",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\azure-blob-storage",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\azure-openai",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\better-auth",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\biome",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\bullmq",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\caddy",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\clerk",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\cloudflare",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\cloudflare-workers",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\convex",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\datadog",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\deno-deploy",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\digitalocean",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\discord",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\docker",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\drizzle",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\eslint",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\express",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\fastapi",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\firebase",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\fly",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\gemini",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\git",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\github",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\github-actions",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\google-cloud-storage",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\grafana",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\helm",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\hono",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\jaeger",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\jwt",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\kafka",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\kubernetes",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\langchain",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\lemon-squeezy",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\linux",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\llamaindex",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\loki",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\mapbox",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\meilisearch",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\mixpanel",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\mongodb-atlas",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\mysql",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\nats",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\neon",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\nestjs",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\nextjs",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\nginx",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\nuxt",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\oauth2",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\okta",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\ollama",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\openai",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\openid-connect",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\opentelemetry",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\paddle",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\pinecone",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\plaid",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\planetscale",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\playwright",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\postgresql",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\posthog",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\prettier",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\prisma",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\prometheus",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\pulumi",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\rabbitmq",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\railway",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\react",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\redis",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\redis-streams",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\render",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\resend",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\revenuecat",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\sendgrid",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\sentry",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\shopify",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\slack",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\sqlite",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\stripe",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\supabase",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\sveltekit",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\terraform",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\traefik",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\trpc",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\turborepo",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\turso",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\twilio",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\typesense",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\upstash",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\vercel",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\vitest",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\vllm",
        "isValid": true,
        "diagnostics": []
      },
      {
        "skillId": "C:\\Users\\KASHIF\\.gemini\\antigravity\\scratch\\awesome-api-skills\\skills\\vue",
        "isValid": true,
        "diagnostics": []
      }
    ]
  }
}
```
