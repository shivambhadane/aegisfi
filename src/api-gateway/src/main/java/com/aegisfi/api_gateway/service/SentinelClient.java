package com.aegisfi.api_gateway.service;

import com.aegisfi.api_gateway.dto.SentinelScoreRequest;
import com.aegisfi.api_gateway.dto.SentinelScoreResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SentinelClient {

    private static final Logger log = LoggerFactory.getLogger(SentinelClient.class);
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${sentinel.service.url:http://localhost:8001/score}")
    private String sentinelUrl;

    public SentinelScoreResponse getRiskScore(SentinelScoreRequest request) {
        try {
            return restTemplate.postForObject(sentinelUrl, request, SentinelScoreResponse.class);
        } catch (Exception e) {
            log.error("Error calling Sentinel Agent at {}: {}", sentinelUrl, e.getMessage());
            // Fallback matching FastAPI gateway behavior:
            // Status remains PENDING and risk_score is 0
            return SentinelScoreResponse.builder()
                    .riskScore(0)
                    .status("PENDING")
                    .build();
        }
    }
}
