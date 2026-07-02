# AWS DynamoDB API Skill

## Overview
Amazon DynamoDB is a fully managed NoSQL database. This skill covers the AWS SDK v3 with a strong emphasis on the DocumentClient.

## Installation
```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
pip install boto3
```

## Authentication
Uses standard AWS IAM authentication.

## Core Concepts
- **Partition Key (PK)**: Determines data distribution.
- **Sort Key (SK)**: Enables range queries and sorting.
- **GSI**: Global Secondary Index for alternative access patterns.

## Common Workflows
1. Instantiate `DynamoDBClient`.
2. Wrap it with `DynamoDBDocumentClient.from(client)`.
3. Execute a `QueryCommand` or `PutCommand`.

## Error Handling
Handle `ProvisionedThroughputExceededException` via exponential backoff (SDK v3 does this automatically up to a limit). Handle `ConditionalCheckFailedException` for optimistic locking.

## Security
Use IAM conditions to restrict access to specific Partition Keys (e.g., tenant isolation) if acting on behalf of users.

## Rate Limits
Limits are based on Provisioned Capacity (WCUs/RCUs) or On-Demand mode throughput.

## Best Practices
Use Single Table Design to minimize network trips. Avoid `Scan` operations at all costs; always `Query` using well-defined indexes.

## Troubleshooting
If a `Query` returns unexpected results, ensure you are specifying the `IndexName` if querying a GSI, and that the GSI has finished populating.

## References
- [API Reference](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-dynamodb/)

## Why use this skill
Use this when your agent works with **aws-dynamodb** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Inventing column names or schema fields
- Using deprecated driver methods or wrong connection strings
- Omitting connection pooling or transaction boundaries

## Production checklist
- [ ] Migrations version-controlled and applied via CI
- [ ] Connection limits and pooling configured
- [ ] Backups and restore procedure documented

## Related skills
- [`terraform`](../terraform/SKILL.md) — provisioned by
- [`pulumi`](../pulumi/SKILL.md) — provisioned by

---
> **Last Verified:** 2026-07-02
