package com.aegisfi.api_gateway.service;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaEventPublisher {
    private final KafkaTemplate<String, String> kafkaTemplate;
    private static final String TOPIC = "transactions.enriched";

    public KafkaEventPublisher(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void publishTransactionEvent(String transactionJson) {
        kafkaTemplate.send(TOPIC, transactionJson);
    }
}
