import { FrontierTraderDashboard } from "@/components/frontier-trader-dashboard"

export default function FrontierTraderPage() {
  return (
    <main className="container mx-auto p-6 space-y-6">
      <div className="relative w-full h-96 mb-8 overflow-hidden rounded-lg border-4 border-amber-800">
        <img
          src="/images/frontiertraderposter.jpg"
          alt="Frontier Trader - New Era in GameFi"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="text-center border-4 border-black p-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <h1 className="headline-primary text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
          🤠 FRONTIER TRADER 🤠
        </h1>
        <p className="headline-secondary text-xl mb-2 text-purple-300">
          "NEW ERA IN GAMEFI - Where Digital Gold Meets Pioneer Grit"
        </p>
        <p className="body-text text-gray-300">Advanced trading platform for the modern frontier</p>
      </div>

      <FrontierTraderDashboard />
    </main>
  )
}
