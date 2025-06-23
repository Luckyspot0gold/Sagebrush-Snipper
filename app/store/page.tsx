import { UnderConstruction } from "@/components/under-construction"

export default function StorePage() {
  return (
    <UnderConstruction
      title="WyoVerse General Store"
      description="The ultimate destination for all your WyoVerse needs! Purchase in-game items, exclusive NFTs, and authentic Wyoming merchandise. Clutch is stocking the shelves with amazing items!"
      expectedCompletion="Q1 2024"
      features={[
        "In-game items and power-ups",
        "Exclusive WyoVerse NFT collections",
        "Physical Wyoming merchandise",
        "Limited edition collectibles",
        "Seasonal and event-specific items",
      ]}
      progress={85}
    />
  )
}
