---
title: helm
---

# helm

<p class="skill-meta">Developer Tools · Infrastructure</p>


<div class="trust-panel">

| | |
| :--- | :--- |
| **Validation** | validated |
| **Schema** | 1.0.0 |
| **Maintainer** | Awesome API Skills Team |
| **Updated** | 2026-06-29 |
| **Languages** | yaml |
| **Agents** | cursor, claude-code, cline, continue |
| **Doc source** | [official docs](https://helm.sh/docs/) |

</div>


## Graph

- **depends on** → [kubernetes](/skills/kubernetes)
- **integrates with** → [argo-cd](/skills/argo-cd)

---

# Helm Skill

> The package manager for Kubernetes.

## Ecosystem Graph

```mermaid
graph LR
  helm["Helm"]
  helm -- "depends on" --> kubernetes
  helm -- "integrates with" --> argo-cd
```

## Quick Start
Helm packages Kubernetes YAML files into distributable 'Charts'. It allows templating YAML files so you can deploy identical apps to staging and production with different environment variables.

```bash
helm install my-release bitnami/redis
```

## Production Patterns
### Umbrella Charts
For complex microservice architectures, create an 'Umbrella' Helm chart that contains no templates of its own, but defines your individual microservice charts as dependencies in `Chart.yaml`. This allows deploying your entire ecosystem with a single command.

## Architecture & Scaling
### Values Overrides
Keep your chart templates generic. Define environment-specific configurations entirely within `values-staging.yaml` and `values-prod.yaml`. Pass these during installation: `helm upgrade -f values-prod.yaml ...`

## Error Recovery
Use `helm rollback <release> <revision>` to instantly revert a broken deployment. Helm tracks the history of deployed charts natively in Kubernetes Secrets.

## Security Notes
Do not store plaintext passwords in `values.yaml` files committed to Git. Use tools like HashiCorp Vault or `helm-secrets` (backed by SOPS) to inject encrypted values at deploy time.

## Relationships
**Prerequisites**: [kubernetes](/skills/kubernetes)

**Works Well With**: [argo-cd](/skills/argo-cd)

## References
- [Helm Docs](https://helm.sh/docs/)

## Why use this skill
Use this when your agent works with **helm** — structured patterns beat pasted docs and prevent common hallucinations.

## AI pitfalls
- Referencing CLI flags or config keys that do not exist
- Using outdated major versions of tools
- Skipping lockfile or version pinning in examples

## Production checklist
- [ ] Secrets in environment variables, not source code
- [ ] Error handling and logging in place
- [ ] Rate limits and timeouts configured

## Related skills
- [`kubernetes`](../kubernetes/SKILL.md) — depends on
- [`argo-cd`](../argo-cd/SKILL.md) — integrates with

