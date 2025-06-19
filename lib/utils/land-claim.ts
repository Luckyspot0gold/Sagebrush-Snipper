/**
 * Handles land claim transactions with improved error handling and timeout protection
 * @param parcelId The ID of the land parcel being claimed
 * @param playerWallet The wallet address of the claiming player
 * @returns Promise resolving to the transaction result
 */
export async function claimLandParcel(parcelId: string, playerWallet: string): Promise<any> {
  try {
    // Check if parcel is already claimed
    const isAlreadyClaimed = await checkParcelStatus(parcelId)
    if (isAlreadyClaimed) {
      throw new Error("Parcel already claimed")
    }

    // Add timeout to prevent transaction hanging
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Transaction timeout")), 30000))

    // Attempt to process transaction with timeout protection
    const transactionPromise = processLandTransaction(parcelId, playerWallet)
    const result = await Promise.race([transactionPromise, timeoutPromise])

    // Clear pending transaction UI state regardless of outcome
    clearPendingTransactionUI(parcelId)

    // Add fallback check to verify if transaction was actually completed
    // This addresses the issue where UI shows stuck but transaction is complete
    setTimeout(async () => {
      const verifyStatus = await verifyTransactionStatus(parcelId, playerWallet)
      if (verifyStatus.completed && !verifyStatus.uiUpdated) {
        updateUIAfterTransaction(parcelId, playerWallet)
      }
    }, 5000)

    return result
  } catch (error) {
    console.error("Land claim error:", error)
    // Reset claim state and show error to user
    resetClaimState(parcelId)
    throw error
  }
}

/**
 * Resets the claim state for a parcel when an error occurs
 * @param parcelId The ID of the land parcel
 */
function resetClaimState(parcelId: string): void {
  // Clear all pending UI states
  document.querySelectorAll(`.parcel-${parcelId}`).forEach((el) => {
    el.classList.remove("claiming", "processing", "pending")
    el.classList.add("available")
  })

  // Clear any cached claim data for this parcel
  localStorage.removeItem(`pending_claim_${parcelId}`)

  // Re-enable claim button
  const claimButton = document.querySelector(`.claim-btn-${parcelId}`)
  if (claimButton) {
    claimButton.disabled = false
    claimButton.textContent = "Claim Land"
  }
}

/**
 * Verifies the transaction status on the blockchain and UI
 * @param parcelId The ID of the land parcel
 * @param playerWallet The wallet address of the claiming player
 * @returns Object containing completion and UI update status
 */
async function verifyTransactionStatus(
  parcelId: string,
  playerWallet: string,
): Promise<{ completed: boolean; uiUpdated: boolean }> {
  try {
    // Check blockchain for confirmation
    const transactionReceipt = await getTransactionReceipt(parcelId, playerWallet)

    // Check UI state
    const parcelElement = document.querySelector(`.parcel-${parcelId}`)
    const uiShowsOwned = parcelElement && parcelElement.classList.contains("owned")

    return {
      completed: !!transactionReceipt?.confirmed,
      uiUpdated: uiShowsOwned,
    }
  } catch (error) {
    console.error("Verification error:", error)
    return { completed: false, uiUpdated: false }
  }
}

// These functions would be implemented elsewhere in your codebase
async function checkParcelStatus(parcelId: string): Promise<boolean> {
  // Implementation would check if the parcel is already claimed
  return false
}

async function processLandTransaction(parcelId: string, playerWallet: string): Promise<any> {
  // Implementation would process the blockchain transaction
  return { success: true }
}

function clearPendingTransactionUI(parcelId: string): void {
  // Implementation would clear UI elements showing pending state
}

async function getTransactionReceipt(parcelId: string, playerWallet: string): Promise<any> {
  // Implementation would fetch transaction receipt from blockchain
  return { confirmed: true }
}

function updateUIAfterTransaction(parcelId: string, playerWallet: string): void {
  // Implementation would update UI to show successful claim
}
