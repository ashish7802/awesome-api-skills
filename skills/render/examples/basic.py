import requests
res = requests.post("https://api.render.com/v1/services/srv-123/deploys", headers={"Authorization": f"Bearer {token}"})