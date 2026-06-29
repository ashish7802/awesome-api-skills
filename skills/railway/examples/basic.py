import requests
res = requests.post('https://backboard.railway.app/graphql/v2', headers={"Authorization": f"Bearer {token}"}, json={"query": "..."})