from pinecone import Pinecone
pc = Pinecone(api_key="xxx")
index = pc.Index("docs")
index.upsert(vectors=[{"id":"vec1", "values":[0.1, 0.2]}])