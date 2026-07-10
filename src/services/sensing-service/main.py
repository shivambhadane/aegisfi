from fastapi import FastAPI, BackgroundTasks
import logging

app = FastAPI(title="Sensing Service", version="1.0.0")

@app.post("/v1/events/ingest")
async def ingest_event(event: dict, background_tasks: BackgroundTasks):
    logging.info(f"Ingested event: {event.get('event_id')}")
    return {"status": "accepted", "event_id": event.get("event_id")}
