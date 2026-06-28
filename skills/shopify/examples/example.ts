import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
const shopify = shopifyApi({ apiVersion: LATEST_API_VERSION, isCustomStoreApp: true, adminApiAccessToken: 'token' });