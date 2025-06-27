import { ethers } from "ethers"

// Avalanche C-Chain configuration
export const AVALANCHE_CONFIG = {
  chainId: "0xA86A", // 43114 in hex
  chainName: "Avalanche C-Chain",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc", "https://rpc.ankr.com/avalanche"],
  blockExplorerUrls: ["https://snowtrace.io/"],
}

// WyoVerse token contract addresses on Avalanche
export const WYOVERSE_CONTRACTS = {
  STONES_TOKEN: "0x1234567890123456789012345678901234567890",
  LAND_DEEDS_NFT: "0x2345678901234567890123456789012345678901",
  BOXING_ARENA: "0x3456789012345678901234567890123456789012",
  STAKING_POOL: "0x4567890123456789012345678901234567890123",
}

// Connect to Avalanche network
export async function connectToAvalanche(): Promise<ethers.providers.Web3Provider | null> {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)

      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" })

      // Check if we're on the right network
      const network = await provider.getNetwork()
      if (network.chainId !== 43114) {
        await switchToAvalanche()
      }

      return provider
    }
    return null
  } catch (error) {
    console.error("Failed to connect to Avalanche:", error)
    return null
  }
}

// Switch to Avalanche network
export async function switchToAvalanche(): Promise<boolean> {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: AVALANCHE_CONFIG.chainId }],
      })
      return true
    }
    return false
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [AVALANCHE_CONFIG],
        })
        return true
      } catch (addError) {
        console.error("Failed to add Avalanche network:", addError)
        return false
      }
    }
    console.error("Failed to switch to Avalanche network:", switchError)
    return false
  }
}

// Get AVAX balance
export async function getAvaxBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])
    const balance = await provider.getBalance(address)
    return ethers.utils.formatEther(balance)
  } catch (error) {
    console.error("Failed to get AVAX balance:", error)
    return "0"
  }
}

// Get STONES token balance
export async function getStonesBalance(address: string): Promise<string> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])

    // ERC-20 ABI for balanceOf function
    const erc20Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function decimals() view returns (uint8)",
    ]

    const contract = new ethers.Contract(WYOVERSE_CONTRACTS.STONES_TOKEN, erc20Abi, provider)
    const balance = await contract.balanceOf(address)
    const decimals = await contract.decimals()

    return ethers.utils.formatUnits(balance, decimals)
  } catch (error) {
    console.error("Failed to get STONES balance:", error)
    return "0"
  }
}

// Check if user owns land deeds
export async function getLandDeeds(address: string): Promise<number[]> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])

    // ERC-721 ABI for NFT functions
    const erc721Abi = [
      "function balanceOf(address owner) view returns (uint256)",
      "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    ]

    const contract = new ethers.Contract(WYOVERSE_CONTRACTS.LAND_DEEDS_NFT, erc721Abi, provider)
    const balance = await contract.balanceOf(address)

    const tokenIds: number[] = []
    for (let i = 0; i < balance.toNumber(); i++) {
      const tokenId = await contract.tokenOfOwnerByIndex(address, i)
      tokenIds.push(tokenId.toNumber())
    }

    return tokenIds
  } catch (error) {
    console.error("Failed to get land deeds:", error)
    return []
  }
}

// Mint STONES tokens (for testing/demo purposes)
export async function mintStones(amount: string): Promise<boolean> {
  try {
    const provider = await connectToAvalanche()
    if (!provider) return false

    const signer = provider.getSigner()

    // Mock minting function - in production this would be a real contract call
    console.log(`Minting ${amount} STONES tokens...`)

    // Simulate transaction delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return true
  } catch (error) {
    console.error("Failed to mint STONES:", error)
    return false
  }
}

// Place a bet in the boxing arena
export async function placeBet(fightId: number, amount: string, fighter: "bull" | "bear"): Promise<boolean> {
  try {
    const provider = await connectToAvalanche()
    if (!provider) return false

    const signer = provider.getSigner()

    // Boxing arena contract ABI
    const boxingAbi = ["function placeBet(uint256 fightId, uint8 fighter) payable"]

    const contract = new ethers.Contract(WYOVERSE_CONTRACTS.BOXING_ARENA, boxingAbi, signer)

    const tx = await contract.placeBet(fightId, fighter === "bull" ? 0 : 1, {
      value: ethers.utils.parseEther(amount),
    })

    await tx.wait()
    return true
  } catch (error) {
    console.error("Failed to place bet:", error)
    return false
  }
}

// Stake STONES tokens
export async function stakeStones(amount: string): Promise<boolean> {
  try {
    const provider = await connectToAvalanche()
    if (!provider) return false

    const signer = provider.getSigner()

    // Staking contract ABI
    const stakingAbi = ["function stake(uint256 amount)", "function approve(address spender, uint256 amount)"]

    // First approve the staking contract to spend STONES
    const stonesContract = new ethers.Contract(WYOVERSE_CONTRACTS.STONES_TOKEN, stakingAbi, signer)
    const approveTx = await stonesContract.approve(WYOVERSE_CONTRACTS.STAKING_POOL, ethers.utils.parseEther(amount))
    await approveTx.wait()

    // Then stake the tokens
    const stakingContract = new ethers.Contract(WYOVERSE_CONTRACTS.STAKING_POOL, stakingAbi, signer)
    const stakeTx = await stakingContract.stake(ethers.utils.parseEther(amount))
    await stakeTx.wait()

    return true
  } catch (error) {
    console.error("Failed to stake STONES:", error)
    return false
  }
}

// Get staking rewards
export async function getStakingRewards(address: string): Promise<string> {
  try {
    const provider = new ethers.providers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])

    const stakingAbi = ["function earned(address account) view returns (uint256)"]

    const contract = new ethers.Contract(WYOVERSE_CONTRACTS.STAKING_POOL, stakingAbi, provider)
    const rewards = await contract.earned(address)

    return ethers.utils.formatEther(rewards)
  } catch (error) {
    console.error("Failed to get staking rewards:", error)
    return "0"
  }
}

// Export aggregated integration object
export const avalancheIntegration = {
  connectToAvalanche,
  switchToAvalanche,
  getAvaxBalance,
  getStonesBalance,
  getLandDeeds,
  mintStones,
  placeBet,
  stakeStones,
  getStakingRewards,
  AVALANCHE_CONFIG,
  WYOVERSE_CONTRACTS,
}

// Default export
export default avalancheIntegration
