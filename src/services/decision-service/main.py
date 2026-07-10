from fastapi import FastAPI
app = FastAPI(title="Decision Service", version="1.0.0")

@app.post("/v1/decision/recommend")
async def recommend_action(decision: dict):
    return {"recommendation": "allow", "confidence": 0.99}
