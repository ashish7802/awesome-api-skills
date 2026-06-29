import requests
res = requests.post("https://api.paddle.com/customers", headers={"Authorization": f"Bearer {key}"})