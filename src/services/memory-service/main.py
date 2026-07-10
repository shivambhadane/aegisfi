from fastapi import FastAPI
app = FastAPI(title="Memory Service", version="1.0.0")

@app.post("/v1/memory/search")
async def search_memory(query: dict):
    return {"results": []}
