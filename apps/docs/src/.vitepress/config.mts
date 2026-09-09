import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Awesome API Skills',
  description: 'Structured API skills for AI coding agents.',
  cleanUrls: true,
  ignoreDeadLinks: true,
  head: [
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Awesome API Skills' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
  ],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Skills', link: '/skills/' },
      { text: 'Playground', link: '/playground' },
      { text: 'Graph', link: '/graph' },
      { text: 'CLI', link: '/docs/cli' },
      { text: 'Spec', link: '/docs/specification' },
    ],
    search: {
      provider: 'local',
      options: {
        detailedView: true,
      },
    },
    sidebar: {
      '/skills/': [
        {
          text: 'Discover',
          items: [
            { text: 'All skills', link: '/skills/' },
            { text: 'Categories', link: '/skills/categories' },
            { text: 'Playground', link: '/playground' },
          ],
        },
        {
          text: 'Popular',
          items: [
            { text: 'stripe', link: '/skills/stripe' },
            { text: 'nextjs', link: '/skills/nextjs' },
            { text: 'postgresql', link: '/skills/postgresql' },
            { text: 'openai', link: '/skills/openai' },
            { text: 'vercel', link: '/skills/vercel' },
          ],
        },
      ],
      '/docs/': [
        {
          text: 'Guide & Tooling',
          items: [
            { text: 'Overview', link: '/docs/overview' },
            { text: 'Playground', link: '/playground' },
            { text: 'Knowledge Graph', link: '/graph' },
            { text: 'CLI Reference', link: '/docs/cli' },
            { text: 'SDK Guide', link: '/docs/sdk' },
            { text: 'Registry & Graph', link: '/docs/registry' },
            { text: 'Validation Engine', link: '/docs/validator' },
            { text: 'Generator & Exporters', link: '/docs/generator' },
            { text: 'Specification', link: '/docs/specification' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ashish7802/awesome-api-skills' }],
  },
  outDir: '../../dist',
  vite: {
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
    },
  },
});
