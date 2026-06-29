import { Queue, Worker } from 'bullmq';
const myQueue = new Queue('Paint', { connection: { host: 'localhost' } });
await myQueue.add('car', { color: 'red' });

const worker = new Worker('Paint', async job => {
  console.log(job.data.color);
}, { connection: { host: 'localhost' } });