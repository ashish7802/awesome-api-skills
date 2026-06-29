import { Pinecone } from '@pinecone-database/pinecone';
const pc = new Pinecone();
const index = pc.Index('docs');
await index.upsert([{ id: 'vec1', values: [0.1, 0.2, 0.3], metadata: { type: 'pdf' } }]);