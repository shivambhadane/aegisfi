from fastapi import FastAPI
app = FastAPI(title="DNA Service", version="1.0.0")

@app.get("/v1/dna/{entity_type}/{entity_id}")
async def get_profile(entity_type: str, entity_id: str):
    return {"entity_id": entity_id, "entity_type": entity_type, "trust_score": 90}
