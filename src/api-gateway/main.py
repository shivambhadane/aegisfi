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

class TransactionCreate(BaseModel):
    amount: float
    currency: str = "USD"
    status: str = "PENDING"

class TransactionResponse(TransactionCreate):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True

@app.post("/transactions", response_model=TransactionResponse)
def create_transaction(transaction: TransactionCreate, db: Session = Depends(get_db)):
    db_transaction = models.Transaction(**transaction.model_dump())
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

@app.get("/transactions", response_model=List[TransactionResponse])
def get_transactions(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    transactions = db.query(models.Transaction).order_by(models.Transaction.timestamp.desc()).offset(skip).limit(limit).all()
    return transactions
