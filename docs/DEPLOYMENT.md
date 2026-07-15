# Deployment & Infrastructure Guide
## Local Sandbox & Enterprise Production Rollout

---

## 1. Local Development Setup (Sandbox)

The AEGIS-FI sandbox environment runs on Docker Compose, hosting databases, message queues, and gateways locally.

### 1.1 Requirements
* Docker Engine 24.0.0+
* Docker Compose v2.20.0+
* Node.js 18+ (Frontend dashboard)
* Java 17 / Maven (Gateway services)

### 1.2 Running via Docker Compose
Create a `.env` file from `.env.example` and execute:
```bash
docker-compose up -d
```
This launches the following cluster resources:
* **Kafka Broker** on `localhost:9092`
* **Neo4j Graph Database** on `localhost:7474` (UI) / `localhost:7687` (Bolt)
* **Qdrant Vector DB** on `localhost:6333`
* **PostgreSQL Database** on `localhost:5432`

---

## 2. Production Deployment (Kubernetes)

For enterprise-grade high availability, deploy AEGIS-FI to a Kubernetes (EKS / GKE) cluster using Helm.

### 2.1 Multi-Zone Deployment Architecture
```
                         [ Ingress Controller ]
                                   |
           +-----------------------+-----------------------+
           | Zone A                                        | Zone B
  [ Sensing Pod (1) ]                            [ Sensing Pod (2) ]
  [ Decision Engine (1) ]                        [ Decision Engine (2) ]
  [ Agentic Swarm (1) ]                          [ Agentic Swarm (2) ]
           |                                               |
  [ PG Cluster Master ] <------------------------> [ PG Standby Node ]
```

### 2.2 Pod Auto-scaling (HPA)
Automatic scaling parameters based on CPU utilization and request queues:
```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: decision-engine-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: decision-engine
  minReplicas: 3
  maxReplicas: 20
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 75
```

---

## 3. CI/CD Release Pipeline

We use GitHub Actions to run unit tests, audit code style, build container images, and release to Docker Hub / AWS ECR.

* **Branches:**
  * `main`: Represents staging/production releases.
  * `feature/*`: Target branches for developer tasks. All code requires tests and review before merging.
* **Release Trigger:** Any tag release (`v*.*.*`) triggers automatic deployment to Kubernetes cluster nodes.
