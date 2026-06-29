// Backend
const route = app.post('/posts', (c) => c.json({ id: 1 }));
export type AppType = typeof route;

// Frontend
import { hc } from 'hono/client';
const client = hc<AppType>('http://localhost');