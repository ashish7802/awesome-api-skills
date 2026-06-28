import * as okta from '@okta/okta-sdk-nodejs';
const client = new okta.Client({ orgUrl: 'https://dev.okta.com', token: 'TOKEN' });