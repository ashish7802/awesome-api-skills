import requests
res = requests.get("https://api.lemonsqueezy.com/v1/stores", headers={"Authorization": f"Bearer {key}"})