const fs = require('fs');
const path = require('path');

const registryDir = path.join(__dirname, '../..', 'registry');
const graphPath = path.join(registryDir, 'graph.json');

if (!fs.existsSync(graphPath)) {
  console.error('graph.json not found');
  process.exit(1);
}

const graph = JSON.parse(fs.readFileSync(graphPath, 'utf8'));
const { nodes, edges } = graph;

// Analysis
const degreeMap = {};
nodes.forEach((n) => (degreeMap[n.id] = 0));
edges.forEach((e) => {
  if (degreeMap[e.source] !== undefined) degreeMap[e.source]++;
  if (degreeMap[e.target] !== undefined) degreeMap[e.target]++;
});

const isolatedNodes = nodes.filter((n) => degreeMap[n.id] === 0).map((n) => n.id);
const lowConnectivityNodes = nodes
  .filter((n) => degreeMap[n.id] > 0 && degreeMap[n.id] <= 2)
  .map((n) => n.id);

// Find categories
const categoryMap = {};
nodes.forEach((n) => {
  n.categories.forEach((c) => {
    categoryMap[c] = (categoryMap[c] || 0) + 1;
  });
});

const coverageReport = {
  totalNodes: nodes.length,
  totalEdges: edges.length,
  isolatedNodes,
  lowConnectivityNodes,
  categoryDistribution: categoryMap,
  recommendationsForBatch4: [
    'Add foundational databases (PostgreSQL, MySQL, SQLite) to link ORMs and backend frameworks.',
    'Add caching and queues (RabbitMQ, Redis Streams) to link microservice components.',
    'Add AI infrastructure (LangChain, Ollama) to link AI APIs.',
    'Add Auth (OAuth, JWT) to link identity providers.',
  ],
};

const reportsDir = path.join(__dirname, '../../docs/reports');
fs.mkdirSync(reportsDir, { recursive: true });
fs.writeFileSync(
  path.join(reportsDir, 'coverage-report.json'),
  JSON.stringify(coverageReport, null, 2),
);

console.log('=== COVERAGE REPORT GENERATED ===');
console.log(JSON.stringify(coverageReport, null, 2));
