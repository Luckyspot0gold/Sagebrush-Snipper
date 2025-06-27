import { ethers } from "ethers"

interface AvalancheConnectionResult {
  success: boolean
  address?: string
  balance?: string
  error?: string
  chainId?: string
  networkName?: string
}

interface NetworkConfig {
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls: string[]
}

export const AVALANCHE_CONFIG: NetworkConfig = {
  chainId: "0xa86a", // 43114 in hex
  chainName: "Avalanche Network",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"],
}

const AVALANCHE_MAINNET: NetworkConfig = {
  chainId: "0xA86A", // 43114 in hex
  chainName: "Avalanche C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"],
}

export async function connectAvalancheWallet(): Promise<AvalancheConnectionResult> {
  try {
    // Check if MetaMask or compatible wallet is installed
    if (typeof window === "undefined" || !(window as any).ethereum) {
      return {
        success: false,
        error: "No Ethereum wallet detected. Please install MetaMask or Core Wallet.",
      }
    }

    const ethereum = (window as any).ethereum

    try {
      // Request account access
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        return {
          success: false,
          error: "No accounts found. Please unlock your wallet.",
        }
      }

      // Check current network
      const currentChainId = await ethereum.request({
        method: "eth_chainId",
      })

      // Switch to Avalanche if not already connected
      if (currentChainId !== AVALANCHE_MAINNET.chainId) {
        try {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: AVALANCHE_MAINNET.chainId }],
          })
        } catch (switchError: any) {
          // If network doesn't exist, add it
          if (switchError.code === 4902) {
            try {
              await ethereum.request({
                method: "wallet_addEthereumChain",
                params: [AVALANCHE_MAINNET],
              })
            } catch (addError: any) {
              return {
                success: false,
                error: `Failed to add Avalanche network: ${addError.message}`,
              }
            }
          } else if (switchError.code === 4001) {
            return {
              success: false,
              error: "User rejected network switch request.",
            }
          } else {
            return {
              success: false,
              error: `Failed to switch to Avalanche network: ${switchError.message}`,
            }
          }
        }
      }

      // Get balance
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      const avaxBalance = (Number.parseInt(balance, 16) / 1e18).toFixed(4)

      return {
        success: true,
        address: accounts[0],
        balance: avaxBalance,
        chainId: AVALANCHE_MAINNET.chainId,
        networkName: AVALANCHE_MAINNET.chainName,
      }
    } catch (requestError: any) {
      // Handle user rejection (code 4001)
      if (requestError.code === 4001) {
        return {
          success: false,
          error: "User rejected the connection request.",
        }
      }

      return {
        success: false,
        error: `Connection failed: ${requestError.message}`,
      }
    }
  } catch (error: any) {
    console.error("Avalanche wallet connection error:", error)
    return {
      success: false,
      error: `Unexpected error: ${error.message}`,
    }
  }
}

export async function getAvalancheBalance(address: string): Promise<string> {
  try {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      throw new Error("No Ethereum wallet detected")
    }

    const balance = await (window as any).ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })

    return (Number.parseInt(balance, 16) / 1e18).toFixed(4)
  } catch (error: any) {
    console.error("Failed to get balance:", error)
    throw error
  }
}

export async function getCurrentNetwork(): Promise<{ chainId: string; isAvalanche: boolean }> {
  try {
    if (typeof window === "undefined" || !(window as any).ethereum) {
      throw new Error("No Ethereum wallet detected")
    }

    const chainId = await (window as any).ethereum.request({
      method: "eth_chainId",
    })

    return {
      chainId,
      isAvalanche: chainId === AVALANCHE_MAINNET.chainId,
    }
  } catch (error: any) {
    console.error("Failed to get current network:", error)
    throw error
  }
}

// Connect to Avalanche network
export async function connectToAvalanche() {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask is not installed")
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" })

    // Add Avalanche network if not already added
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: AVALANCHE_CONFIG.chainId }],
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [AVALANCHE_CONFIG],
        })
      } else {
        throw switchError
      }
    }

    // Create provider and signer
    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()

    return { provider, signer }
  } catch (error) {
    console.error("Failed to connect to Avalanche:", error)
    throw error
  }
}

// Get AVAX balance
export async function getAvaxBalance(address: string) {
  try {
    const provider = new ethers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])
    const balance = await provider.getBalance(address)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error("Failed to get AVAX balance:", error)
    throw error
  }
}

// Get current gas price on Avalanche
export async function getAvalancheGasPrice() {
  try {
    const provider = new ethers.JsonRpcProvider(AVALANCHE_CONFIG.rpcUrls[0])
    const gasPrice = await provider.getFeeData()
    return {
      gasPrice: gasPrice.gasPrice ? ethers.formatUnits(gasPrice.gasPrice, "gwei") : "0",
      maxFeePerGas: gasPrice.maxFeePerGas ? ethers.formatUnits(gasPrice.maxFeePerGas, "gwei") : "0",
      maxPriorityFeePerGas: gasPrice.maxPriorityFeePerGas
        ? ethers.formatUnits(gasPrice.maxPriorityFeePerGas, "gwei")
        : "0",
    }
  } catch (error) {
    console.error("Failed to get Avalanche gas price:", error)
    throw error
  }
}

// Aggregate helpers for convenient import elsewhere in the app
export const avalancheIntegration = {
  config: AVALANCHE_CONFIG,
  connect: connectToAvalanche,
  getBalance: getAvaxBalance,
  getGasPrice: getAvalancheGasPrice,
  connectWallet: connectAvalancheWallet,
  getCurrentNetwork,
}

// Optional default export (covers both named & default import styles)
export default avalancheIntegration
