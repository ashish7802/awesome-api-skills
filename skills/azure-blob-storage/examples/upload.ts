import { BlobServiceClient } from '@azure/storage-blob';
const client = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const blockBlobClient = client.getContainerClient('uploads').getBlockBlobClient('file.txt');
await blockBlobClient.uploadData(Buffer.from('Hello'));