# Supabase API Skill

## Overview
Supabase provides Postgres database access, authentication, edge functions, and storage. This skill covers the `@supabase/supabase-js` client and Row Level Security (RLS).

## Installation
```bash
npm install @supabase/supabase-js
pip install supabase
```

## Authentication
Clients use the `SUPABASE_URL` and `anon` key. Server environments use the `service_role` key to bypass RLS.

## Core Concepts
- **RLS (Row Level Security)**: Postgres policies that restrict row access based on the authenticated user.
- **Realtime**: Postgres CDC streamed over WebSockets.

## Common Workflows
1. Authenticate user via `supabase.auth.signInWithPassword`.
2. Query data: `supabase.from('table').select('*')`.
3. RLS automatically filters rows.

## Error Handling
Supabase returns `{ data, error }`. Always check `if (error)` rather than relying on try/catch, as the JS client does not throw exceptions for query errors.

## Security
Never expose the `service_role` key to the frontend. Always enable RLS on public tables.

## Rate Limits
Auth API is heavily rate-limited to prevent brute-forcing. Database queries are limited by your Postgres instance compute.

## Best Practices
Use generated TypeScript types (`supabase gen types typescript`) to ensure type-safe database queries.

## Troubleshooting
If queries return empty arrays `[]` instead of expected data, it is almost always due to missing or misconfigured RLS policies.

## References
- [API Reference](https://supabase.com/docs/reference)
