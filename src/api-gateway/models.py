from sqlalchemy import Column, Integer, String, Float, DateTime
from database import Base
import datetime

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    amount = Column(Float, nullable=False)
    currency = Column(String, index=True, default="USD")
    status = Column(String, index=True, default="PENDING")
    timestamp = Column(DateTime, default=datetime.datetime.utcnow)
