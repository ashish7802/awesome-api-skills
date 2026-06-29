const js = nc.jetstream();
await js.publish('orders.new', sc.encode('order1'));