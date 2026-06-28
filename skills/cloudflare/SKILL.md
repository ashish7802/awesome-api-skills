# Cloudflare API Skill

## Overview
The Cloudflare API manages DNS, CDN caching, Workers, and WAF rules. This skill covers the Node.js SDK and REST patterns.

## Installation
```bash
npm install cloudflare
pip install cloudflare
```

## Authentication
Use API Tokens (recommended) instead of the Global API Key. Tokens can be scoped to specific zones and permissions.

## Core Concepts
- **Zone**: Represents a domain name.
- **Workers**: Serverless execution environments at the edge.
- **Cache Purge**: Invalidating stored assets.

## Common Workflows
1. Instantiate client with API token.
2. Fetch Zone ID using domain name.
3. Execute action (e.g., `client.zones.purgeCache`).

## Error Handling
Errors are returned in the `errors` array of the JSON response payload. Watch for code `10000` (Authentication error).

## Security
Scope API Tokens tightly (e.g., 'Zone.DNS.Edit' for a single domain). Never use the Global API key in automated scripts.

## Rate Limits
The API allows 1200 requests per 5 minutes per IP address.

## Best Practices
When purging cache, try to purge by URL, Tag, or Prefix rather than 'Purge Everything' to maintain CDN performance.

## Troubleshooting
If DNS records aren't updating, verify the 'proxied' (orange cloud) status, which alters how Cloudflare serves the record.

## References
- [API Reference](https://developers.cloudflare.com/api/)
