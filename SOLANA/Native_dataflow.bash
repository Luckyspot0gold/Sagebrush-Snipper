# Solana-native data flow
solana program deploy contracts/boxing_protocol.so
pyth init price_feed --token=BTC --chain=solana
pyth update_price_feed --token=BTC --handler=BoxingProtocol11111
