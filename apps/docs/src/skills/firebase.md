---
title: firebase
---

# firebase

<p class="skill-meta">Cloud · Databases</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | typescript, python |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://firebase.google.com/docs/admin/setup) |

</div>


## Graph

- **related to** ← [google-cloud-storage](/skills/google-cloud-storage)

---

# Firebase Admin API Skill

## Overview
Firebase Admin SDK allows privileged server environments to interact with Firestore, Auth, and Cloud Messaging.

## Installation
```bash
npm install firebase-admin
pip install firebase-admin
```

## Authentication
Authenticate using a Google Cloud Service Account key JSON file or Application Default Credentials (ADC).

## Core Concepts
- **Firestore**: NoSQL document database.
- **Custom Tokens**: JWTs minted on the server to log users into the client SDK.
- **FCM**: Firebase Cloud Messaging for push notifications.

## Common Workflows
1. Initialize `initializeApp({ credential: cert(serviceAccount) })`.
2. Access Firestore: `getFirestore()`.
3. Perform operations bypassing security rules.

## Error Handling
Catch `FirebaseError`. Error codes match RPC statuses (e.g., `not-found`, `already-exists`).

## Security
Service accounts have absolute God-mode access. Never deploy an Admin SDK service account key to a client application.

## Rate Limits
Firestore allows 10,000 writes per second per database. Batch operations are limited to 500 documents per batch.

## Best Practices
Use `batch()` for multiple writes to ensure atomicity. Use `runTransaction()` when a write depends on the current value of a document.

## Troubleshooting
If initialized multiple times, the SDK throws a 'default app already exists' error. Check `getApps().length` before initializing.

## References
- [API Reference](https://firebase.google.com/docs/admin/setup)

## Why use this skill
Use this when your agent works with **firebase** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- No graph relationships yet — see the knowledge graph in the docs site.

