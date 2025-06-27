# Submit to Solana Gaming Guild
curl -X POST "https://solanagaming.guild/apply" \
  -H "Authorization: Bearer $DAO_TOKEN" \
  -F "project_name=WyoVerse Crypto Boxing" \
  -F "description=Mike Tysons Punch Out style game where crypto price movements control boxer actions. Wyoming DAO-compliant." \
  -F "github=https://github.com/Luckypot0gold/wyoverse-boxing" \
  -F "funding_required=1000000" \
  -F "team_size=3" \
  -F "tokenomics=Boxer NFTs, KO tokens, DeFi prize pool" \
  -F "dao_governance=https://app.sablier.finance/streams/wyoverse"
