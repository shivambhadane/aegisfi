from fastapi import FastAPI
app = FastAPI(title="Governance Agent", version="1.0.0")

@app.post("/agent/governance/audit")
async def audit_decision(decision: dict):
    return {"audited": True, "bias_flag": False}
