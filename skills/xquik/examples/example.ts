import { XquikClient } from 'x-twitter-scraper';

const client = new XquikClient({
  apiKey: process.env.XQUIK_API_KEY || 'your-api-key'
});
