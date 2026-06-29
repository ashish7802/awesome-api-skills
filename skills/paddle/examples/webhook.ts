const event = paddle.webhooks.unmarshal(req.body, req.headers['paddle-signature'], 'WEBHOOK_SECRET');
if (event.eventType === 'subscription.activated') console.log('Active!');