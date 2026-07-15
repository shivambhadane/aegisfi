# API Reference Document
## AEGIS-FI REST & Event Ingress APIs

---

## 1. Ingestion Endpoint

### `POST /v1/events/ingest`
Submit a raw event (transaction, user behavior, agent log) to the ingestion queue.

* **Headers:** `Content-Type: application/json`, `X-API-Key: <key>`
* **Request Body:**
```json
{
  "source": "transaction",
  "payload": {
    "transaction_id": "tx_9921",
    "amount": 25000.0,
    "currency": "INR",
    "customer_id": "cust_8210",
    "merchant_id": "merch_5521",
    "device_id": "dev_392",
    "ip_address": "192.168.1.50"
  }
}
```
* **Response (202 Accepted):**
```json
{
  "status": "queued",
  "event_id": "evt_99182390-bf32-4421-9981-d10298a0d922",
  "timestamp": "2026-07-15T22:30:00Z"
}
```

---

## 2. Identity & DNA Retrieval

### `GET /v1/dna/{entity_type}/{entity_id}`
Retrieve the continuous behavioral profile (DNA) of a customer, device, or AI agent.

* **Path Parameters:**
  * `entity_type` (string): `customer` | `device` | `agent`
  * `entity_id` (string)
* **Response (200 OK):**
```json
{
  "entity_id": "cust_8210",
  "trust_score": 94.2,
  "spending_behavior": {
    "average_amount_24h": 1250.0,
    "typical_categories": ["retail", "utility"]
  },
  "device_history": ["dev_392", "dev_108"],
  "risk_history": [
    { "event_id": "evt_7721", "risk_score": 12, "timestamp": "2026-07-14T10:00:00Z" }
  ]
}
```

---

## 3. Memory Cortex Query

### `POST /v1/memory/search`
Perform similarity vector search (ANN) over historical cases to retrieve Top-K outcomes.

* **Request Body:**
```json
{
  "narrative_query": "high amount velocity transaction from a new device after credentials reset",
  "limit": 3
}
```
* **Response (200 OK):**
```json
{
  "results": [
    {
      "case_id": "case_1028",
      "similarity_score": 0.942,
      "category": "Account Takeover",
      "resolution": "Temporary Freeze + OTP Verification",
      "outcome_success": true
    }
  ]
}
```

---

## 4. Digital Twin & Scenario Simulation

### `POST /v1/twin/simulate`
Simulate the downstream outcome of candidate actions on a customer profile.

* **Request Body:**
```json
{
  "customer_id": "cust_8210",
  "actions": ["approve", "verify", "freeze"]
}
```
* **Response (200 OK):**
```json
{
  "simulations": [
    { "action": "approve", "predicted_loss_amount": 25000.0, "customer_churn_probability": 0.01 },
    { "action": "verify", "predicted_loss_amount": 0.0, "customer_churn_probability": 0.12 },
    { "action": "freeze", "predicted_loss_amount": 0.0, "customer_churn_probability": 0.78 }
  ]
}
```
