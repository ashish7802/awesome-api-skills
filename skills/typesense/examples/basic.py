import typesense
client = typesense.Client({'nodes': [{'host': 'localhost', 'port': '8108', 'protocol': 'http'}], 'api_key': 'xyz'})