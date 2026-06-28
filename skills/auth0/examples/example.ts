import { ManagementClient } from 'auth0';
const auth0 = new ManagementClient({ domain: 'd.auth0.com', clientId: 'ID', clientSecret: 'SECRET' });