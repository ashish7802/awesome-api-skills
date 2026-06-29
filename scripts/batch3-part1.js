const { buildSkillV3 } = require('./build-skill-v3');

buildSkillV3({
  name: 'nextjs',
  displayName: 'Next.js',
  description: 'The React Framework for the Web.',
  categories: ['Frontend Frameworks'],
  learningLevel: 'advanced',
  useCases: ['Full Stack Apps', 'SEO', 'E-commerce'],
  deploymentTargets: ['vercel', 'docker', 'cloudflare', 'aws-s3'],
  ecosystem: 'react',
  maintainers: ['vercel'],
  stability: 'production',
  relationships: [
    { target: 'react', type: 'depends_on' },
    { target: 'vercel', type: 'deploys_to' },
    { target: 'clerk', type: 'authenticates_with' },
    { target: 'nuxt', type: 'alternative_to' },
    { target: 'trpc', type: 'works_well_with' },
  ],
  quickStart:
    'Next.js 14+ emphasizes the App Router and React Server Components. Server Components execute exclusively on the server, drastically reducing client-side JavaScript bundles.\n\n```bash\nnpx create-next-app@latest\n```',
  productionPatterns:
    '### Cache Invalidation\nThe App Router aggressively caches data. Do not rely on time-based revalidation (`revalidate: 60`) for highly dynamic, user-specific data. Instead, use On-Demand Revalidation (`revalidateTag` or `revalidatePath`) triggered directly from your Server Actions after a database mutation.',
  architecture:
    "### Edge vs Node.js Runtimes\nNext.js allows specifying `export const runtime = 'edge'` on a per-route basis. The Edge runtime boots in milliseconds but strictly prohibits native Node.js APIs (like `fs` or `crypto`). For heavy backend processing, stick to the default Node.js runtime.",
  errorRecovery:
    'Use `error.tsx` at the segment level to catch unexpected runtime errors in Server Components. For expected validation errors during form submissions, return strongly-typed error objects from your Server Action rather than throwing exceptions.',
  securityNotes:
    'Never expose environment variables to the browser unless they are strictly prefixed with `NEXT_PUBLIC_`. Treat Server Actions exactly like public API endpoints; always verify the user session (e.g., via Clerk `auth()`) inside the action before mutating data.',
  links: { 'App Router Docs': 'https://nextjs.org/docs' },
  examples: {
    typescript: {
      'server-action': `// app/actions.ts\n'use server';\nimport { revalidatePath } from 'next/cache';\nexport async function updateName(formData: FormData) {\n  const name = formData.get('name');\n  await db.update(name);\n  revalidatePath('/profile');\n}`,
      'server-component': `// app/page.tsx\nexport default async function Page() {\n  const data = await fetch('https://api.com', { next: { tags: ['data'] } }).then(r => r.json());\n  return <div>{data.title}</div>;\n}`,
      'error-boundary': `// app/error.tsx\n'use client';\nexport default function Error({ error, reset }: { error: Error, reset: () => void }) {\n  return <button onClick={() => reset()}>Try again</button>;\n}`,
    },
    python: { 'not-applicable': `// Next.js is strictly JavaScript/TypeScript` },
    go: { 'not-applicable': `// Next.js is strictly JavaScript/TypeScript` },
  },
});

buildSkillV3({
  name: 'react',
  displayName: 'React',
  description: 'The library for web and native user interfaces.',
  categories: ['Frontend Frameworks'],
  learningLevel: 'intermediate',
  useCases: ['SPA', 'UI Components'],
  deploymentTargets: ['aws-s3', 'vercel', 'cloudflare'],
  ecosystem: 'javascript',
  maintainers: ['meta'],
  stability: 'production',
  relationships: [
    { target: 'nextjs', type: 'extended_by' },
    { target: 'vue', type: 'alternative_to' },
    { target: 'sveltekit', type: 'alternative_to' },
  ],
  quickStart:
    'React 18 introduced concurrent rendering. While you can build raw SPAs, the React team officially recommends utilizing full-stack frameworks (Next.js, Remix) to handle routing, data fetching, and SSR.\n\n```bash\nnpm install react react-dom\n```',
  productionPatterns:
    '### Custom Hooks\nAbstract complex component logic into custom hooks (`useAuth`, `useTable`). This decouples UI from business logic, making the hooks highly testable independently of the DOM.',
  architecture:
    '### Context vs State Managers\nDo not use React Context for rapidly changing, high-frequency state (like mouse coordinates or typing inputs), as it forces a re-render of all consuming components. Use Zustand or Redux for complex global state, and Context strictly for static/slow-changing data (Themes, Auth Tokens).',
  errorRecovery:
    'Wrap critical UI sections in Error Boundaries to prevent a single component crash from unmounting the entire application tree.',
  securityNotes:
    'React natively escapes string variables to prevent XSS. However, using `dangerouslySetInnerHTML` bypasses this protection. Always sanitize HTML on the server or use a library like `DOMPurify` before injecting raw HTML.',
  links: { 'React.dev': 'https://react.dev/' },
  examples: {
    typescript: {
      hook: `import { useState, useEffect } from 'react';\nexport function useWindowWidth() {\n  const [width, setWidth] = useState(0);\n  useEffect(() => {\n    const handle = () => setWidth(window.innerWidth);\n    window.addEventListener('resize', handle);\n    return () => window.removeEventListener('resize', handle);\n  }, []);\n  return width;\n}`,
      context: `import { createContext, useContext } from 'react';\nconst ThemeCtx = createContext('light');\nexport const useTheme = () => useContext(ThemeCtx);`,
      memo: `import { memo } from 'react';\nexport const HeavyComponent = memo(function Heavy({ data }: { data: any }) {\n  return <div>{data}</div>;\n});`,
    },
  },
});

buildSkillV3({
  name: 'vue',
  displayName: 'Vue',
  description: 'The Progressive JavaScript Framework.',
  categories: ['Frontend Frameworks'],
  learningLevel: 'intermediate',
  useCases: ['SPA', 'Interactive UI'],
  deploymentTargets: ['vercel', 'netlify', 'aws-s3'],
  ecosystem: 'javascript',
  maintainers: ['evan-you'],
  stability: 'production',
  relationships: [
    { target: 'nuxt', type: 'extended_by' },
    { target: 'react', type: 'alternative_to' },
    { target: 'supabase', type: 'works_well_with' },
  ],
  quickStart:
    'Vue 3 utilizes the Composition API, offering a highly logical and reactive way to structure components compared to the legacy Options API.\n\n```bash\nnpm create vue@latest\n```',
  productionPatterns:
    "### Composables\nVue's equivalent to React hooks. Use `ref` and `computed` inside standalone JavaScript functions to encapsulate and reuse stateful logic across multiple `.vue` components.",
  architecture:
    "### Reactivity System\nVue 3 uses JavaScript Proxies for reactivity. This means modifying nested properties of a `reactive` object works seamlessly without needing immutable state replacement (unlike React's `setState`).",
  errorRecovery:
    'Utilize `onErrorCaptured` at the layout level to catch and log errors thrown by descendant components gracefully.',
  securityNotes:
    'Be extremely cautious with the `v-html` directive. It renders raw HTML directly to the DOM and is a primary vector for XSS attacks if the input is not strictly sanitized.',
  links: { 'Vue Docs': 'https://vuejs.org/guide/introduction.html' },
  examples: {
    typescript: {
      composable: `import { ref, onMounted, onUnmounted } from 'vue';\nexport function useMouse() {\n  const x = ref(0);\n  const y = ref(0);\n  function update(e: MouseEvent) { x.value = e.pageX; y.value = e.pageY; }\n  onMounted(() => window.addEventListener('mousemove', update));\n  onUnmounted(() => window.removeEventListener('mousemove', update));\n  return { x, y };\n}`,
      component: `<script setup>\nimport { useMouse } from './useMouse'\nconst { x, y } = useMouse()\n</script>\n<template>Mouse is at {{ x }}, {{ y }}</template>`,
    },
  },
});

buildSkillV3({
  name: 'nuxt',
  displayName: 'Nuxt',
  description: 'The Intuitive Vue Framework.',
  categories: ['Frontend Frameworks'],
  learningLevel: 'advanced',
  useCases: ['SSR', 'SSG', 'SEO'],
  deploymentTargets: ['vercel', 'docker', 'render'],
  ecosystem: 'vue',
  maintainers: ['nuxt'],
  stability: 'production',
  relationships: [
    { target: 'vue', type: 'depends_on' },
    { target: 'nextjs', type: 'alternative_to' },
    { target: 'vercel', type: 'deploys_to' },
  ],
  quickStart:
    'Nuxt 3 is the enterprise Vue framework, featuring Nitro (an ultra-fast server engine) and automatic component importing.\n\n```bash\nnpx nuxi@latest init my-app\n```',
  productionPatterns:
    '### Server API Routes\nNuxt provides a `server/api` directory. Functions exported here are automatically mapped to `/api/*` endpoints. Use these routes to hide database credentials and interact securely with APIs like Stripe or Neon.',
  architecture:
    '### Universal Rendering\nBy default, Nuxt executes code on both the server (for SSR HTML generation) and the client (hydration). Always guard browser-specific APIs (like `window.localStorage`) by wrapping them in `if (import.meta.client)`.',
  errorRecovery:
    "Use the `app.vue` `NuxtErrorBoundary` component to isolate crashes. For server-side API errors, return `createError({ statusCode: 400, statusMessage: 'Invalid' })`.",
  securityNotes:
    'Ensure sensitive tokens (like a Stripe Secret Key) are placed in the `runtimeConfig` without exposing them in the `public` sub-object.',
  links: { 'Nuxt Docs': 'https://nuxt.com/docs' },
  examples: {
    typescript: {
      'api-route': `// server/api/hello.ts\nexport default defineEventHandler((event) => {\n  return { hello: 'world' }\n})`,
      'data-fetch': `<script setup>\nconst { data, pending, error } = await useFetch('/api/hello')\n</script>\n<template>\n  <div v-if="pending">Loading...</div>\n  <div v-else>{{ data }}</div>\n</template>`,
    },
  },
});

buildSkillV3({
  name: 'sveltekit',
  displayName: 'SvelteKit',
  description: 'Web development, streamlined.',
  categories: ['Frontend Frameworks'],
  learningLevel: 'intermediate',
  useCases: ['SSR', 'Performance'],
  deploymentTargets: ['vercel', 'docker', 'cloudflare'],
  ecosystem: 'svelte',
  maintainers: ['rich-harris'],
  stability: 'production',
  relationships: [
    { target: 'nextjs', type: 'alternative_to' },
    { target: 'vercel', type: 'deploys_to' },
  ],
  quickStart:
    'SvelteKit compiles away the framework. Instead of a virtual DOM, it generates highly optimized vanilla JavaScript. It uses a file-based routing system (e.g., `+page.svelte` and `+page.server.ts`).\n\n```bash\nnpm create svelte@latest my-app\n```',
  productionPatterns:
    '### Form Actions\nSvelteKit heavily utilizes native HTML forms for mutations. Write a `default` action in `+page.server.ts` to handle POST requests, interact with your database, and return validation errors seamlessly without requiring client-side `fetch`.',
  architecture:
    '### Load Functions\nUse `+page.server.ts` to export a `load` function. This function runs strictly on the server, fetching database records securely, and passes the resolved props directly to the `+page.svelte` component during SSR.',
  errorRecovery:
    "Throw `error(404, 'Not found')` from your load functions. SvelteKit automatically renders the nearest `+error.svelte` boundary.",
  securityNotes:
    'Form actions automatically protect against CSRF attacks. Do not disable this protection unless building a public API endpoint, in which case you should use a `+server.ts` standalone route.',
  links: { 'SvelteKit Docs': 'https://kit.svelte.dev/docs' },
  examples: {
    typescript: {
      load: `// +page.server.ts\nexport const load = async ({ fetch }) => {\n  const res = await fetch('/api/data');\n  return { data: await res.json() };\n}`,
      action: `// +page.server.ts\nexport const actions = {\n  default: async ({ request }) => {\n    const data = await request.formData();\n    console.log(data.get('email'));\n    return { success: true };\n  }\n};`,
      component: `<!-- +page.svelte -->\n<script>\n  export let data;\n  export let form;\n</script>\n<form method="POST">\n  <input name="email" type="email" />\n  <button>Submit</button>\n</form>`,
    },
  },
});
