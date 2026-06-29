import Redis from 'ioredis';
const redis = new Redis();

// Add to stream
await redis.xadd('mystream', 'MAXLEN', '~', 1000, '*', 'event', 'signup', 'user_id', 1);

// Read as group
const messages = await redis.xreadgroup('GROUP', 'mygroup', 'consumer1', 'BLOCK', 2000, 'STREAMS', 'mystream', '>');