import json
import random

def generate_transaction():
    customer_id = f"CUS{random.randint(1000, 9999)}"
    merchants = ["Amazon", "Stripe", "Adyen", "Wise", "Binance"]
    return {
        "customerId": customer_id,
        "amount": random.randint(10, 50000),
        "merchant": random.choice(merchants),
        "risk": random.randint(0, 100)
    }

if __name__ == "__main__":
    for _ in range(5):
        print(json.dumps(generate_transaction()))
