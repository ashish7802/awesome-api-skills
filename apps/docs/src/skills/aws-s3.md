---
title: aws-s3
---

# aws-s3

<p class="skill-meta">Cloud · Storage</p>


<div class="trust-panel">
  <div class="trust-header">
    <div class="trust-badge">
      <span class="pulse-dot"></span>
      <span>validated</span>
    </div>
    <span class="trust-version">Schema v1.0.0</span>
  </div>
  <div class="trust-grid">
    <div class="trust-item">
      <span class="trust-label">Maintainer</span>
      <span class="trust-val">Awesome API Skills Team</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Last Verified</span>
      <span class="trust-val">2026-07-02</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Languages</span>
      <span class="trust-val">typescript, python</span>
    </div>
    <div class="trust-item">
      <span class="trust-label">Supported Agents</span>
      <span class="trust-val">cursor, claude-code, cline, continue</span>
    </div>
  </div>
  <div class="trust-doc-link"><a href="https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/" target="_blank" rel="noopener">Official Documentation ↗</a></div>
</div>


## Graph

- **provisioned by** → [terraform](/skills/terraform)
- **provisioned by** → [pulumi](/skills/pulumi)
- **related to** ← [azure-blob-storage](/skills/azure-blob-storage)
- **related to** ← [digitalocean](/skills/digitalocean)
- **related to** ← [google-cloud-storage](/skills/google-cloud-storage)
- **works well with** ← [replicate](/skills/replicate)

---


## Overview
Amazon Simple Storage Service (S3) provides highly scalable object storage. This skill details the AWS SDK v3 for Node.js.

## Installation
```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
pip install boto3
```

## Authentication
Authenticate via IAM Roles (in EC2/Lambda) or Access Keys (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`). Avoid hardcoded credentials.

## Core Concepts
- **Bucket**: The root container for objects.
- **Object**: A file and its metadata.
- **Presigned URL**: A temporary URL granting access to upload/download a specific object.

## Common Workflows
1. Instantiate `S3Client`.
2. Construct a `PutObjectCommand`.
3. Send the command to upload a stream or buffer.

## Error Handling
Catch `S3ServiceException`. Common errors include `NoSuchBucket` and `AccessDenied`. Ensure bucket policies and IAM permissions align.

## Security
Block Public Access at the account level. Always use Presigned URLs for client-side uploads rather than routing large files through your API server.

## Rate Limits
S3 automatically scales, but standard performance supports 3,500 PUT/COPY/POST/DELETE and 5,500 GET/HEAD requests per second per prefix.

## Best Practices
Use Multipart Upload for files larger than 100MB. Use random prefixes (like UUIDs) in object keys to avoid thermal hotspots in S3 partitions.

## Troubleshooting
If a presigned URL fails with SignatureDoesNotMatch, ensure the HTTP method and headers exactly match what was requested during generation.

## References
- [API Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/)

## Why use this skill
Use this when your agent works with **aws-s3** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Using outdated SDK or API versions from training data
- Inventing environment variable names
- Omitting error handling and retry logic

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`terraform`](../terraform/SKILL.md) — provisioned by
- [`pulumi`](../pulumi/SKILL.md) — provisioned by

---
> **Last Verified:** 2026-07-02

