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
