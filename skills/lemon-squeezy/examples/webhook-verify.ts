import crypto from 'crypto';
const secret = 'WEBHOOK_SECRET';
const hmac = crypto.createHmac('sha256', secret);
const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');
const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');