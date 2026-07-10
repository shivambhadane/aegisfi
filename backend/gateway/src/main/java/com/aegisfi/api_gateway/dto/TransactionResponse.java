package com.aegisfi.api_gateway.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransactionResponse {
    private Long id;
    private Double amount;
    private String currency;
    private String status;
    
    @JsonProperty("risk_score")
    private Integer riskScore;
    
    private String customer;
    private String device;
    private String agent;
    private String merchant;
    private String country;

    @JsonProperty("trust_score")
    private Integer trustScore;

    @JsonProperty("spending_behaviour")
    private String spendingBehaviour;

    @JsonProperty("device_history")
    private String deviceHistory;

    @JsonProperty("login_pattern")
    private String loginPattern;

    @JsonProperty("risk_history")
    private String riskHistory;

    @JsonProperty("recommended_action")
    private String recommendedAction;

    @JsonProperty("recommended_action_reason")
    private String recommendedActionReason;

    @JsonProperty("projected_fraud_loss")
    private Double projectedFraudLoss;

    @JsonProperty("customer_friction")
    private String customerFriction;

    @JsonProperty("revenue_impact")
    private Double revenueImpact;

    @JsonProperty("compliance_status")
    private String complianceStatus;

    @JsonProperty("memory_similarity")
    private String memorySimilarity;

    @JsonProperty("shared_device_count")
    private Integer sharedDeviceCount;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime timestamp;
}
