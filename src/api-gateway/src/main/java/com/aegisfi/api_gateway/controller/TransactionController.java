package com.aegisfi.api_gateway.controller;

import com.aegisfi.api_gateway.dto.SentinelScoreRequest;
import com.aegisfi.api_gateway.dto.SentinelScoreResponse;
import com.aegisfi.api_gateway.dto.TransactionRequest;
import com.aegisfi.api_gateway.dto.TransactionResponse;
import com.aegisfi.api_gateway.model.Transaction;
import com.aegisfi.api_gateway.repository.TransactionRepository;
import com.aegisfi.api_gateway.service.SentinelClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/transactions")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class TransactionController {

    private final TransactionRepository transactionRepository;
    private final SentinelClient sentinelClient;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository, SentinelClient sentinelClient) {
        this.transactionRepository = transactionRepository;
        this.sentinelClient = sentinelClient;
    }

    @PostMapping
    public ResponseEntity<TransactionResponse> createTransaction(@RequestBody TransactionRequest request) {
        // 1. Get risk score from Sentinel Agent
        SentinelScoreRequest scoreRequest = SentinelScoreRequest.fromTransactionRequest(request);
        SentinelScoreResponse scoreResponse = sentinelClient.getRiskScore(scoreRequest);

        // 2. Map risk score status to transaction status
        String status = "COMPLETED";
        if ("HIGH".equalsIgnoreCase(scoreResponse.getStatus())) {
            status = "FLAGGED";
        } else if ("PENDING".equalsIgnoreCase(scoreResponse.getStatus())) {
            status = "PENDING";
        }

        // 3. Save transaction to database
        String currency = request.getCurrency();
        if (currency == null || currency.trim().isEmpty()) {
            currency = "USD";
        }

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .currency(currency)
                .status(status)
                .riskScore(scoreResponse.getRiskScore())
                .build();

        Transaction savedTx = transactionRepository.save(transaction);

        // 4. Return response
        return ResponseEntity.ok(mapToResponse(savedTx));
    }

    @GetMapping
    public ResponseEntity<List<TransactionResponse>> getTransactions() {
        List<Transaction> transactions = transactionRepository.findAllByOrderByTimestampDesc();
        List<TransactionResponse> responses = transactions.stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    private TransactionResponse mapToResponse(Transaction tx) {
        return TransactionResponse.builder()
                .id(tx.getId())
                .amount(tx.getAmount())
                .currency(tx.getCurrency())
                .status(tx.getStatus())
                .riskScore(tx.getRiskScore())
                .timestamp(tx.getTimestamp())
                .build();
    }
}
