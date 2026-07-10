package com.aegisfi.api_gateway.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FinancialProfile {
    @JsonProperty("entity_name")
    private String entityName;

    @JsonProperty("entity_type")
    private String entityType; // CUSTOMER, DEVICE, AGENT

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
}
