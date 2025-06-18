import requests
from stone_sdk import QuantumSync

def connect_to_ecosystem():
    # Connect to Stockcar
    stockcar_data = requests.get("http://localhost:5000/api/market_data")
    
    # Connect to Clashers
    clashers_data = requests.get("http://localhost:8080/api/fight_stats")
    
    # Quantum sync
    QuantumSync.synchronize(
        components=[
            {"name": "Stockcar", "data": stockcar_data.json()},
            {"name": "Clashers", "data": clashers_data.json()},
            {"name": "Wyoverse", "status": "ACTIVE"}
        ],
        protocol="Wyoming-7"
    )
    return "ECOSYSTEM SYNCED"

# Add to main.py
from integration import connect_to_ecosystem
connect_to_ecosystem()
