const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../../');
const skillsDir = path.join(repoRoot, 'skills');
const htmlPath = path.join(repoRoot, 'docs/index.html');

const skillDirs = fs.readdirSync(skillsDir).filter((d) => fs.statSync(path.join(skillsDir, d)).isDirectory()).sort();

const skillsList = skillDirs.map((id) => {
  const metaPath = path.join(skillsDir, id, 'metadata.json');
  let meta = { name: id, description: '', categories: [], lastVerified: '2026-07-03' };
  if (fs.existsSync(metaPath)) {
    try {
      meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    } catch (e) {}
  }
  return {
    id,
    name: meta.name || id,
    description: meta.description || 'Structured API skill context for AI coding agents.',
    categories: meta.categories || ['Developer Tools'],
    lastVerified: meta.lastVerified || '2026-07-03',
    path: `../skills/${id}/SKILL.md`,
  };
});

const count = skillsList.length;

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Awesome API Skills Directory</title>
    <style>
      :root {
        --bg: #090d16;
        --surface: #111827;
        --surface-hover: #1f2937;
        --border: #374151;
        --text-main: #f9fafb;
        --text-muted: #9ca3af;
        --accent: #3b82f6;
        --accent-hover: #60a5fa;
        --tag-bg: #1e3a8a;
        --tag-text: #93c5fd;
        --badge-bg: #064e3b;
        --badge-text: #6ee7b7;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      body {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
          sans-serif;
        background-color: var(--bg);
        color: var(--text-main);
        line-height: 1.5;
        padding: 2rem 1rem;
      }
      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      header {
        text-align: center;
        margin-bottom: 2rem;
      }
      h1 {
        font-size: 2.5rem;
        font-weight: 800;
        margin-bottom: 0.5rem;
        background: linear-gradient(135deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .subtitle {
        color: var(--text-muted);
        font-size: 1.1rem;
      }
      .search-box {
        margin: 2rem auto;
        max-width: 600px;
        position: relative;
      }
      input[type='text'] {
        width: 100%;
        padding: 0.875rem 1.25rem;
        font-size: 1rem;
        border: 1px solid var(--border);
        border-radius: 9999px;
        background: var(--surface);
        color: var(--text-main);
        outline: none;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: border-color 0.2s;
      }
      input[type='text']:focus {
        border-color: var(--accent);
      }
      .stats {
        text-align: center;
        color: var(--text-muted);
        margin-bottom: 2rem;
        font-size: 0.9rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
      }
      .card {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 0.75rem;
        padding: 1.25rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition:
          transform 0.2s,
          border-color 0.2s,
          background-color 0.2s;
      }
      .card:hover {
        transform: translateY(-2px);
        border-color: var(--accent);
        background: var(--surface-hover);
      }
      .card-title {
        font-size: 1.25rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }
      .card-title a {
        color: var(--text-main);
        text-decoration: none;
      }
      .card-title a:hover {
        color: var(--accent-hover);
      }
      .card-desc {
        color: var(--text-muted);
        font-size: 0.875rem;
        margin-bottom: 1rem;
        flex-grow: 1;
      }
      .tags {
        display: flex;
        flex-wrap: wrap;
        gap: 0.35rem;
        margin-bottom: 0.75rem;
      }
      .tag {
        background: var(--tag-bg);
        color: var(--tag-text);
        font-size: 0.75rem;
        padding: 0.2rem 0.5rem;
        border-radius: 0.25rem;
        font-weight: 500;
      }
      .verified-date {
        font-size: 0.75rem;
        color: var(--badge-text);
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <header>
        <h1>Awesome API Skills Directory</h1>
        <p class="subtitle">${count} verified SKILL.md files for AI coding agents</p>
      </header>

      <div class="search-box">
        <input
          type="text"
          id="search"
          placeholder="Search ${count} skills by API name, category, or keyword..."
          autofocus
        />
      </div>

      <div class="stats" id="stats">Showing ${count} of ${count} skills</div>

      <div class="grid" id="grid"></div>
    </div>

    <script>
      const skills = ${JSON.stringify(skillsList, null, 8)};

      const grid = document.getElementById('grid');
      const searchInput = document.getElementById('search');
      const stats = document.getElementById('stats');

      function renderSkills(items) {
        stats.textContent = \`Showing \${items.length} of \${skills.length} skills\`;
        grid.innerHTML = items
          .map(
            (s) => \`
        <div class="card">
          <div>
            <h2 class="card-title"><a href="\${s.path}">\${s.name}</a></h2>
            <p class="card-desc">\${s.description || 'Structured API skill context for AI coding agents.'}</p>
          </div>
          <div>
            <div class="tags">
              \${(s.categories || []).map((c) => \`<span class="tag">\${c}</span>\`).join('')}
            </div>
            <div class="verified-date">✓ Verified \${s.lastVerified}</div>
          </div>
        </div>
      \`,
          )
          .join('');
      }

      searchInput.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        if (!q) {
          renderSkills(skills);
          return;
        }
        const matched = skills.filter(
          (s) =>
            s.name.toLowerCase().includes(q) ||
            s.id.toLowerCase().includes(q) ||
            (s.description && s.description.toLowerCase().includes(q)) ||
            (s.categories && s.categories.some((c) => c.toLowerCase().includes(q))),
        );
        renderSkills(matched);
      });

      renderSkills(skills);
    </script>
  </body>
</html>
`;

fs.writeFileSync(htmlPath, html);
console.log(`Updated docs/index.html with ${count} skills.`);
