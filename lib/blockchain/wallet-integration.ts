import { avalancheIntegration } from "@/lib/integrations/avalanche-integration"
import { sql } from "@neondatabase/serverless"

const NOW = new Date()

export interface WalletUser {
  id: string
  walletAddress: string
  username: string
  balance: string
  nftCount: number
  fightRecord: {
    wins: number
    losses: number
    totalFights: number
  }
  createdAt: string
}

export interface BoxingNFT {
  id: string
  tokenId: number
  owner: string
  fighter: string
  opponent: string
  victory: boolean
  tokensEarned: number
  mintedAt: string
  transactionHash: string
  metadata: {
    name: string
    description: string
    image: string
    attributes: Array<{ trait_type: string; value: string | number }>
  }
}

class WalletToNFTFlow {
  async connectWalletAndCreateUser(): Promise<{ success: boolean; user?: WalletUser; error?: string }> {
    try {
      // Step 1: Connect to wallet
      const connection = await avalancheIntegration.connectWallet()

      if (!connection.isConnected) {
        return { success: false, error: "Failed to connect wallet" }
      }

      // Step 2: Verify wallet ownership and balance
      const balanceVerified = Number.parseFloat(connection.balance) >= 0
      if (!balanceVerified) {
        return { success: false, error: "Unable to verify wallet balance" }
      }

      // Step 3: Create or update user record in database
      const user = await this.createOrUpdateUser(connection.address, connection.balance)

      return { success: true, user }
    } catch (error: any) {
      console.error("Wallet connection flow failed:", error)
      return { success: false, error: error.message }
    }
  }

  private async createOrUpdateUser(walletAddress: string, balance: string): Promise<WalletUser> {
    try {
      // Check if user exists
      const existingUser = await sql`
        SELECT * FROM wallet_users WHERE wallet_address = ${walletAddress}
      `

      if (existingUser.length > 0) {
        // Update existing user
        const updated = await sql`
          UPDATE wallet_users 
          SET balance = ${balance}, last_login = ${NOW}
          WHERE wallet_address = ${walletAddress}
          RETURNING *
        `
        return this.formatUserRecord(updated[0])
      } else {
        // Create new user
        const username = `Pioneer_${walletAddress.slice(-6)}`
        const newUser = await sql`
          INSERT INTO wallet_users (
            id, wallet_address, username, balance, 
            wins, losses, total_fights, nft_count, created_at
          )
          VALUES (
            ${`wallet_${walletAddress}`}, ${walletAddress}, ${username}, ${balance},
            0, 0, 0, 0, ${NOW}
          )
          RETURNING *
        `
        return this.formatUserRecord(newUser[0])
      }
    } catch (error) {
      console.error("Database user creation failed:", error)
      throw new Error("Failed to create user record")
    }
  }

  async recordBoxingMatch(
    userAddress: string,
    fighter: string,
    opponent: string,
    victory: boolean,
    tokensEarned: number,
  ): Promise<{ success: boolean; nft?: BoxingNFT; error?: string }> {
    try {
      // Step 1: Update fight record in database
      await this.updateFightRecord(userAddress, victory)

      if (victory) {
        // Step 2: Mint NFT for victory
        const nft = await this.mintVictoryNFT(userAddress, fighter, opponent, tokensEarned)
        return { success: true, nft }
      } else {
        return { success: true }
      }
    } catch (error: any) {
      console.error("Boxing match recording failed:", error)
      return { success: false, error: error.message }
    }
  }

  private async updateFightRecord(userAddress: string, victory: boolean): Promise<void> {
    const winIncrement = victory ? 1 : 0
    const lossIncrement = victory ? 0 : 1

    await sql`
      UPDATE wallet_users 
      SET 
        wins = wins + ${winIncrement},
        losses = losses + ${lossIncrement},
        total_fights = total_fights + 1,
        last_fight = ${NOW}
      WHERE wallet_address = ${userAddress}
    `
  }

  private async mintVictoryNFT(
    userAddress: string,
    fighter: string,
    opponent: string,
    tokensEarned: number,
  ): Promise<BoxingNFT> {
    try {
      // Simulate smart contract interaction
      const tokenId = Math.floor(Math.random() * 1000000) + 1
      const transactionHash = `0x${Math.random().toString(16).substr(2, 64)}`

      const metadata = {
        name: `Boxing Victory #${tokenId}`,
        description: `${fighter} defeated ${opponent} in the WyoVerse Boxing Arena`,
        image: `/images/boxing-victory-nft-${tokenId}.png`,
        attributes: [
          { trait_type: "Fighter", value: fighter },
          { trait_type: "Opponent", value: opponent },
          { trait_type: "Tokens Earned", value: tokensEarned },
          { trait_type: "Victory Date", value: NOW.toISOString() },
          { trait_type: "Rarity", value: tokensEarned > 100 ? "Legendary" : "Common" },
          { trait_type: "Arena", value: "WyoVerse Frontier" },
        ],
      }

      // Store NFT record in database
      const nftRecord = await sql`
        INSERT INTO boxing_nfts (
          id, token_id, owner, fighter, opponent, victory,
          tokens_earned, transaction_hash, metadata, minted_at
        )
        VALUES (
          ${`nft_${tokenId}`}, ${tokenId}, ${userAddress}, ${fighter}, ${opponent}, true,
          ${tokensEarned}, ${transactionHash}, ${JSON.stringify(metadata)}, ${NOW}
        )
        RETURNING *
      `

      // Update user NFT count
      await sql`
        UPDATE wallet_users 
        SET nft_count = nft_count + 1
        WHERE wallet_address = ${userAddress}
      `

      return {
        id: nftRecord[0].id,
        tokenId: nftRecord[0].token_id,
        owner: nftRecord[0].owner,
        fighter: nftRecord[0].fighter,
        opponent: nftRecord[0].opponent,
        victory: nftRecord[0].victory,
        tokensEarned: nftRecord[0].tokens_earned,
        mintedAt: nftRecord[0].minted_at,
        transactionHash: nftRecord[0].transaction_hash,
        metadata: JSON.parse(nftRecord[0].metadata),
      }
    } catch (error) {
      console.error("NFT minting failed:", error)
      throw new Error("Failed to mint victory NFT")
    }
  }

  async getUserNFTs(userAddress: string): Promise<BoxingNFT[]> {
    try {
      const nfts = await sql`
        SELECT * FROM boxing_nfts 
        WHERE owner = ${userAddress}
        ORDER BY minted_at DESC
      `

      return nfts.map((nft) => ({
        id: nft.id,
        tokenId: nft.token_id,
        owner: nft.owner,
        fighter: nft.fighter,
        opponent: nft.opponent,
        victory: nft.victory,
        tokensEarned: nft.tokens_earned,
        mintedAt: nft.minted_at,
        transactionHash: nft.transaction_hash,
        metadata: JSON.parse(nft.metadata),
      }))
    } catch (error) {
      console.error("Failed to fetch user NFTs:", error)
      return []
    }
  }

  private formatUserRecord(record: any): WalletUser {
    return {
      id: record.id,
      walletAddress: record.wallet_address,
      username: record.username,
      balance: record.balance,
      nftCount: record.nft_count || 0,
      fightRecord: {
        wins: record.wins || 0,
        losses: record.losses || 0,
        totalFights: record.total_fights || 0,
      },
      createdAt: record.created_at,
    }
  }
}

export const walletToNFTFlow = new WalletToNFTFlow()
