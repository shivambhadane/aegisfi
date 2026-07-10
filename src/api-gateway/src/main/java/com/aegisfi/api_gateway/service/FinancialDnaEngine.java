package com.aegisfi.api_gateway.service;

import com.aegisfi.api_gateway.model.Transaction;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FinancialDnaEngine {

    public int calculateTrustScore(List<Transaction> history, int currentRiskScore) {
        int score = 100;
        score -= (currentRiskScore / 2);
        
        double avgAmount = history.stream()
                .mapToDouble(Transaction::getAmount)
                .average()
                .orElse(0.0);
                
        if (avgAmount > 5000.0) {
            score -= 5;
        }
        
        long flaggedCount = history.stream()
                .filter(tx -> "FLAGGED".equalsIgnoreCase(tx.getStatus()))
                .count();
                
        if (flaggedCount > 0) {
            score -= 20;
        }
        
        return Math.max(0, Math.min(100, score));
    }

    public String calculateSpendingBehaviour(List<Transaction> history) {
        if (history.isEmpty()) {
            return "No prior transaction history";
        }
        
        double avgAmount = history.stream()
                .mapToDouble(Transaction::getAmount)
                .average()
                .orElse(0.0);
                
        if (avgAmount > 10000.0) {
            return "High Value Capital Transfers";
        } else if (avgAmount > 2000.0) {
            return "Moderate Outlays & B2B Settlements";
        } else if (avgAmount < 100.0) {
            return "Retail Velocity & Micro-transactions";
        } else {
            return "Standard Commercial Patterns";
        }
    }

    public String calculateDeviceHistory(List<Transaction> history) {
        long uniqueDevices = history.stream()
                .map(Transaction::getDevice)
                .filter(d -> d != null && !d.trim().isEmpty())
                .distinct()
                .count();
                
        if (uniqueDevices == 0) {
            return "New device fingerprint registered";
        } else if (uniqueDevices == 1) {
            return "Consistent single device signature";
        } else {
            return "Multi-device authorization matrix: " + uniqueDevices + " nodes";
        }
    }

    public String calculateLoginPattern(int currentRiskScore) {
        if (currentRiskScore > 75) {
            return "Rapid velocity session transition / IP location jump";
        } else if (currentRiskScore > 40) {
            return "Untypical session hours / Out-of-hours login";
        } else {
            return "Secure session check satisfied";
        }
    }

    public String calculateRiskHistory(List<Transaction> history) {
        long flaggedCount = history.stream()
                .filter(tx -> "FLAGGED".equalsIgnoreCase(tx.getStatus()))
                .count();
                
        if (flaggedCount > 2) {
            return "High-frequency quarantine events recorded";
        } else if (flaggedCount > 0) {
            return "Single flagged anomaly recorded";
        } else {
            return "Clear risk record / No anomalies flagged";
        }
    }
}
