from google.cloud import storage
client = storage.Client()
bucket = client.bucket('my-bucket')