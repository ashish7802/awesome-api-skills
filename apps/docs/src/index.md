---
layout: home

hero:
  name: 'Stop Guessing APIs'
  text: 'Skills Your AI Agent Can Trust'
  tagline: '116 verified, structured skill specifications with anti-hallucination pitfalls, production checklists, and an interconnected knowledge graph for Claude Code, Cursor, Cline & Continue.'
  actions:
    - theme: brand
      text: Browse 116 Skills →
      link: /skills/
    - theme: alt
      text: ⚡ Skill Studio Playground
      link: /playground
    - theme: alt
      text: 🕸 Knowledge Graph
      link: /graph

features:
  - title: 🛡️ Anti-Hallucination Pitfalls
    details: Explicitly documents common failure modes — deprecated methods, missing raw body buffers on webhook signatures, and incorrect SDK initializers.
  - title: 🕸️ Relational Knowledge Graph
    details: Connects 116 skills with 248 edges showing prerequisite dependencies, alternatives, and production technology stacks.
  - title: 🤖 Multi-Agent Compatibility
    details: Pure markdown SKILL.md standard native to Cursor, Claude Code, Cline, and Continue. Zero runtime lock-in.
---

<div class="dark-showcase">
  <div class="stats-ticker">
    <div class="stat-pill"><span class="stat-num">116</span><span class="stat-txt">Verified Skills</span></div>
    <div class="stat-divider"></div>
    <div class="stat-pill"><span class="stat-num">248</span><span class="stat-txt">Graph Edges</span></div>
    <div class="stat-divider"></div>
    <div class="stat-pill"><span class="stat-num">100%</span><span class="stat-txt">Schema Validated</span></div>
    <div class="stat-divider"></div>
    <div class="stat-pill"><span class="stat-num">&lt; 16ms</span><span class="stat-txt">Lookup Latency</span></div>
  </div>

  <div class="terminal-showcase">
    <div class="terminal-bar">
      <div class="terminal-dots">
        <span class="dot red"></span>
        <span class="dot yellow"></span>
        <span class="dot green"></span>
      </div>
      <span class="terminal-title">bash — npx @awesome-api-skills/cli</span>
    </div>
    <div class="terminal-body">
      <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">npx @awesome-api-skills/cli search "vector embeddings rag"</span></div>
      <div class="terminal-output"><span class="term-success">✔ Found 6 matching production skills:</span></div>
      <div class="terminal-output">  • <span class="term-hi">qdrant</span> (v1.0.0) — Vector similarity search engine & RAG pipelines</div>
      <div class="terminal-output">  • <span class="term-hi">deepseek</span> (v1.0.0) — DeepSeek-R1 reasoning & DeepSeek-V3 models</div>
      <div class="terminal-output">  • <span class="term-hi">openai</span> (v1.0.0) — Text embeddings & structured responses</div>
      <div class="terminal-output">  • <span class="term-hi">weaviate</span> (v1.0.0) — Hybrid keyword + vector generative search</div>
      <div class="terminal-line"><span class="term-prompt">$</span> <span class="term-cmd">npx @awesome-api-skills/cli validate</span></div>
      <div class="terminal-output"><span class="term-success">✔ Skill Schema Validation — 116 skills checked. All conform to SKILL.md v1.0.</span></div>
    </div>
  </div>
</div>

<div class="home-bottom-cta">
  <h3>Ready to equip your AI agent?</h3>
  <p>Stop fixing hallucinated endpoints and start shipping with verified specifications.</p>
  <div class="cta-links">
    <a class="cta-btn primary" href="/skills/">Explore All Skills →</a>
    <a class="cta-btn secondary" href="/playground">Test in Playground</a>
    <a class="cta-btn secondary" href="/graph">View Knowledge Graph</a>
  </div>
</div>

<style>
.dark-showcase {
  max-width: 880px;
  margin: 32px auto 48px;
}
.stats-ticker {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px 20px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
.stat-pill {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.stat-num {
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--vp-c-brand-1);
  font-family: var(--vp-font-family-mono);
}
.stat-txt {
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stat-divider {
  width: 1px;
  height: 28px;
  background: var(--vp-c-divider);
}
.terminal-showcase {
  background: #060a12;
  border: 1px solid var(--vp-c-divider);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(56, 189, 248, 0.08);
}
.terminal-bar {
  display: flex;
  align-items: center;
  padding: 10px 14px;
  background: #0d1424;
  border-bottom: 1px solid var(--vp-c-divider);
}
.terminal-dots {
  display: flex;
  gap: 6px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.dot.red { background: #f43f5e; }
.dot.yellow { background: #f59e0b; }
.dot.green { background: #10b981; }
.terminal-title {
  margin-left: 14px;
  font-size: 0.76rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-3);
}
.terminal-body {
  padding: 16px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.84rem;
  line-height: 1.65;
  color: #f8fafc;
}
.term-prompt {
  color: #38bdf8;
  font-weight: 700;
}
.term-cmd {
  color: #f8fafc;
}
.term-success {
  color: #34d399;
  font-weight: 600;
}
.term-hi {
  color: #60a5fa;
  font-weight: 600;
}
.terminal-line {
  margin-top: 6px;
}
.terminal-line:first-child {
  margin-top: 0;
}
.terminal-output {
  color: var(--vp-c-text-2);
}
.home-bottom-cta {
  text-align: center;
  padding: 48px 20px;
  margin: 48px auto;
  max-width: 680px;
  background: radial-gradient(circle at center, rgba(56, 189, 248, 0.08) 0%, rgba(9, 13, 22, 0) 70%);
}
.home-bottom-cta h3 {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: var(--vp-c-text-1);
}
.home-bottom-cta p {
  color: var(--vp-c-text-2);
  margin-bottom: 24px;
}
.cta-links {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}
.cta-btn {
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.92rem;
  text-decoration: none !important;
  transition: all 0.2s ease;
}
.cta-btn.primary {
  background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
  color: #ffffff !important;
  border: 1px solid rgba(56, 189, 248, 0.4);
  box-shadow: 0 4px 12px rgba(2, 132, 199, 0.3);
}
.cta-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(56, 189, 248, 0.4);
}
.cta-btn.secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
}
.cta-btn.secondary:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1) !important;
}
</style>
