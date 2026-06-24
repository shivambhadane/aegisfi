from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from model import fraud_model

app = FastAPI(title="AEGIS-FI Sentinel Agent")

class TransactionFeatures(BaseModel):
    Amount: float
    V1: float = 0.0
    V2: float = 0.0
    V3: float = 0.0
    V4: float = 0.0
    V5: float = 0.0
    V6: float = 0.0
    V7: float = 0.0
    V8: float = 0.0
    V9: float = 0.0
    V10: float = 0.0
    V11: float = 0.0
    V12: float = 0.0
    V13: float = 0.0
    V14: float = 0.0
    V15: float = 0.0
    V16: float = 0.0
    V17: float = 0.0
    V18: float = 0.0
    V19: float = 0.0
    V20: float = 0.0
    V21: float = 0.0
    V22: float = 0.0
    V23: float = 0.0
    V24: float = 0.0
    V25: float = 0.0
    V26: float = 0.0
    V27: float = 0.0
    V28: float = 0.0

@app.post("/score")
def get_risk_score(features: TransactionFeatures):
    # Predict using the loaded Isolation Forest
    result = fraud_model.predict(features.model_dump())
    return result

@app.get("/sample")
def get_sample():
    # Return a random transaction sample with V1-V28 and Amount
    return fraud_model.get_sample()

@app.get("/health")
def health_check():
    return {"status": "ok", "model_trained": fraud_model.is_trained}
