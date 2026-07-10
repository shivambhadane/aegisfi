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
public class SentinelScoreResponse {
    
    @JsonProperty("risk_score")
    private Integer riskScore;
    
    private String status;
}
