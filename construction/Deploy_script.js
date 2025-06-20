// DEPLOYMENT HOTFIX (add to deploy script)
import { quantumCompress } from '@stoneverse/core';

async function deployContracts() {
  const compressedBytecode = quantumCompress(artifact.bytecode);
  const factory = new ethers.ContractFactory(
    artifact.abi, 
    compressedBytecode,
    deployer
  );
  const contract = await factory.deploy({
    gasPrice: await getMaxGas(), // Prevents out-of-gas fails
    nonce: await getCorrectNonce() // Fixes nonce collisions
  });
}
