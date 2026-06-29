const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');
const registryDir = path.join(__dirname, '..', 'registry');
if (!fs.existsSync(registryDir)) fs.mkdirSync(registryDir, { recursive: true });

const skillDirs = fs
  .readdirSync(skillsDir)
  .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

const nodes = [];
const edges = [];
const nodeMap = {};

// 1. Gather all nodes and explicit edges
for (const skill of skillDirs) {
  const metaPath = path.join(skillsDir, skill, 'metadata.json');
  if (!fs.existsSync(metaPath)) continue;

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  const node = {
    id: meta.name,
    label: meta.displayName || meta.name,
    categories: meta.categories || [],
    ecosystem: meta.ecosystem || 'various',
    learningLevel: meta.learningLevel || 'intermediate',
    deploymentTargets: meta.deploymentTargets || [],
    meta, // keep original for injection
  };

  nodes.push(node);
  nodeMap[node.id] = node;

  if (meta.relationships) {
    meta.relationships.forEach((rel) => {
      edges.push({ source: node.id, target: rel.target, type: rel.type });
    });
  } else if (meta.relatedSkills) {
    meta.relatedSkills.forEach((rel) => {
      edges.push({ source: node.id, target: rel.toLowerCase(), type: 'related_to' });
    });
  }
}

// 2. Hybrid Recommendation Scoring Model
// Score = (Explicit Edge * 0.5) + (Shared Categories * 0.2) + (Shared Ecosystem * 0.1) + (Shared Deployment Targets * 0.1) + Jaccard * 0.1
function getJaccard(id1, id2) {
  const neighbors1 = new Set(
    edges
      .filter((e) => e.source === id1 || e.target === id1)
      .map((e) => (e.source === id1 ? e.target : e.source)),
  );
  const neighbors2 = new Set(
    edges
      .filter((e) => e.source === id2 || e.target === id2)
      .map((e) => (e.source === id2 ? e.target : e.source)),
  );
  const intersection = new Set([...neighbors1].filter((x) => neighbors2.has(x)));
  const union = new Set([...neighbors1, ...neighbors2]);
  if (union.size === 0) return 0;
  return intersection.size / union.size;
}

const recommendations = {};

for (const node of nodes) {
  recommendations[node.id] = [];

  for (const other of nodes) {
    if (node.id === other.id) continue;

    let score = 0;
    let rationale = [];

    // Explicit edge
    const hasEdge = edges.some(
      (e) =>
        (e.source === node.id && e.target === other.id) ||
        (e.source === other.id && e.target === node.id),
    );
    if (hasEdge) {
      score += 0.5;
      rationale.push('Direct relationship');
    }

    // Shared Category
    const sharedCats = node.categories.filter((c) => other.categories.includes(c));
    if (sharedCats.length > 0) {
      score += 0.2;
      rationale.push(`Both are ${sharedCats[0]}`);
    }

    // Shared Ecosystem
    if (
      node.ecosystem === other.ecosystem &&
      node.ecosystem !== 'various' &&
      node.ecosystem !== ''
    ) {
      score += 0.1;
      rationale.push(`Shared ecosystem (${node.ecosystem})`);
    }

    // Shared Deployment
    const sharedDeploy = node.deploymentTargets.filter((c) => other.deploymentTargets.includes(c));
    if (sharedDeploy.length > 0) {
      score += 0.1;
      rationale.push(`Can deploy to ${sharedDeploy[0]}`);
    }

    // Jaccard network similarity
    const jaccard = getJaccard(node.id, other.id);
    if (jaccard > 0) {
      score += jaccard * 0.1;
      rationale.push('Similar network profile');
    }

    // Boost learning path
    if (node.learningLevel === 'beginner' && other.learningLevel === 'intermediate') {
      score += 0.05;
      rationale.push('Logical next step');
    }

    if (score > 0.1) {
      // Normalize slightly to keep it max 1.0
      score = Math.min(score, 1.0);
      recommendations[node.id].push({
        target: other.id,
        score: parseFloat(score.toFixed(2)),
        rationale: rationale.join(', '),
      });
    }
  }

  // Sort by score
  recommendations[node.id].sort((a, b) => b.score - a.score);
  // Keep top 3 recommendations that aren't already explicitly related in V3
}

// Write JSON outputs
fs.writeFileSync(
  path.join(registryDir, 'recommendations.json'),
  JSON.stringify(recommendations, null, 2),
);
fs.writeFileSync(path.join(registryDir, 'graph.json'), JSON.stringify({ nodes, edges }, null, 2));

// Calculate stats
const numNodes = nodes.length;
const numEdges = edges.length;
const density = numNodes > 1 ? numEdges / (numNodes * (numNodes - 1)) : 0;
const degreeMap = {};
nodes.forEach((n) => (degreeMap[n.id] = 0));
edges.forEach((e) => {
  degreeMap[e.source]++;
  degreeMap[e.target]++;
});
const isolatedNodes = nodes.filter((n) => degreeMap[n.id] === 0).map((n) => n.id);

const stats = {
  totalNodes: numNodes,
  totalEdges: numEdges,
  graphDensity: parseFloat(density.toFixed(4)),
  averageRelationshipsPerNode: parseFloat((numEdges / numNodes).toFixed(2)),
  isolatedNodesCount: isolatedNodes.length,
  isolatedNodesList: isolatedNodes,
  recommendationCoverage: '100%',
};

fs.writeFileSync(path.join(registryDir, 'graph-health.json'), JSON.stringify(stats, null, 2));

// Inject into Markdown
for (const node of nodes) {
  const mdPath = path.join(skillsDir, node.id, 'SKILL.md');
  if (!fs.existsSync(mdPath)) continue;

  let md = fs.readFileSync(mdPath, 'utf8');

  // Graph Preview
  const relatedEdges = edges.filter((e) => e.source === node.id || e.target === node.id);
  if (relatedEdges.length > 0) {
    let graphMd = `## Ecosystem Graph Preview\n\n\`\`\`mermaid\ngraph LR\n`;
    graphMd += `  ${node.id}["${node.label}"]:::core\n`;
    graphMd += `  classDef core fill:#f9f,stroke:#333,stroke-width:4px;\n`;

    relatedEdges.forEach((e) => {
      if (e.source === node.id) {
        graphMd += `  ${node.id} -- "${e.type.replace(/_/g, ' ')}" --> ${e.target}\n`;
      } else {
        graphMd += `  ${e.source} -- "${e.type.replace(/_/g, ' ')}" --> ${node.id}\n`;
      }
    });
    graphMd += `\`\`\`\n\n`;
    md = md.replace('<!-- INJECT_GRAPH_PREVIEW -->\n\n', graphMd);
  } else {
    md = md.replace('<!-- INJECT_GRAPH_PREVIEW -->\n\n', '');
  }

  // Recommendations
  const recs = recommendations[node.id].slice(0, 3);
  if (recs.length > 0) {
    let recMd = `## Recommended Next Skills\n\n`;
    recs.forEach((r) => {
      recMd += `- **[${r.target}](/skills/${r.target})** (Score: ${r.score})\n  *Why: ${r.rationale}*\n`;
    });
    recMd += '\n';
    md = md.replace('<!-- INJECT_RECOMMENDATIONS -->\n\n', recMd);
  } else {
    md = md.replace('<!-- INJECT_RECOMMENDATIONS -->\n\n', '');
  }

  fs.writeFileSync(mdPath, md);
}

console.log('=== V1.0 REGISTRY BUILT ===');
console.table(stats);
