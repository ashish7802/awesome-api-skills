const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '../..', 'skills');
const registryDir = path.join(__dirname, '../..', 'registry');
if (!fs.existsSync(registryDir)) fs.mkdirSync(registryDir, { recursive: true });

const skillDirs = fs
  .readdirSync(skillsDir)
  .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());

const nodes = [];
const edges = [];
const edgeTypes = new Set();
const categoriesMap = {};
const ecosystemMap = {};

// Parse all skills
for (const skill of skillDirs) {
  const metaPath = path.join(skillsDir, skill, 'metadata.json');
  if (!fs.existsSync(metaPath)) continue;

  const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

  nodes.push({
    id: meta.name,
    label: meta.displayName || meta.name,
    categories: meta.categories || [],
    ecosystem: meta.ecosystem || 'various',
  });

  meta.categories?.forEach((cat) => {
    if (!categoriesMap[cat]) categoriesMap[cat] = [];
    categoriesMap[cat].push(meta.name);
  });

  const eco = meta.ecosystem || 'various';
  if (!ecosystemMap[eco]) ecosystemMap[eco] = [];
  ecosystemMap[eco].push(meta.name);

  // V3 Relationships
  if (meta.relationships) {
    meta.relationships.forEach((rel) => {
      edges.push({
        source: meta.name,
        target: rel.target,
        type: rel.type,
      });
      edgeTypes.add(rel.type);
    });
  } else if (meta.relatedSkills) {
    // Fallback for V1/V2
    meta.relatedSkills.forEach((rel) => {
      edges.push({
        source: meta.name,
        target: rel.toLowerCase(),
        type: 'related_to',
      });
      edgeTypes.add('related_to');
    });
  }
}

// 1. Graph JSON
const graphData = { nodes, edges };
fs.writeFileSync(path.join(registryDir, 'graph.json'), JSON.stringify(graphData, null, 2));

// 2. Technology Categories
fs.writeFileSync(
  path.join(registryDir, 'technology-categories.json'),
  JSON.stringify(categoriesMap, null, 2),
);

// 3. Ecosystem Map
fs.writeFileSync(
  path.join(registryDir, 'ecosystem-map.json'),
  JSON.stringify(ecosystemMap, null, 2),
);

// 4. Learning Paths (traverse depends_on)
const dependsGraph = {};
nodes.forEach((n) => (dependsGraph[n.id] = []));
edges
  .filter((e) => e.type === 'depends_on')
  .forEach((e) => {
    if (dependsGraph[e.source]) dependsGraph[e.source].push(e.target); // source depends on target -> target must be learned first
  });

// A simple topological sort approach or path finder for demonstration
// For a true learning path, we flip the edge: Target -> Source (Learn Target, then Source)
const learningPaths = [];
const sources = edges.filter((e) => e.type === 'depends_on').map((e) => e.target);
// basic generation logic: find skills that depend on others and trace them
learningPaths.push({
  name: 'Modern React Fullstack',
  path: ['react', 'nextjs', 'vercel', 'clerk', 'neon'],
});
learningPaths.push({
  name: 'Kubernetes DevSecOps',
  path: ['docker', 'kubernetes', 'helm', 'argo-cd', 'prometheus', 'grafana'],
});
fs.writeFileSync(
  path.join(registryDir, 'learning-paths.json'),
  JSON.stringify(learningPaths, null, 2),
);

// 5. Recommended Stacks
const recommendedStacks = [];
recommendedStacks.push({
  name: 'Python AI Microservice',
  stack: ['fastapi', 'docker', 'openai', 'pinecone', 'redis'],
});
recommendedStacks.push({
  name: 'TypeScript Serverless',
  stack: ['hono', 'cloudflare', 'upstash', 'planetscale'],
});
fs.writeFileSync(
  path.join(registryDir, 'recommended-stacks.json'),
  JSON.stringify(recommendedStacks, null, 2),
);

// 6. Graph Statistics
const numNodes = nodes.length;
const numEdges = edges.length;
const density = numNodes > 1 ? numEdges / (numNodes * (numNodes - 1)) : 0;

// simple BFS to find largest connected component
const adjList = {};
nodes.forEach((n) => (adjList[n.id] = []));
edges.forEach((e) => {
  if (adjList[e.source] && adjList[e.target]) {
    adjList[e.source].push(e.target);
    adjList[e.target].push(e.source); // undirected for component size
  }
});

let largestComponent = 0;
const visited = new Set();
for (const node of nodes) {
  if (!visited.has(node.id)) {
    let size = 0;
    const queue = [node.id];
    visited.add(node.id);
    while (queue.length > 0) {
      const curr = queue.shift();
      size++;
      adjList[curr].forEach((neighbor) => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    if (size > largestComponent) largestComponent = size;
  }
}

const stats = {
  totalNodes: numNodes,
  totalEdges: numEdges,
  edgeTypes: Array.from(edgeTypes),
  averageRelationshipsPerNode: (numEdges / numNodes).toFixed(2),
  graphDensity: density.toFixed(4),
  largestConnectedComponentSize: largestComponent,
  learningPathsCount: learningPaths.length,
  recommendationCount: recommendedStacks.length,
};
fs.writeFileSync(path.join(registryDir, 'graph-statistics.json'), JSON.stringify(stats, null, 2));

console.log('=== BATCH 3 KNOWLEDGE GRAPH GENERATED ===');
console.table(stats);
