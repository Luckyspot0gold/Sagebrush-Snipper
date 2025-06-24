import { NewspaperLayout } from "@/components/newspaper-layout"
import { EnhancedBarKeepBill } from "@/components/enhanced-bar-keep-bill"

export default function SaloonPage() {
  return (
    <NewspaperLayout>
      <div className="flex flex-col gap-6">
        <div className="text-center border-b-4 border-black pb-4 mb-6">
          <h1 className="text-5xl font-bold font-serif uppercase mb-2">THE WYOVERSE SALOON</h1>
          <p className="text-xl font-serif italic">Where Pioneers Gather for Wisdom & Whiskey</p>
          <p className="text-sm font-serif mt-2">Established 1852 • Finest Establishment in the Digital Territory</p>
        </div>

        <EnhancedBarKeepBill />

        <div className="text-center mt-8 p-4 border-2 border-black bg-amber-50">
          <p className="font-serif italic">
            "In the digital frontier, information flows like whiskey - smooth when you know where to find it, and
            powerful when you know how to use it." - Bar Keep Bill
          </p>
        </div>
      </div>
    </NewspaperLayout>
  )
}
