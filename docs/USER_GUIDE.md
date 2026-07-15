# User & Operator Guide
## Analysing Alerts & Monitoring Swarm Health

---

## 1. Operational Dashboard Overview

The AEGIS-FI frontend provides real-time transaction tracking and Swarm Agent status.

* **Live Monitoring Feed:** Displays incoming transactions as they enter the API Gateway, along with their Sentinel risk classification.
* **Global Threat Hotspots:** A detailed geographic map illustrating active vector attack arcs and secure pipeline tunnels.
* **AI Swarm Status:** Displays latencies, workloads, and versions for Sentinel, Investigator, Compliance, Governance, Decision, and Response agents.
* **System Log Feed:** A command-line console echoing live streaming logs from Kafka and the policy engines.

---

## 2. Investigating Anomalous Alerts

When Sentinel flags an anomalous transaction (Risk Score > 75), the following workflow is recommended:

```
[ Inbound Alert ] ---> [ Check Investigator Explainability ]
                             |
                             +---> [ Inspect Neo4j Graph Paths ]
                             |
                             +---> [ Review Similar Memory Cases ]
                             |
                             v
                  [ Approve / Override Action ]
```

1. **Review Risk Category:** Identify the primary threat pattern (e.g., Account Takeover, Velocity Spikes, IP Discrepancies).
2. **Read Explanation:** Read the Investigator Agent's explanation summary for evidence retrieval.
3. **Analyze Relationships:** Inspect the Neo4j visualization to see if the device or IP matches known fraud networks.
4. **Compare Similar Cases:** Review the Memory Cortex list of historically resolved cases.
5. **Decide:** Click "Execute Recommended Action" or select manual overrides. The result is logged to the ledger.
