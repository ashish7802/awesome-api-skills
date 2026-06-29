// app/page.tsx
export default async function Page() {
  const data = await fetch('https://api.com', { next: { tags: ['data'] } }).then(r => r.json());
  return <div>{data.title}</div>;
}