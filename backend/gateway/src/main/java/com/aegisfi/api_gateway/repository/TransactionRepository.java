package com.aegisfi.api_gateway.repository;

import com.aegisfi.api_gateway.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findAllByOrderByTimestampDesc();
    List<Transaction> findAllByCustomerOrderByTimestampDesc(String customer);
    List<Transaction> findAllByDeviceOrderByTimestampDesc(String device);
    List<Transaction> findAllByAgentOrderByTimestampDesc(String agent);
}
