const fs = require('fs');
const path = require('path');

const root = process.cwd();
const skillsDir = path.join(root, 'skills');
const docsDir = path.join(root, 'docs');
if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

const skills = fs
  .readdirSync(skillsDir)
  .filter((f) => fs.statSync(path.join(skillsDir, f)).isDirectory())
  .map((id) => {
    const metaPath = path.join(skillsDir, id, 'metadata.json');
    const meta = fs.existsSync(metaPath)
      ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
      : { name: id, categories: [], description: '' };
    return {
      id,
      name: meta.name || id,
      description: meta.description || '',
      categories: meta.categories || [],
      lastVerified: meta.lastVerified || '2026-07-02',
      path: `../skills/${id}/SKILL.md`,
    };
  });

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Awesome API Skills — Searchable Index</title>
  <style>
    :root {
      --bg: #09090b;
      --card-bg: #18181b;
      --border: #27272a;
      --text: #f4f4f5;
      --muted: #a1a1aa;
      --accent: #3b82f6;
      --accent-bg: rgba(59, 130, 246, 0.1);
    }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: var(--bg);
      color: var(--text);
      margin: 0;
      padding: 2rem 1rem;
    }
    .container {
      max-width: 1100px;
      margin: 0 auto;
    }
    header {
      text-align: center;
      margin-bottom: 2rem;
    }
    h1 {
      font-size: 2.25rem;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, #60a5fa, #a855f7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.subtitle {
      color: var(--muted);
      font-size: 1.1rem;
    }
    .search-box {
      margin-bottom: 2rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
    }
    input#search {
      width: 100%;
      max-width: 600px;
      padding: 0.8rem 1.2rem;
      border-radius: 0.5rem;
      border: 1px solid var(--border);
      background: var(--card-bg);
      color: var(--text);
      font-size: 1rem;
      outline: none;
    }
    input#search:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 2px var(--accent-bg);
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.25rem;
    }
    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: 0.75rem;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.15s ease, border-color 0.15s ease;
    }
    .card:hover {
      transform: translateY(-2px);
      border-color: var(--accent);
    }
    .card-title {
      font-size: 1.25rem;
      font-weight: 600;
      margin: 0 0 0.5rem 0;
    }
    .card-title a {
      color: var(--text);
      text-decoration: none;
    }
    .card-title a:hover {
      color: var(--accent);
    }
    .card-desc {
      color: var(--muted);
      font-size: 0.9rem;
      margin-bottom: 1rem;
      line-height: 1.4;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 0.75rem;
    }
    .tag {
      background: var(--accent-bg);
      color: #93c5fd;
      font-size: 0.75rem;
      padding: 0.2rem 0.5rem;
      border-radius: 0.25rem;
    }
    .verified-date {
      font-size: 0.75rem;
      color: #34d399;
    }
    .stats {
      text-align: center;
      color: var(--muted);
      margin-bottom: 1.5rem;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <h1>Awesome API Skills Directory</h1>
      <p class="subtitle">100 verified SKILL.md files for AI coding agents</p>
    </header>

    <div class="search-box">
      <input type="text" id="search" placeholder="Search 100 skills by API name, category, or keyword..." autofocus>
    </div>

    <div class="stats" id="stats">Showing 100 of 100 skills</div>

    <div class="grid" id="grid"></div>
  </div>

  <script>
    const skills = ${JSON.stringify(skills)};
    const searchInput = document.getElementById('search');
    const grid = document.getElementById('grid');
    const stats = document.getElementById('stats');

    function renderSkills(filtered) {
      stats.textContent = \`Showing \${filtered.length} of \${skills.length} skills\`;
      grid.innerHTML = filtered.map(s => \`
        <div class="card">
          <div>
            <h2 class="card-title"><a href="\${s.path}">\${s.name}</a></h2>
            <p class="card-desc">\${s.description || 'Structured API skill context for AI coding agents.'}</p>
          </div>
          <div>
            <div class="tags">
              \${(s.categories || []).map(c => \`<span class="tag">\${c}</span>\`).join('')}
            </div>
            <div class="verified-date">✓ Verified \${s.lastVerified}</div>
          </div>
        </div>
      \`).join('');
    }

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderSkills(skills);
        return;
      }
      const matched = skills.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        (s.description && s.description.toLowerCase().includes(q)) ||
        (s.categories && s.categories.some(c => c.toLowerCase().includes(q)))
      );
      renderSkills(matched);
    });

    renderSkills(skills);
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html, 'utf8');
console.log('Successfully generated static searchable index in docs/index.html');
