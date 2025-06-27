# oracles/market_oracle.py
from pythclient import PythClient
from solana.rpc.async_api import AsyncClient

class CryptoBoxingOracle:
    def __init__(self):
        self.client = PythClient()
        self.solana_client = AsyncClient("https://api.mainnet-beta.solana.com")
        
    async def get_crypto_data(self):
        # Get top 50 crypto prices
        feeds = await self.client.get_price_feeds([
            "BTC", "SOL", "ETH", "BNB", "ADA",  # Add 45 more
        ])
        
        processed = {}
        for symbol, feed in feeds.items():
            processed[symbol] = {
                "price": feed.aggregate.price,
                "confidence": feed.aggregate.confidence,
                "bollinger": self._calculate_bollinger(feed),
                "rsi": self._calculate_rsi(feed),
                "macd": self._calculate_macd(feed)
            }
        return processed
