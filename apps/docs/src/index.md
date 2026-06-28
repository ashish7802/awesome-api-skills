---
layout: home

hero:
  name: "Awesome API Skills"
  text: "Universal Standard for AI Agents"
  tagline: "The production-grade ecosystem for defining, validating, and sharing API skills across any LLM or Agent architecture."
  actions:
    - theme: brand
      text: Get Started
      link: /docs/cli
    - theme: alt
      text: View Specification
      link: /docs/specification

features:
  - title: Model Agnostic
    details: Works with OpenAI, Anthropic, Gemini, local models, and any future architecture.
  - title: Type Safe Validation
    details: Instant schema validation ensures zero hallucinated parameter types.
  - title: Decentralized Registry
    details: Publish to the global registry or host an enterprise-grade private registry.
---

<div class="stats-container">
  <h2>Live Statistics</h2>
  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">1,010</div>
      <div class="stat-label">Total Skills</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">3</div>
      <div class="stat-label">Supported Agents</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">6</div>
      <div class="stat-label">Registries Configured</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">< 10ms</div>
      <div class="stat-label">Avg CLI Resolution</div>
    </div>
  </div>
</div>

<div class="installation">
  <h2>Quick Start</h2>
  <div class="language-bash">
    <button title="Copy Code" class="copy"></button>
    <span class="lang">bash</span>
    <pre><code>npm install -g @awesome-api-skills/cli
awesome-api init
awesome-api search stripe</code></pre>
  </div>
</div>

<style>
.stats-container { margin: 60px 0; text-align: center; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-top: 30px; }
.stat-card { padding: 24px; border: 1px solid var(--vp-c-divider); border-radius: 8px; background: var(--vp-c-bg-soft); }
.stat-value { font-size: 32px; font-weight: 800; color: var(--vp-c-brand-1); }
.stat-label { font-size: 14px; color: var(--vp-c-text-2); margin-top: 8px; font-weight: 500; }
.installation { margin: 60px 0; max-width: 600px; margin-inline: auto; text-align: center; }
</style>