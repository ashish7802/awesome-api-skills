import asyncio
import nats
async def main():
  nc = await nats.connect("localhost")
  await nc.publish("updates", b'hello')