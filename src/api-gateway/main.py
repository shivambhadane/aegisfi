from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine, get_db

# Create all tables in the database
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AEGIS-FI API")

# Configure CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins for MVP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import requests

class TransactionCreate(BaseModel):
    amount: float
    currency: str = "USD"
    # Additional features for Sentinel Agent
    v1: float = 0.0
    v2: float = 0.0
    v3: float = 0.0
    v4: float = 0.0
    v5: float = 0.0
    v6: float = 0.0
    v7: float = 0.0
    v8: float = 0.0
    v9: float = 0.0
    v10: float = 0.0
    v11: float = 0.0
    v12: float = 0.0
    v13: float = 0.0
    v14: float = 0.0
    v15: float = 0.0
    v16: float = 0.0
    v17: float = 0.0
    v18: float = 0.0
    v19: float = 0.0
    v20: float = 0.0
    v21: float = 0.0
    v22: float = 0.0
    v23: float = 0.0
    v24: float = 0.0
    v25: float = 0.0
    v26: float = 0.0
    v27: float = 0.0
    v28: float = 0.0

class TransactionResponse(BaseModel):
    id: int
    amount: float
    currency: str
    status: str
    risk_score: int
    timestamp: datetime

    class Config:
        from_attributes = True

@app.post("/transactions", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    # 1. Call Sentinel Agent for Risk Score
    risk_score = 0
    status = "COMPLETED"
    
    try:
        # Prepare payload mapping v1 to V1
        payload = {
            "Amount": transaction.amount,
        }
        for i in range(1, 29):
            payload[f"V{i}"] = getattr(transaction, f"v{i}")

        response = requests.post("http://localhost:8001/score", json=payload)
        if response.ok:
            result = response.json()
            risk_score = result.get("risk_score", 0)
            status = "FLAGGED" if result.get("status") == "HIGH" else "COMPLETED"
    except Exception as e:
        print(f"Error calling Sentinel Agent: {e}")
        status = "PENDING"

    # 2. Save to DB
    # We don't save V1-V28 to the DB in this MVP to keep it simple, just the core fields
    db_transaction = models.Transaction(
        amount=transaction.amount,
        currency=transaction.currency,
        status=status,
        risk_score=risk_score
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions", response_model=List[TransactionResponse])
def get_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).order_by(models.Transaction.timestamp.desc()).offset(skip).limit(limit).all()
    return transactions
