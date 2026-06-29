const client = createClient({ url: 'file:local.db', syncUrl: 'libsql://...', authToken: '...' });
await client.sync();