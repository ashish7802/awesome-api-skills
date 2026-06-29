import Typesense from 'typesense';
const client = new Typesense.Client({ nodes: [{ host: 'localhost', port: '8108', protocol: 'http' }], apiKey: 'xyz' });
await client.collections().create({ name: 'books', fields: [{ name: 'title', type: 'string' }] });