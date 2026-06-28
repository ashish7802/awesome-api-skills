import algoliasearch from 'algoliasearch';
const client = algoliasearch('APP_ID', 'ADMIN_KEY');
const index = client.initIndex('contacts');