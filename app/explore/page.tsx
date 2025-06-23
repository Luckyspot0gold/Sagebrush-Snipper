import { UnderConstruction } from "@/components/under-construction"

export default function ExplorePage() {
  return (
    <UnderConstruction
      title="Territory Explorer"
      description="Get ready for an immersive 3D exploration experience across the Wyoming digital frontier! Discover hidden treasures, claim land, and uncover the mysteries of the WyoVerse."
      expectedCompletion="Q2 2024"
      features={[
        "Interactive 3D world exploration",
        "Hidden treasure hunting",
        "Land claiming and territory expansion",
        "Wildlife encounters and photography",
        "Weather system and day/night cycles",
      ]}
      progress={60}
    />
  )
}
