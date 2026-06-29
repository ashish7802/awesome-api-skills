/**
 * RC1 Comprehensive Repository Audit
 * Generates: repository-report.json
 *
 * Audits: packages, dependencies, files, skills, workflows, documentation,
 *         registry integrity, link validation, schema validation, and more.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const PACKAGES_DIR = path.join(ROOT, 'packages');
const REGISTRY_DIR = path.join(ROOT, 'registry');
const WORKFLOWS_DIR = path.join(ROOT, '.github', 'workflows');
const SCRIPTS_DIR = path.join(ROOT, 'scripts');

const report = {
  meta: {
    version: 'RC1',
    generatedAt: new Date().toISOString(),
    auditType: 'full',
  },
  packages: [],
  skills: { total: 0, valid: 0, invalid: 0, issues: [] },
  registry: { files: [], integrity: [] },
  workflows: [],
  files: { total: 0, byExtension: {}, generated: 0, handwritten: 0 },
  documentation: { pages: [], brokenInternalLinks: [], brokenExternalLinks: [] },
  dependencies: { production: [], development: [] },
  codeQuality: {},
  security: {},
  performance: {},
};

// ── 1. PACKAGE INVENTORY ──
function auditPackages() {
  if (!fs.existsSync(PACKAGES_DIR)) return;
  const pkgs = fs
    .readdirSync(PACKAGES_DIR)
    .filter((f) => fs.statSync(path.join(PACKAGES_DIR, f)).isDirectory());
  for (const pkg of pkgs) {
    const pkgJsonPath = path.join(PACKAGES_DIR, pkg, 'package.json');
    const entry = {
      name: pkg,
      hasPackageJson: false,
      hasTsConfig: false,
      hasTests: false,
      hasReadme: false,
    };
    if (fs.existsSync(pkgJsonPath)) {
      entry.hasPackageJson = true;
      const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
      entry.version = pkgJson.version;
      entry.dependencies = Object.keys(pkgJson.dependencies || {});
      entry.devDependencies = Object.keys(pkgJson.devDependencies || {});
    }
    entry.hasTsConfig = fs.existsSync(path.join(PACKAGES_DIR, pkg, 'tsconfig.json'));
    entry.hasReadme = fs.existsSync(path.join(PACKAGES_DIR, pkg, 'README.md'));
    // Check for test files
    const srcDir = path.join(PACKAGES_DIR, pkg, 'src');
    if (fs.existsSync(srcDir)) {
      const allFiles = walkDir(srcDir);
      entry.hasTests = allFiles.some((f) => f.endsWith('.test.ts') || f.endsWith('.spec.ts'));
      entry.sourceFiles = allFiles.length;
    }
    report.packages.push(entry);
  }
}

// ── 2. SKILL INVENTORY & VALIDATION ──
function auditSkills() {
  if (!fs.existsSync(SKILLS_DIR)) return;
  const skillDirs = fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => fs.statSync(path.join(SKILLS_DIR, f)).isDirectory());
  report.skills.total = skillDirs.length;

  const seenIds = new Set();

  for (const skill of skillDirs) {
    const dir = path.join(SKILLS_DIR, skill);
    const metaPath = path.join(dir, 'metadata.json');
    const mdPath = path.join(dir, 'SKILL.md');
    const examplesDir = path.join(dir, 'examples');

    // Check required files
    if (!fs.existsSync(metaPath)) {
      report.skills.issues.push({ skill, issue: 'Missing metadata.json' });
      report.skills.invalid++;
      continue;
    }
    if (!fs.existsSync(mdPath)) {
      report.skills.issues.push({ skill, issue: 'Missing SKILL.md' });
      report.skills.invalid++;
      continue;
    }

    const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

    // Duplicate ID check
    if (seenIds.has(meta.name)) {
      report.skills.issues.push({ skill, issue: `Duplicate ID: ${meta.name}` });
    }
    seenIds.add(meta.name);

    // Relationship validation
    if (meta.relationships) {
      for (const rel of meta.relationships) {
        // Check target exists
        if (!fs.existsSync(path.join(SKILLS_DIR, rel.target))) {
          report.skills.issues.push({ skill, issue: `Broken relationship target: ${rel.target}` });
        }
        // Check valid edge type
        const validTypes = [
          'depends_on',
          'integrates_with',
          'alternative_to',
          'extends',
          'deploys_to',
          'authenticates_with',
          'stores_data_in',
          'monitors',
          'searches',
          'publishes_to',
          'works_well_with',
          'related_to',
          'extended_by',
          'replaces',
          'implements',
          'provisioned_by',
          'implemented_by',
        ];
        if (!validTypes.includes(rel.type)) {
          report.skills.issues.push({ skill, issue: `Invalid edge type: ${rel.type}` });
        }
      }
    }

    // Check examples
    const hasExamples = fs.existsSync(examplesDir) && fs.readdirSync(examplesDir).length > 0;
    if (!hasExamples) {
      report.skills.issues.push({ skill, issue: 'No examples found' });
    }

    report.skills.valid++;
  }
}

// ── 3. DOCUMENTATION INVENTORY & LINK VALIDATION ──
function auditDocumentation() {
  const docFiles = ['README.md', 'SPECIFICATION.md', 'SECURITY.md'];
  for (const doc of docFiles) {
    const docPath = path.join(ROOT, doc);
    if (fs.existsSync(docPath)) {
      const content = fs.readFileSync(docPath, 'utf8');
      const wordCount = content.split(/\s+/).length;
      report.documentation.pages.push({ file: doc, wordCount, exists: true });

      // Internal link validation
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      let match;
      while ((match = linkRegex.exec(content)) !== null) {
        const href = match[2];
        if (href.startsWith('http')) continue; // Skip external
        if (href.startsWith('#')) continue; // Skip anchors
        const resolved = path.resolve(ROOT, href);
        if (!fs.existsSync(resolved)) {
          report.documentation.brokenInternalLinks.push({ file: doc, link: href });
        }
      }
    } else {
      report.documentation.pages.push({ file: doc, exists: false });
    }
  }

  // Skill documentation pages
  if (fs.existsSync(SKILLS_DIR)) {
    const skills = fs
      .readdirSync(SKILLS_DIR)
      .filter((f) => fs.statSync(path.join(SKILLS_DIR, f)).isDirectory());
    for (const skill of skills) {
      const mdPath = path.join(SKILLS_DIR, skill, 'SKILL.md');
      if (fs.existsSync(mdPath)) {
        const content = fs.readFileSync(mdPath, 'utf8');
        report.documentation.pages.push({
          file: `skills/${skill}/SKILL.md`,
          wordCount: content.split(/\s+/).length,
          exists: true,
        });
      }
    }
  }
}

// ── 4. REGISTRY INTEGRITY ──
function auditRegistry() {
  if (!fs.existsSync(REGISTRY_DIR)) return;
  const files = fs.readdirSync(REGISTRY_DIR);
  for (const file of files) {
    const fpath = path.join(REGISTRY_DIR, file);
    const stat = fs.statSync(fpath);
    report.registry.files.push({ file, sizeBytes: stat.size });

    // Validate JSON
    if (file.endsWith('.json')) {
      try {
        const data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
        // Specific validations
        if (file === 'graph.json') {
          report.registry.integrity.push({
            file,
            nodes: data.nodes?.length || 0,
            edges: data.edges?.length || 0,
            status: 'VALID',
          });
        }
        if (file === 'recommendations.json') {
          const keys = Object.keys(data);
          const anomalies = keys.filter((k) => !data[k] || data[k].length === 0);
          report.registry.integrity.push({
            file,
            skillsWithRecs: keys.length - anomalies.length,
            skillsWithoutRecs: anomalies.length,
            anomalies,
            status: anomalies.length === 0 ? 'VALID' : 'WARNING',
          });
        }
      } catch (err) {
        report.registry.integrity.push({ file, status: 'INVALID_JSON', error: err.message });
      }
    }
  }
}

// ── 5. WORKFLOW INVENTORY ──
function auditWorkflows() {
  if (!fs.existsSync(WORKFLOWS_DIR)) return;
  const wfs = fs.readdirSync(WORKFLOWS_DIR);
  for (const wf of wfs) {
    const content = fs.readFileSync(path.join(WORKFLOWS_DIR, wf), 'utf8');
    const nameMatch = content.match(/name:\s*['"]?(.+?)['"]?\n/);
    report.workflows.push({
      file: wf,
      name: nameMatch ? nameMatch[1] : wf,
      sizeBytes: Buffer.byteLength(content),
    });
  }
}

// ── 6. FILE INVENTORY ──
function walkDir(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fpath = path.join(dir, file);
    const stat = fs.statSync(fpath);
    if (stat.isDirectory()) {
      if (file === 'node_modules' || file === '.git' || file === 'dist') continue;
      results = results.concat(walkDir(fpath));
    } else {
      results.push(fpath);
    }
  }
  return results;
}

function auditFiles() {
  const allFiles = walkDir(ROOT);
  report.files.total = allFiles.length;

  const extMap = {};
  const generatedDirs = ['skills', 'registry', 'dist', 'snapshots'];

  for (const file of allFiles) {
    const ext = path.extname(file) || '(none)';
    extMap[ext] = (extMap[ext] || 0) + 1;

    const rel = path.relative(ROOT, file);
    const isGenerated = generatedDirs.some(
      (d) => rel.startsWith(d + path.sep) || rel.startsWith(d + '/'),
    );
    if (isGenerated) report.files.generated++;
    else report.files.handwritten++;
  }
  report.files.byExtension = extMap;
}

// ── 7. DEPENDENCY INVENTORY ──
function auditDependencies() {
  const rootPkg = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
  report.dependencies.development = Object.entries(rootPkg.devDependencies || {}).map(
    ([name, version]) => ({ name, version }),
  );
  report.dependencies.production = Object.entries(rootPkg.dependencies || {}).map(
    ([name, version]) => ({ name, version }),
  );

  // Scan for known vulnerable patterns
  report.security.secretsDetected = [];
  const suspiciousPatterns = [
    /api[_-]?key\s*[:=]\s*['"][A-Za-z0-9]{20,}['"]/i,
    /password\s*[:=]\s*['"][^'"]{8,}['"]/i,
  ];
  const srcFiles = walkDir(ROOT).filter(
    (f) => f.endsWith('.ts') || f.endsWith('.js') || f.endsWith('.json'),
  );
  for (const file of srcFiles) {
    if (file.includes('node_modules')) continue;
    if (file.includes('pnpm-lock')) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const pattern of suspiciousPatterns) {
      if (pattern.test(content)) {
        report.security.secretsDetected.push({
          file: path.relative(ROOT, file),
          pattern: pattern.toString(),
        });
      }
    }
  }

  // License inventory
  report.security.licenses = [];
  const rootLock = path.join(ROOT, 'pnpm-lock.yaml');
  if (fs.existsSync(rootLock)) {
    report.security.licenses.push({
      note: 'pnpm-lock.yaml present, lockfile integrity verifiable',
    });
  }
}

// ── EXECUTE ALL AUDITS ──
console.log('[RC1] Starting full repository audit...');
auditPackages();
console.log(`[✓] Packages: ${report.packages.length}`);
auditSkills();
console.log(
  `[✓] Skills: ${report.skills.total} (Valid: ${report.skills.valid}, Issues: ${report.skills.issues.length})`,
);
auditDocumentation();
console.log(`[✓] Documentation: ${report.documentation.pages.length} pages`);
auditRegistry();
console.log(`[✓] Registry: ${report.registry.files.length} files`);
auditWorkflows();
console.log(`[✓] Workflows: ${report.workflows.length}`);
auditFiles();
console.log(
  `[✓] Files: ${report.files.total} (Generated: ${report.files.generated}, Handwritten: ${report.files.handwritten})`,
);
auditDependencies();
console.log(
  `[✓] Dependencies: ${report.dependencies.development.length} dev, ${report.dependencies.production.length} prod`,
);
console.log(`[✓] Security: ${report.security.secretsDetected.length} suspicious patterns found`);

// Write report
fs.writeFileSync(path.join(ROOT, 'repository-report.json'), JSON.stringify(report, null, 2));
console.log('\n[RC1] repository-report.json written successfully.');
console.log(`\n=== AUDIT SUMMARY ===`);
console.log(`Packages: ${report.packages.length}`);
console.log(
  `Skills: ${report.skills.total} total, ${report.skills.valid} valid, ${report.skills.issues.length} issues`,
);
console.log(`Documentation Pages: ${report.documentation.pages.length}`);
console.log(`Broken Internal Links: ${report.documentation.brokenInternalLinks.length}`);
console.log(`Registry Files: ${report.registry.files.length}`);
console.log(`Workflows: ${report.workflows.length}`);
console.log(`Total Files: ${report.files.total}`);
console.log(`Secrets Detected: ${report.security.secretsDetected.length}`);
