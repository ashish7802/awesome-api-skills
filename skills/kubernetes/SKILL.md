# Kubernetes Skill

> Automated container deployment, scaling, and management.

## Ecosystem Graph

```mermaid
graph LR
  kubernetes["Kubernetes"]
  kubernetes -- "depends on" --> docker
  kubernetes -- "integrates with" --> helm
  kubernetes -- "works well with" --> argo-cd
  kubernetes -- "monitors" --> prometheus
```

## Quick Start
Kubernetes (K8s) orchestrates clusters of machines running containers. It declarative states (YAML) to manage Deployments, Services, and Ingresses.

```bash
kubectl apply -f deployment.yaml
```

## Production Patterns
### Operators
For complex stateful applications (like Postgres or Redis), do not manually manage StatefulSets. Use Kubernetes Operators (e.g., CrunchyData Postgres Operator) to handle backups, failovers, and version upgrades automatically.

## Architecture & Scaling
### Probes
Always define `livenessProbe` and `readinessProbe`. The liveness probe determines if the pod needs to be restarted. The readiness probe determines if the pod is ready to receive network traffic from the Service load balancer.

## Error Recovery
If pods frequently crash with `OOMKilled` (Out of Memory), ensure your `resources.limits.memory` is set correctly and matches the memory allocation limits of your runtime (e.g., Node.js `--max-old-space-size`).

## Security Notes
Enable RBAC (Role-Based Access Control). Do not grant default Service Accounts cluster-admin privileges. Utilize Network Policies to restrict pod-to-pod communication (e.g., only the backend can talk to the database).

## Relationships
**Prerequisites**: [docker](/skills/docker)

**Works Well With**: [helm](/skills/helm), [argo-cd](/skills/argo-cd)

## References
- [Kubernetes Docs](https://kubernetes.io/docs/home/)
