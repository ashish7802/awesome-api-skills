import { createClient } from '@libsql/client';
const client = createClient({ url: process.env.TURSO_URL, authToken: process.env.TURSO_TOKEN });
await client.execute('SELECT * FROM users');