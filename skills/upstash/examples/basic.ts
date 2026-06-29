import { Redis } from '@upstash/redis';
const redis = new Redis({ url: 'URL', token: 'TOKEN' });
await redis.set('key', 'value', { ex: 3600 });