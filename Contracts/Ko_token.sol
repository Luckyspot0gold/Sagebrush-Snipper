// contracts/ko_token.sol
contract KO is ERC20 {
    constructor() ERC20("Wyoming KO", "WKO") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        // 1M tokens for prize pool
    }
    
    function awardKO(address boxer) public {
        _transfer(owner(), boxer, calculateKOReward());
        emit KOWin(boxer);
    }
}
