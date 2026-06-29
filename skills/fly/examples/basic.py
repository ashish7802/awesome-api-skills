import requests
res = requests.post("https://api.machines.dev/v1/apps/app/machines", headers={"Authorization": f"Bearer {token}"})