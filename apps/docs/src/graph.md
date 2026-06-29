---
title: Knowledge Graph
---

# Recommended stacks & relationships

The graph connects **100 skills** with **213 relationships** — prerequisites, alternatives, and stacks that work together.

## Popular stacks

- **Full-stack TypeScript:** [nextjs](/skills/nextjs) → [prisma](/skills/prisma) → [postgresql](/skills/postgresql)
- **Payments SaaS:** [stripe](/skills/stripe) → [express](/skills/express) → [postgresql](/skills/postgresql)
- **AI + RAG:** [openai](/skills/openai) → [pinecone](/skills/pinecone) → [vercel](/skills/vercel)
- **Serverless auth:** [clerk](/skills/clerk) → [nextjs](/skills/nextjs) → [supabase](/skills/supabase)
- **Observability:** [opentelemetry](/skills/opentelemetry) → [prometheus](/skills/prometheus) → [grafana](/skills/grafana)

## Stack diagram

```mermaid
flowchart LR
  subgraph Full-stack_TypeScript["Full-stack TypeScript"]
    nextjs --> prisma
    prisma --> postgresql
    postgresql
  end
  subgraph Payments_SaaS["Payments SaaS"]
    stripe --> express
    express --> postgresql
    postgresql
  end
  subgraph AI_+_RAG["AI + RAG"]
    openai --> pinecone
    pinecone --> vercel
    vercel
  end
  subgraph Serverless_auth["Serverless auth"]
    clerk --> nextjs
    nextjs --> supabase
    supabase
  end
  subgraph Observability["Observability"]
    opentelemetry --> prometheus
    prometheus --> grafana
    grafana
  end
```

## Prerequisites & integrations (sample)

```mermaid
flowchart TD
  argo-cd -->|depends on| kubernetes
  auth0 -->|integrates with| nextjs
  bullmq -->|depends on| redis
  bullmq -->|integrates with| nestjs
  cloudflare-workers -->|integrates with| drizzle
  discord -->|integrates with| express
  discord -->|integrates with| fastapi
  docker -->|integrates with| github-actions
  drizzle -->|integrates with| postgresql
  drizzle -->|integrates with| mysql
  drizzle -->|integrates with| sqlite
  fastapi -->|integrates with| openai
  gemini -->|integrates with| langchain
  gemini -->|integrates with| llamaindex
  github-actions -->|depends on| git
  grafana -->|integrates with| prometheus
  grafana -->|integrates with| loki
  helm -->|depends on| kubernetes
  helm -->|integrates with| argo-cd
  jaeger -->|depends on| opentelemetry
```

## How to read edges

| Type | Meaning |
| :--- | :--- |
| `depends_on` | Install or learn this first |
| `integrates_with` | Commonly used together |
| `works_well_with` | Recommended pairing |
| `alternative_to` | Pick one or the other |
| `related_to` | Same domain, explore both |

## Learning paths

1. **Backend API** — `express` → `postgresql` → `prisma` → `stripe`
2. **Frontend app** — `react` → `nextjs` → `vercel`
3. **AI features** — `openai` → `langchain` → `pinecone`

Raw data: [`registry/graph.json`](https://github.com/ashish7802/awesome-api-skills/blob/master/registry/graph.json)
