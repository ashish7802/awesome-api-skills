import { Paddle, Environment } from '@paddle/paddle-node';
const paddle = new Paddle('API_KEY', { environment: Environment.sandbox });
const customer = await paddle.customers.create({ email: 'test@example.com' });