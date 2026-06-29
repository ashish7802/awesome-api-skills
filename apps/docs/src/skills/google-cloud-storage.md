---
title: google-cloud-storage
---

# google-cloud-storage

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
| **Doc source** | [official docs](https://googleapis.dev/nodejs/storage/latest/) |

</div>


## Graph

- **related to** → [aws s3](/skills/aws s3)
- **related to** → [firebase](/skills/firebase)

---

# Google Cloud Storage API Skill

## Quick Start
Google Cloud Storage (GCS) is the GCP equivalent of S3, optimized for high durability and tight integration with Google's ML and BigQuery ecosystems.

```bash
npm install @google-cloud/storage
```

## Common Workflows
### Signed URLs for Client Uploads
Never pass file buffers through your Node.js application. Generate a V4 Signed URL using `@google-cloud/storage`, send it to the frontend, and have the browser PUT the file directly into GCS.

## Production Patterns
### Resumable Uploads
For files exceeding 5MB, always utilize resumable uploads. The SDK handles this automatically via `bucket.file().createWriteStream({ resumable: true })`.

## Error Recovery
Handle intermittent network failures during massive downloads by wrapping stream pipes in error handlers and relying on GCS's native retry capabilities built into the Node.js SDK.

## Security Notes
Use Workload Identity Federation instead of downloading static JSON Service Account keys. Enforce Uniform Bucket-Level Access to prevent accidental public exposure via individual object ACLs.

## Performance Considerations
If you are serving thousands of small images globally, place Cloud CDN in front of your GCS bucket. Do not serve highly-trafficked public assets directly from GCS storage nodes.

## Testing Guidance
Use the Google Cloud Storage emulator (`fs-test-server`) to mock GCS APIs locally during CI without incurring egress charges.

## Troubleshooting
If Signed URLs fail with 'SignatureDoesNotMatch', ensure the `Content-Type` header sent by the browser exactly matches the `contentType` specified when generating the URL.

## References
- [GCS Node.js SDK](https://googleapis.dev/nodejs/storage/latest/)

## Related Skills
- [AWS S3](/skills/aws s3)
- [Firebase](/skills/firebase)

## Why use this skill
Use this when your agent works with **google-cloud-storage** — structured patterns beat pasted docs and prevent common hallucinations.

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
- [`firebase`](../firebase/SKILL.md) — related to

