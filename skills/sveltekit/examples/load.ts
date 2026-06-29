// +page.server.ts
export const load = async ({ fetch }) => {
  const res = await fetch('/api/data');
  return { data: await res.json() };
}