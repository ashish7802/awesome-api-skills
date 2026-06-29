import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'Awesome API Skills',
  description: 'The universal standard for integrating APIs into AI agents.',
  cleanUrls: true,
  sitemap: {
    hostname: 'https://awesome.api',
  },
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
      { text: 'CLI', link: '/docs/cli' },
      { text: 'SDK', link: '/docs/sdk' },
      { text: 'Registry', link: '/docs/registry' },
      { text: 'Validator', link: '/docs/validator' },
      { text: 'Generator', link: '/docs/generator' },
      { text: 'Specification', link: '/docs/specification' },
      { text: 'Playground', link: '/playground' },
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
          text: 'Skills Collection',
          items: [
            { text: 'Overview', link: '/skills/' },
            { text: 'Providers', link: '/skills/providers' },
            { text: 'Categories', link: '/skills/categories' },
            { text: 'Languages', link: '/skills/languages' },
          ],
        },
      ],
      '/docs/': [
        {
          text: 'Core Platform',
          items: [
            { text: 'Overview', link: '/docs/overview' },
            { text: 'CLI', link: '/docs/cli' },
            { text: 'SDK', link: '/docs/sdk' },
            { text: 'Registry', link: '/docs/registry' },
            { text: 'Validator', link: '/docs/validator' },
            { text: 'Generator', link: '/docs/generator' },
          ],
        },
        {
          text: 'Specification',
          items: [{ text: 'v1.0.0', link: '/docs/specification' }],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/awesome-api-skills' }],
  },
  vite: {
    server: {
      port: 5173,
      strictPort: true,
    },
  },
});
