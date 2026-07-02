# Mapbox API Skill

## Overview
Mapbox provides APIs for maps, geocoding, and routing. This skill focuses on the Mapbox Search (Geocoding) and Navigation APIs for backend services.

## Installation
```bash
npm install @mapbox/mapbox-sdk
pip install mapbox
```

## Authentication
Authenticate using Access Tokens. Default public tokens (`pk.*`) are for frontends. Secret tokens (`sk.*`) are for backends.

## Core Concepts
- **Geocoding**: Converting text (addresses) into geographic coordinates.
- **Isochrone**: Calculating areas reachable within a given time.
- **Matrix API**: Travel times between many points.

## Common Workflows
1. Instantiate the client with your Secret Token.
2. Call `geocodingService.forwardGeocode`.
3. Extract `features[0].center` for coordinates.

## Error Handling
Catch network errors and parse the `message` from Mapbox. Check HTTP 422 for unprocessable geometry.

## Security
Always use URL restrictions (Referrer matching) on Public Tokens. Keep Secret Tokens completely out of client-side code.

## Rate Limits
Geocoding is limited to 600 requests per minute on standard plans.

## Best Practices
Cache geocoding results permanently where legally allowed by the Terms of Service to dramatically reduce API costs and latency.

## Troubleshooting
If reverse geocoding returns inaccurate results, ensure you are passing the correct `types` filter (e.g., `address`, `poi`).

## References
- [API Reference](https://docs.mapbox.com/api/)

## Why use this skill
Use this when your agent works with **mapbox** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`react`](../react/SKILL.md) — integrates with
- [`vue`](../vue/SKILL.md) — integrates with

---
> **Last Verified:** 2026-07-02
