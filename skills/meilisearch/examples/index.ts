import { MeiliSearch } from 'meilisearch';
const client = new MeiliSearch({ host: 'http://127.0.0.1:7700', apiKey: 'MASTER_KEY' });
await client.index('movies').addDocuments([{ id: 1, title: 'Batman' }]);