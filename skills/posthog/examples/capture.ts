import { PostHog } from 'posthog-node';
const posthog = new PostHog('phc_123', { host: 'https://app.posthog.com' });
posthog.capture({ distinctId: 'user_123', event: 'Order Completed', properties: { total: 49.99 } });