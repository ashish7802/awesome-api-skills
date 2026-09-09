# Registry & Knowledge Graph

The registry maintains metadata, category indexes, and dependency relationships for all **101 skills**.

## Graph Data

The complete dependency and integration graph is located in `registry/graph.json`:

- **Nodes**: 101 unique skill nodes with version, categories, and agent compatibility.
- **Edges**: 216 directed relationships categorizing stacks, prerequisites, and alternatives.

## Edge Types

| Relationship | Description | Example |
| :--- | :--- | :--- |
| `depends_on` | Required underlying dependency | `argo-cd` → `kubernetes` |
| `integrates_with` | Frequently paired in production | `auth0` → `nextjs` |
| `works_well_with` | Complementary technology | `drizzle` → `postgresql` |
| `alternative_to` | Direct technology alternative | `fastapi` → `express` |
| `related_to` | Shared technology domain | `redis` → `upstash` |

[Explore the interactive graph visualization →](/graph)

