import requests
res = requests.post("https://api.digitalocean.com/v2/droplets", headers={"Authorization": f"Bearer {token}"})