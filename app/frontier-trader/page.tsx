import { FrontierTraderDashboard } from "@/components/frontier-trader-dashboard"

export default function FrontierTraderPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="text-center border-4 border-black p-6 bg-yellow-50">
        <h1 className="headline-primary text-4xl mb-4">🤠 FRONTIER TRADER 🤠</h1>
        <p className="headline-secondary text-xl mb-2">"Where Digital Gold Meets Pioneer Grit"</p>
        <p className="body-text">Advanced trading platform for the modern frontier</p>
      </div>

      <FrontierTraderDashboard />
    </main>
  )
}
