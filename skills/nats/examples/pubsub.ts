import { connect, StringCodec } from 'nats';
const nc = await connect({ servers: 'nats://localhost:4222' });
const sc = StringCodec();
nc.publish('updates', sc.encode('hello'));