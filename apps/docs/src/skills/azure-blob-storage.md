---
title: azure-blob-storage
---

# azure-blob-storage

<p class="skill-meta">Cloud · Storage</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | typescript, python, go |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob) |

</div>


## Graph

- **related to** → [aws s3](/skills/aws s3)
- **related to** → [google cloud storage](/skills/google cloud storage)

---

# Azure Blob Storage API Skill

## Quick Start
Azure Blob Storage handles massive amounts of unstructured data. The `@azure/storage-blob` SDK provides powerful abstractions for Block, Append, and Page blobs.

```bash
npm install @azure/storage-blob
```

## Common Workflows
### SAS (Shared Access Signature) Tokens
Generate a User Delegation SAS Token to grant temporary, tightly-scoped access to a specific blob without exposing the account key.

## Production Patterns
### Block Blobs vs Append Blobs
Use Block Blobs for standard files (images, documents). Use Append Blobs explicitly for log files where data is continuously written to the end of the blob.

## Error Recovery
The SDK automatically handles transient failures using built-in retry policies (exponential backoff). Catch `RestError` to handle fatal authorization or missing resource failures.

## Security Notes
Prioritize Azure AD (Entra ID) authentication via `DefaultAzureCredential` over using connection strings containing the Account Key.

## Performance Considerations
For high-throughput uploads, tune the `maxSingleShotSize` and `blockSize` parameters in the `uploadFile` method to parallelize chunk uploads efficiently across multiple threads.

## Testing Guidance
Use Azurite, the official local emulator for Azure Storage, to run integration tests entirely locally without an Azure subscription.

## Troubleshooting
If CORS errors occur when using SAS URLs in the browser, ensure CORS rules are explicitly defined on the Storage Account setting `AllowedOrigins` and `AllowedMethods` (PUT).

## References
- [Azure Blob SDK](https://learn.microsoft.com/en-us/javascript/api/@azure/storage-blob)

## Related Skills
- [AWS S3](/skills/aws s3)
- [Google Cloud Storage](/skills/google cloud storage)

## Why use this skill
Use this when your agent works with **azure-blob-storage** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`aws s3`](../aws s3/SKILL.md) — related to
- [`google cloud storage`](../google cloud storage/SKILL.md) — related to

