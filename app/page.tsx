export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">🤠 WyoVerse - Frontier Gaming Ecosystem</h1>

        <div className="grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
          <a
            href="/boxing"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">🥊 Boxing Arena</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Fight in the crypto boxing arena and earn rewards</p>
          </a>

          <a
            href="/trading"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">💰 Trading Hub</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Trade resources and build your frontier empire</p>
          </a>

          <a
            href="/saloon"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          >
            <h2 className="mb-3 text-2xl font-semibold">🍻 Saloon</h2>
            <p className="m-0 max-w-[30ch] text-sm opacity-50">Meet Bar Keep Bill and get frontier wisdom</p>
          </a>
        </div>
      </div>
    </main>
  )
}
