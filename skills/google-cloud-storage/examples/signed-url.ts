import { Storage } from '@google-cloud/storage';
const storage = new Storage();
const [url] = await storage.bucket('my-bucket').file('img.png').getSignedUrl({ version: 'v4', action: 'write', expires: Date.now() + 15 * 60 * 1000, contentType: 'image/png' });