// NEW CONTRACT: HighYieldBetting.sol
function placeBet(uint256 matchId) external payable {
  require(msg.value >= 0.1 ether, "Min 0.1 AVAX");
  uint256 houseCut = msg.value * 15 / 100;
  
  _transfer(houseCut); // Instant treasury funding
  bets[matchId][msg.sender] = msg.value - houseCut;
}
