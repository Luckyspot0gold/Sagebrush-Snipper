interface AffiliateClick {
  id: string
  adId: string
  userId: string
  timestamp: Date
  commission: number
  tier: "bronze" | "silver" | "gold" | "platinum"
  referralCode?: string
}

interface AdSlot {
  id: string
  position: "sidebar" | "header" | "footer" | "inline"
  currentBid: number
  advertiser: string
  destinationUrl: string
  commissionRate: number // 5-15% based on tier
  isActive: boolean
}

export class AffiliateTracker {
  private static instance: AffiliateTracker
  private clicks: AffiliateClick[] = []
  private adSlots: AdSlot[] = []

  static getInstance(): AffiliateTracker {
    if (!AffiliateTracker.instance) {
      AffiliateTracker.instance = new AffiliateTracker()
    }
    return AffiliateTracker.instance
  }

  // Calculate commission based on user tier
  calculateCommission(adId: string, userTier: string): number {
    const ad = this.adSlots.find((slot) => slot.id === adId)
    if (!ad) return 0

    const baseBid = ad.currentBid
    const tierMultipliers = {
      bronze: 0.05, // 5%
      silver: 0.08, // 8%
      gold: 0.12, // 12%
      platinum: 0.15, // 15%
    }

    return baseBid * (tierMultipliers[userTier as keyof typeof tierMultipliers] || 0.05)
  }

  // Track ad click and redirect
  async trackClick(adId: string, userId: string, userTier: string): Promise<string> {
    const commission = this.calculateCommission(adId, userTier)

    const click: AffiliateClick = {
      id: `click_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      adId,
      userId,
      timestamp: new Date(),
      commission,
      tier: userTier as any,
    }

    this.clicks.push(click)

    // In a real app, this would save to database
    console.log("Affiliate click tracked:", click)

    // Return destination URL for redirect
    const ad = this.adSlots.find((slot) => slot.id === adId)
    return ad?.destinationUrl || "/"
  }

  // Get revenue share breakdown
  getRevenueShare(totalRevenue: number) {
    return {
      platform: totalRevenue * 0.3, // 30% Platform
      affiliate: totalRevenue * 0.7, // 70% Affiliate
      breakdown: {
        platformPercentage: 30,
        affiliatePercentage: 70,
      },
    }
  }

  // Get user's affiliate earnings
  getUserEarnings(userId: string): number {
    return this.clicks.filter((click) => click.userId === userId).reduce((total, click) => total + click.commission, 0)
  }

  // Add new ad slot
  addAdSlot(slot: Omit<AdSlot, "id">): string {
    const id = `ad_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    this.adSlots.push({ ...slot, id })
    return id
  }
}

// Export singleton instance
export const affiliateTracker = AffiliateTracker.getInstance()
