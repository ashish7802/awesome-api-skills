from fastapi import FastAPI, Depends, HTTPException
from pydantic import BaseModel
app = FastAPI()

class Item(BaseModel):
  name: str

@app.post('/items/')
async def create_item(item: Item):
  return item