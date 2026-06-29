/**
 * RC1 Performance Audit
 * Measures actual cold/warm times for core operations.
 */
const { performance } = require('perf_hooks');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const results = {};

function measure(label, fn) {
  const start = performance.now();
  fn();
  const elapsed = (performance.now() - start).toFixed(2);
  results[label] = `${elapsed}ms`;
  console.log(`[PERF] ${label}: ${elapsed}ms`);
}

// 1. Registry Load
measure('registry_load_graph_json', () => {
  JSON.parse(fs.readFileSync(path.join(ROOT, 'registry', 'graph.json'), 'utf8'));
});

// 2. Recommendations Load
measure('registry_load_recommendations_json', () => {
  JSON.parse(fs.readFileSync(path.join(ROOT, 'registry', 'recommendations.json'), 'utf8'));
});

// 3. Full skill directory scan
measure('skill_directory_scan_100_skills', () => {
  const skillsDir = path.join(ROOT, 'skills');
  const skills = fs
    .readdirSync(skillsDir)
    .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());
  for (const skill of skills) {
    const metaPath = path.join(skillsDir, skill, 'metadata.json');
    if (fs.existsSync(metaPath)) JSON.parse(fs.readFileSync(metaPath, 'utf8'));
  }
});

// 4. Search simulation (naive substring across all SKILL.md files)
measure('search_latency_substring', () => {
  const skillsDir = path.join(ROOT, 'skills');
  const skills = fs
    .readdirSync(skillsDir)
    .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory());
  const query = 'authentication';
  const hits = [];
  for (const skill of skills) {
    const mdPath = path.join(skillsDir, skill, 'SKILL.md');
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, 'utf8');
      if (content.toLowerCase().includes(query)) hits.push(skill);
    }
  }
  results['search_hits_for_authentication'] = hits.length;
});

// 5. Knowledge Graph build
measure('knowledge_graph_build', () => {
  execSync('node scripts/build-registry-v1.js', { cwd: ROOT, stdio: 'ignore' });
});

// 6. Validation pass
measure('validation_full_audit', () => {
  execSync('node scripts/rc1-audit.js', { cwd: ROOT, stdio: 'ignore' });
});

// 7. Cold TypeScript check (if tsc exists)
try {
  measure('typescript_check', () => {
    execSync('npx tsc --noEmit', { cwd: ROOT, stdio: 'ignore' });
  });
} catch {
  results['typescript_check'] = 'SKIPPED (tsc errors present)';
}

// Write results
fs.writeFileSync(path.join(ROOT, 'performance-report.json'), JSON.stringify(results, null, 2));
console.log('\n[RC1] Performance report written to performance-report.json');
console.log(JSON.stringify(results, null, 2));
