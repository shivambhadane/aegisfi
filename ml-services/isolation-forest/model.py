import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
import os
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class FraudDetectionModel:
    def __init__(self, data_path="../../../datasets/creditcard.csv"):
        self.data_path = data_path
        self.model = IsolationForest(contamination=0.002, random_state=42, n_estimators=100)
        self.features = [f"V{i}" for i in range(1, 29)] + ["Amount"]
        self.is_trained = False
        self.train_model()

    def train_model(self):
        if os.path.exists(self.data_path):
            logger.info(f"Loading real dataset from {self.data_path}...")
            df = pd.read_csv(self.data_path)
            # Use a sample for faster MVP training if the dataset is huge
            if len(df) > 50000:
                df = df.sample(50000, random_state=42)
            X = df[self.features]
            logger.info("Training Isolation Forest on real data...")
            self.model.fit(X)
            self.is_trained = True
            logger.info("Training complete.")
        else:
            logger.warning(f"Dataset not found at {self.data_path}. Training on synthetic fallback data so the server can start.")
            # Generate synthetic data with 29 features
            np.random.seed(42)
            normal_data = np.random.randn(1000, 29)
            # Add Amount-like scale to the last column
            normal_data[:, -1] = np.abs(normal_data[:, -1] * 100) 
            df = pd.DataFrame(normal_data, columns=self.features)
            self.model.fit(df)
            self.is_trained = True

    def predict(self, features_dict: dict) -> dict:
        """
        Expects a dictionary with V1-V28 and Amount.
        Returns a risk score (0-100) and status.
        """
        if not self.is_trained:
            return {"risk_score": 0, "status": "UNKNOWN"}

        try:
            df = pd.DataFrame([features_dict], columns=self.features)
            
            # fill missing with 0 just in case
            df = df.fillna(0)

            # decision_function returns negative values for outliers, positive for inliers
            score = self.model.decision_function(df)[0]
            
            # Map score to a 0-100 risk scale. 
            # In Isolation Forest, lower score -> more anomalous (higher risk).
            # We'll invert and normalize it roughly.
            risk_score = max(0, min(100, int((-score + 0.5) * 100)))

            # If risk_score > 80, flag as HIGH
            status = "HIGH" if risk_score >= 80 else "LOW"

            return {
                "risk_score": risk_score,
                "status": status
            }
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return {"risk_score": 0, "status": "ERROR"}

    def get_sample(self):
        if not self.is_trained:
            return {"Amount": 0}
        
        # Return a random sample from the trained model's dataset if possible
        try:
            if os.path.exists(self.data_path):
                df = pd.read_csv(self.data_path).sample(1)
            else:
                np.random.seed()
                normal_data = np.random.randn(1, 29)
                normal_data[:, -1] = np.abs(normal_data[:, -1] * 100) 
                df = pd.DataFrame(normal_data, columns=self.features)
            
            sample_dict = df[self.features].iloc[0].to_dict()
            return sample_dict
        except Exception as e:
            logger.error(f"Error getting sample: {e}")
            return {"Amount": 0}

# Singleton instance
fraud_model = FraudDetectionModel()
