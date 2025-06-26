import { Sidebar } from "@/components/sidebar"

export default function HomePage() {
  return (
    <main className="flex min-h-screen">
      {/* Left navigation */}
      <Sidebar />

      {/* Main content */}
      <section className="flex-1 p-8 space-y-6">
        <h1 className="text-3xl font-bold">CryptoClashers — Frontier Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome, pioneer! Use the sidebar to explore Market Pulse, Boxing Arena, Land Management, and more.
        </p>
      </section>
    </main>
  )
}
