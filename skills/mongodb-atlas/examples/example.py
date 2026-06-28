from requests.auth import HTTPDigestAuth
import requests
res = requests.get(url, auth=HTTPDigestAuth('public', 'private'))