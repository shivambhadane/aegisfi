package com.aegisfi.api_gateway.controller;

import com.aegisfi.api_gateway.dto.SentinelScoreRequest;
import com.aegisfi.api_gateway.dto.SentinelScoreResponse;
import com.aegisfi.api_gateway.dto.TransactionRequest;
import com.aegisfi.api_gateway.dto.TransactionResponse;
import com.aegisfi.api_gateway.model.Transaction;
import com.aegisfi.api_gateway.repository.TransactionRepository;
import com.aegisfi.api_gateway.service.SentinelClient;
import com.aegisfi.api_gateway.dto.FinancialProfile;
import com.aegisfi.api_gateway.service.FinancialDnaEngine;
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
    private final FinancialDnaEngine financialDnaEngine;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository, SentinelClient sentinelClient, FinancialDnaEngine financialDnaEngine) {
        this.transactionRepository = transactionRepository;
        this.sentinelClient = sentinelClient;
        this.financialDnaEngine = financialDnaEngine;
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

        long count = transactionRepository.count();

        String customer = request.getCustomer();
        if (customer == null || customer.trim().isEmpty()) {
            String[] customers = {"Alpha Corp", "Sigma Solutions", "Delta Capital", "Zenith Inc", "Quantum Fund"};
            customer = customers[(int) (count % customers.length)];
        }

        String merchant = request.getMerchant();
        if (merchant == null || merchant.trim().isEmpty()) {
            String[] merchants = {"Stripe Gateway", "AWS Cloud Billing", "Adyen Settlement", "Wise Transfer", "Binance OTC"};
            merchant = merchants[(int) (count % merchants.length)];
        }

        String country = request.getCountry();
        if (country == null || country.trim().isEmpty()) {
            String[] countries = {"US", "DE", "SG", "IN", "UK"};
            country = countries[(int) (count % countries.length)];
        }

        String device = request.getDevice();
        if (device == null || device.trim().isEmpty()) {
            String[] devices = {"MacBook Pro (Chrome OS)", "iPhone 15 (SecOps Core)", "Linux Workstation (Firefox)", "Windows Server 2022"};
            device = devices[(int) (count % devices.length)];
        }

        String agent = request.getAgent();
        if (agent == null || agent.trim().isEmpty()) {
            String[] agents = {"Sentinel-Agent", "Governance-Bot", "Ledger-Audit", "Compliance-Check"};
            agent = agents[(int) (count % agents.length)];
        }

        Transaction transaction = Transaction.builder()
                .amount(request.getAmount())
                .currency(currency)
                .status(status)
                .riskScore(scoreResponse.getRiskScore())
                .customer(customer)
                .merchant(merchant)
                .country(country)
                .device(device)
                .agent(agent)
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

    @GetMapping("/profiles/customer/{name}")
    public ResponseEntity<FinancialProfile> getCustomerProfile(@PathVariable String name) {
        List<Transaction> history = transactionRepository.findAllByCustomerOrderByTimestampDesc(name);
        return ResponseEntity.ok(FinancialProfile.builder()
                .entityName(name)
                .entityType("CUSTOMER")
                .trustScore(financialDnaEngine.calculateTrustScore(history, 0))
                .spendingBehaviour(financialDnaEngine.calculateSpendingBehaviour(history))
                .deviceHistory(financialDnaEngine.calculateDeviceHistory(history))
                .loginPattern(financialDnaEngine.calculateLoginPattern(0))
                .riskHistory(financialDnaEngine.calculateRiskHistory(history))
                .build());
    }

    @GetMapping("/profiles/device/{name}")
    public ResponseEntity<FinancialProfile> getDeviceProfile(@PathVariable String name) {
        List<Transaction> history = transactionRepository.findAllByDeviceOrderByTimestampDesc(name);
        return ResponseEntity.ok(FinancialProfile.builder()
                .entityName(name)
                .entityType("DEVICE")
                .trustScore(financialDnaEngine.calculateTrustScore(history, 0))
                .spendingBehaviour(financialDnaEngine.calculateSpendingBehaviour(history))
                .deviceHistory(financialDnaEngine.calculateDeviceHistory(history))
                .loginPattern(financialDnaEngine.calculateLoginPattern(0))
                .riskHistory(financialDnaEngine.calculateRiskHistory(history))
                .build());
    }

    @GetMapping("/profiles/agent/{name}")
    public ResponseEntity<FinancialProfile> getAgentProfile(@PathVariable String name) {
        List<Transaction> history = transactionRepository.findAllByAgentOrderByTimestampDesc(name);
        return ResponseEntity.ok(FinancialProfile.builder()
                .entityName(name)
                .entityType("AGENT")
                .trustScore(financialDnaEngine.calculateTrustScore(history, 0))
                .spendingBehaviour(financialDnaEngine.calculateSpendingBehaviour(history))
                .deviceHistory(financialDnaEngine.calculateDeviceHistory(history))
                .loginPattern(financialDnaEngine.calculateLoginPattern(0))
                .riskHistory(financialDnaEngine.calculateRiskHistory(history))
                .build());
    }

    private TransactionResponse mapToResponse(Transaction tx) {
        List<Transaction> history = transactionRepository.findAllByCustomerOrderByTimestampDesc(tx.getCustomer());
        
        return TransactionResponse.builder()
                .id(tx.getId())
                .amount(tx.getAmount())
                .currency(tx.getCurrency())
                .status(tx.getStatus())
                .riskScore(tx.getRiskScore())
                .customer(tx.getCustomer())
                .merchant(tx.getMerchant())
                .device(tx.getDevice())
                .country(tx.getCountry())
                .agent(tx.getAgent())
                .trustScore(financialDnaEngine.calculateTrustScore(history, tx.getRiskScore()))
                .spendingBehaviour(financialDnaEngine.calculateSpendingBehaviour(history))
                .deviceHistory(financialDnaEngine.calculateDeviceHistory(history))
                .loginPattern(financialDnaEngine.calculateLoginPattern(tx.getRiskScore()))
                .riskHistory(financialDnaEngine.calculateRiskHistory(history))
                .timestamp(tx.getTimestamp())
                .build();
    }
}
