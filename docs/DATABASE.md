# Database Design Document
## AEGIS-FI Persistence Layers (Relational, Graph, and Vector)

---

## 1. Graph Database (Neo4j)

AEGIS-FI maps network links and behavior correlations dynamically in a graph structure to detect complex fraud rings and shared entity paths.

### 1.1 Node Schemas
* **Customer:** `id`, `name`, `risk_level`, `trust_score`, `created_at`
* **Device:** `fingerprint`, `os`, `browser`, `risk_rating`
* **Merchant:** `id`, `name`, `industry_code`, `category`
* **IPAddress:** `ip`, `country`, `asn`
* **Transaction:** `id`, `amount`, `timestamp`, `status`

### 1.2 Relationship Types
* `(:Customer)-[:USES_DEVICE]->(:Device)`
* `(:Customer)-[:TRANSACTED_FROM]->(:IPAddress)`
* `(:Customer)-[:SENT_TRANSACTION]->(:Transaction)`
* `(:Transaction)-[:TO_MERCHANT]->(:Merchant)`

### 1.3 Neo4j Query Example (Shared Device Fraud Ring)
```cypher
MATCH (c1:Customer)-[:USES_DEVICE]->(d:Device)<-[:USES_DEVICE]-(c2:Customer)
WHERE c1.id <> c2.id
MATCH (c1)-[:SENT_TRANSACTION]->(t1:Transaction), (c2)-[:SENT_TRANSACTION]->(t2:Transaction)
WHERE t1.status = 'flagged' OR t2.status = 'flagged'
RETURN d.fingerprint, collect(distinct c1.id) AS suspicious_group
```

---

## 2. Vector Database (Qdrant)

The Memory Cortex uses Qdrant to search semantically matching closed cases to retrieve decisions instantly.

* **Collection Name:** `aegis_case_memory`
* **Vector Configuration:** 1536 dimensions (compatible with `text-embedding-ada-002` or `text-embedding-004`).
* **Payload Structure:**
```json
{
  "case_id": "case_1028",
  "category": "Account Takeover",
  "narrative": "Customer reported unexpected login alert from a Linux terminal. Subsequently, a high-value transfer was initiated to a new beneficiary.",
  "resolution": "Temporary Account Lockout",
  "outcome_success": true
}
```

---

## 3. Relational Database (PostgreSQL)

Stores structured customer DNA profiles, transaction records, decision states, and logs for the trust operating system.

### `transactions` table
* `id` (VARCHAR, Primary Key)
* `amount` (DECIMAL)
* `currency` (VARCHAR)
* `status` (VARCHAR)
* `risk_score` (INT)
* `customer_id` (VARCHAR)
* `merchant_id` (VARCHAR)
* `device_id` (VARCHAR)
* `created_at` (TIMESTAMP)

### `agent_decisions` table
* `id` (UUID, Primary Key)
* `transaction_id` (VARCHAR, Foreign Key)
* `sentinel_risk` (INT)
* `investigator_explanation` (TEXT)
* `digital_twin_action` (VARCHAR)
* `compliance_status` (VARCHAR)
* `final_action` (VARCHAR)
* `timestamp` (TIMESTAMP)
