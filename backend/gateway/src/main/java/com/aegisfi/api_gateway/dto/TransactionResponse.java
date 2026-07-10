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

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private LocalDateTime timestamp;
}
