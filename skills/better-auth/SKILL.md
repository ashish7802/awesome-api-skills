# Better Auth API Skill

## Quick Start
Better Auth provides framework-agnostic auth (Next.js, Express, SvelteKit) deeply integrated with modern ORMs like Drizzle and Prisma.

```bash
npm install better-auth
```

## Common Workflows
### OAuth and Magic Links
Configure plugins to enable OAuth (GitHub, Google) or Magic Links. Better Auth natively handles session creation and saves profiles to your database using the provided database adapter.

## Production Patterns
### Two-Factor Authentication
Utilize the `twoFactor` plugin to require TOTP before issuing a valid session cookie. Ensure you construct your UI to gracefully handle the `requires_two_factor` response state.

## Error Recovery
Handle `BetterAuthError`. When creating users, handle conflicts gracefully (e.g., Email already exists) and prompt the user to log in instead.

## Security Notes
Better Auth handles CSRF and secure cookies out of the box. Ensure your `trustedOrigins` configuration accurately reflects your production domains to prevent session hijacking.

## Performance Considerations
Session validation happens on the Edge or Server. Optimize your database queries (e.g., adding indexes to the `session_token` column) to ensure ultra-fast session lookups on every request.

## Testing Guidance
Better Auth can be mocked easily by overriding the `getSession` function in your unit tests, or by provisioning a test database specifically for your test runner.

## Troubleshooting
If sessions randomly invalidate, ensure you are not clearing cookies improperly across subdomains and that the `secret` configuration variable remains static across deployments.

## References
- [Better Auth Docs](https://www.better-auth.com/docs)

## Related Skills
- [Clerk](/skills/clerk)
- [Neon](/skills/neon)
