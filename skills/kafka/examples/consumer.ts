const consumer = kafka.consumer({ groupId: 'group1' });
await consumer.connect();
await consumer.subscribe({ topic: 'test', fromBeginning: true });
await consumer.run({ eachMessage: async ({ message }) => console.log(message.value.toString()) });