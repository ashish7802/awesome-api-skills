import { trace } from '@opentelemetry/api';
const tracer = trace.getTracer('my-service');

async function doWork() {
  await tracer.startActiveSpan('manual-span', async (span) => {
    try {
      // execute logic
      span.setAttribute('user.id', 123);
    } finally {
      span.end();
    }
  });
}