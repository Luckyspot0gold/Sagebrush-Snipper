// contracts/Compliance.sol
function generateCourtProof() public view returns (string memory) {
  return string(abi.encodePacked(
    "Wyoming Protocol 7 Compliance Certificate\n",
    "Issued To: ", msg.sender, "\n",
    "Block: ", block.number, "\n",
    "Court Validation Hash: ",
    keccak256(abi.encode(
      block.timestamp, 
      msg.sender,
      address(this)
    ))
  );
}
