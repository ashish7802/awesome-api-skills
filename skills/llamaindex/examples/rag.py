from llama_index.core import VectorStoreIndex, SimpleDirectoryReader

# Ingest data
documents = SimpleDirectoryReader('data').load_data()
index = VectorStoreIndex.from_documents(documents)

# Query data
query_engine = index.as_query_engine()
response = query_engine.query("What did the author do growing up?")
print(response)