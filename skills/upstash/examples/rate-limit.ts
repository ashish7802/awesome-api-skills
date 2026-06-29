import { Ratelimit } from '@upstash/ratelimit';
const ratelimit = new Ratelimit({ redis: Redis.fromEnv(), limiter: Ratelimit.slidingWindow(10, "10 s") });