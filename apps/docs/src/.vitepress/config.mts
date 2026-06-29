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
          text: 'Guide',
          items: [
            { text: 'Overview', link: '/docs/overview' },
            { text: 'CLI', link: '/docs/cli' },
            { text: 'Graph', link: '/graph' },
            { text: 'Specification', link: '/docs/specification' },
          ],
        },
      ],
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/ashish7802/awesome-api-skills' }],
  },
  vite: {
    server: {
      port: 5173,
      strictPort: true,
    },
  },
});
