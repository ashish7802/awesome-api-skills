import requests
res = requests.get("https://api.revenuecat.com/v1/subscribers/user_123", headers={"Authorization": f"Bearer {secret}"})