import { DependencyGraph } from '../interfaces.js';

export class BuildGraph implements DependencyGraph {
  // target -> dependencies
  private edges: Map<string, Set<string>> = new Map();
  // dependency -> targets
  private reverseEdges: Map<string, Set<string>> = new Map();

  addDependency(target: string, dependency: string): void {
    if (!this.edges.has(target)) this.edges.set(target, new Set());
    if (!this.reverseEdges.has(dependency)) this.reverseEdges.set(dependency, new Set());

    this.edges.get(target)!.add(dependency);
    this.reverseEdges.get(dependency)!.add(target);
  }

  getDependencies(target: string): string[] {
    return Array.from(this.edges.get(target) || []);
  }

  getAffectedTargets(changedDependency: string): string[] {
    const affected = new Set<string>();
    const queue = [changedDependency];

    while (queue.length > 0) {
      const dep = queue.shift()!;
      const targets = this.reverseEdges.get(dep);
      if (targets) {
        for (const t of targets) {
          if (!affected.has(t)) {
            affected.add(t);
            queue.push(t);
          }
        }
      }
    }
    return Array.from(affected);
  }
}
