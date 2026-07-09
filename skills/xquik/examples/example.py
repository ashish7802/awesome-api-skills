import os
from x_twitter_scraper import XquikClient

client = XquikClient(
    api_key=os.environ.get("XQUIK_API_KEY", "your-api-key")
)
