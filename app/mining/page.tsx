import { UnderConstruction } from "@/components/under-construction"

export default function MiningPage() {
  return (
    <UnderConstruction
      title="Mining Operations"
      description="Clutch is building an advanced cryptocurrency mining simulation with real-time market integration. Mine STONES, Tatonka, and Artifacts while learning about blockchain technology!"
      expectedCompletion="Q2 2024"
      features={[
        "Real-time cryptocurrency mining simulation",
        "Multiple mining pools for different tokens",
        "Educational blockchain tutorials",
        "Mining equipment upgrades and customization",
        "Leaderboards and mining competitions",
      ]}
      progress={75}
    />
  )
}
