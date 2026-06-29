from upstash_redis import Redis
redis = Redis(url="URL", token="TOKEN")
redis.set("key", "value")