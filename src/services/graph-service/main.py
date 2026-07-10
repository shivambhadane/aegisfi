from fastapi import FastAPI
app = FastAPI(title="Graph Service", version="1.0.0")

@app.get("/v1/graph/entity/{entity_id}/neighbors")
async def get_neighbors(entity_id: str):
    return {"entity_id": entity_id, "relationships": []}
