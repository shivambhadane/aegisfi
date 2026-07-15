# Security & Compliance Standards
## Data Protection, Trust Ledger, and Cryptographic non-repudiation

---

## 1. Data Protection & Cryptography

As financial infrastructure, AEGIS-FI enforces strong cryptographic standards across all storage layers:
- **Transit Security:** All internal service communication and customer requests require TLS 1.3.
- **Rest Encryption:** DB volumes are encrypted using AES-256 with key management integrated via AWS KMS / HashiCorp Vault.
- **Envelope Encryption:** Highly sensitive fields (PII, customer names, card tokens) are encrypted individually at the application layer before reaching databases.

---

## 2. Regulatory Compliance Mappings

AEGIS-FI maps real-time agent decisions to global policy requirements:

* **RBI (Reserve Bank of India) Guidelines:**
  - Automated risk-based limits are verified for every domestic transfer.
  - Step-up verification (2-Factor / OTP) triggers dynamically on high-velocity transactions.
* **GDPR & Digital Personal Data Protection (DPDP) Act:**
  - Customer profiles support complete data purging ("Right to be Forgotten") without corrupting the historical trust ledger.
* **PCI-DSS Compliance:**
  - Standard tokenization rules are applied to mask primary account numbers (PAN) during ingestion.

---

## 3. Cryptographic Audit Trail (Trust Ledger)

To assure non-repudiation of both human overrides and autonomous AI agent operations, AEGIS-FI logs decisions to a cryptographic ledger:

```
[ Block N-1 ]   ---Hash-Chain--->   [ Block N ]
- Decision UUID                     - Decision UUID
- Sentinel Risk                     - Sentinel Risk
- Timestamp                         - Timestamp
- Prev Block Hash                   - Prev Block Hash (N-1)
- Block Signature                   - Block Signature
```

* **Chaining:** Each log block contains the SHA-256 hash of the preceding block, rendering retroactive logs tamper-evident.
* **Signatures:** Ledger entries are signed cryptographically. In future phases, these signatures will transition to Dilithium post-quantum algorithms to withstand future decryption technologies.
