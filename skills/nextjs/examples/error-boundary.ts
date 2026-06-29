// app/error.tsx
'use client';
export default function Error({ error, reset }: { error: Error, reset: () => void }) {
  return <button onClick={() => reset()}>Try again</button>;
}