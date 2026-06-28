import * as Sentry from '@sentry/node';
Sentry.init({ dsn: 'https://xxx@sentry.io/123', environment: 'production' });