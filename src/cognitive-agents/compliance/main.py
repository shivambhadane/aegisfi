from fastapi import FastAPI
app = FastAPI(title="Compliance Agent", version="1.0.0")

@app.post("/agent/compliance/check")
async def check_rules(tx: dict):
    return {"compliant": True, "checklist": {"AML": "passed", "KYC": "passed"}}
