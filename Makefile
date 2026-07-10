.PHONY: build run-frontend run-gateway run-sentinel clean

build:
	mvn clean compile -f backend/pom.xml

run-frontend:
	cd frontend && npm run dev

run-gateway:
	cd backend/gateway && ./mvnw spring-boot:run

run-sentinel:
	cd ml-services/isolation-forest && source venv/bin/activate && python3 -m uvicorn main:app --port 8001
