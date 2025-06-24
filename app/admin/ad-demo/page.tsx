import { AdCreationDemo } from "@/components/ad-creation-demo"
import { NewspaperLayout } from "@/components/newspaper-layout"

export default function AdCreationDemoPage() {
  return (
    <NewspaperLayout title="Ad Creation Demo" subtitle="Test the Frontier Advertising System">
      <AdCreationDemo />
    </NewspaperLayout>
  )
}
