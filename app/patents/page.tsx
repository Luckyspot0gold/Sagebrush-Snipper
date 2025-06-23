import { UnderConstruction } from "@/components/under-construction"

export default function PatentsPage() {
  return (
    <UnderConstruction
      title="Digital Patent Office"
      description="Revolutionary intellectual property system for the digital age! Register, trade, and monetize your innovations in the WyoVerse. Clutch is building the future of digital IP protection."
      expectedCompletion="Q3 2024"
      features={[
        "Digital patent registration system",
        "IP trading marketplace",
        "Smart contract protection",
        "Royalty distribution system",
        "Patent portfolio management",
      ]}
      progress={45}
    />
  )
}
