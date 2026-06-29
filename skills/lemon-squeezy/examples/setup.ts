import { lemonSqueezySetup, getStore } from '@lemonsqueezy/lemonsqueezy.js';
lemonSqueezySetup({ apiKey: process.env.LS_API_KEY });
const { data, error } = await getStore(12345);