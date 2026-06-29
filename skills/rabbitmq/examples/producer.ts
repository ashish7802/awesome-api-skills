import amqp from 'amqplib';
const conn = await amqp.connect('amqp://localhost');
const ch = await conn.createChannel();
await ch.assertQueue('tasks', { durable: true });
ch.sendToQueue('tasks', Buffer.from('work'), { persistent: true });