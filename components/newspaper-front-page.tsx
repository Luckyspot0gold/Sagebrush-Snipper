const NewspaperFrontPage = () => {
  return (
    <div className="container mx-auto p-4 font-serif">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold headline-primary">The Frontier Times</h1>
        <p className="text-gray-600 italic">"All the News That's Fit to Print... and Some That Isn't!"</p>
        <p className="text-sm">June 15, 2025</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Main Story */}
        <div className="col-span-2 border-2 border-black p-4">
          <h2 className="text-2xl font-bold mb-2 headline-secondary">🚀 Frontier Colony Achieves Self-Sufficiency!</h2>
          <p className="text-sm mb-3 font-serif">
            After years of struggle, the Ares VI colony has announced complete self-sufficiency in food production and
            energy. This marks a pivotal moment in the history of space colonization.
          </p>
          <img src="https://placehold.co/600x300" alt="Colony Image" className="mb-3" />
          <p className="text-xs text-gray-700 font-serif italic">
            "A giant leap for mankind, and a small step for... Martian-kind?" - Governor Anya Sharma
          </p>
        </div>

        {/* Weather Report */}
        <div className="border-2 border-black p-4 bg-yellow-100">
          <h3 className="font-bold text-lg mb-2 headline-secondary">☀️ Weather Outlook</h3>
          <p className="text-sm mb-3 font-serif">
            Expect clear skies and warm temperatures across the region. A slight chance of meteor showers tonight.
          </p>
          <ul className="list-disc list-inside text-xs">
            <li>High: 28°C</li>
            <li>Low: 15°C</li>
            <li>UV Index: 8</li>
          </ul>
        </div>

        {/* Political Cartoon */}
        <div className="border-2 border-black p-4">
          <h3 className="font-bold text-lg mb-2 headline-secondary">😂 Political Satire</h3>
          <img src="https://placehold.co/300x200" alt="Political Cartoon" className="mb-3" />
          <p className="text-xs text-gray-700 font-serif italic">
            "Is this progress, or just another glitch in the matrix?" - Anonymous
          </p>
        </div>

        {/* Social Good Network */}
        <div className="border-2 border-black p-4 bg-blue-50">
          <h3 className="font-bold text-lg mb-2 headline-secondary">🤝 Social Good Network</h3>
          <p className="text-sm mb-3 font-serif">
            Connecting volunteers with organizations making a difference in our community.
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://example.com/volunteer"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-serif text-center transition-colors"
            >
              Volunteer at the Local Food Bank
            </a>
            <p className="text-xs text-gray-600 font-serif italic">"Lend a hand, make a difference."</p>
          </div>
          {/* Environmental Conservation */}
          <div className="border-2 border-black p-4 bg-green-50">
            <h3 className="font-bold text-lg mb-2 headline-secondary">🦅 SAVE OUR FEATHERED FRIENDS</h3>
            <p className="text-sm mb-3 font-serif">
              Climate change threatens bird populations across the frontier. Join the fight to protect our winged
              companions!
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://act.audubon.org/a/jun-2025-a"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-serif text-center transition-colors"
              >
                Stand Up for Birds w/ @audubonsociety
              </a>
              <p className="text-xs text-gray-600 font-serif italic">
                "Help birds through climate change - every action counts in preserving our natural heritage."
              </p>
            </div>
          </div>
        </div>

        {/* Classified Ads */}
        <div className="border-2 border-black p-4 bg-gray-100">
          <h3 className="font-bold text-lg mb-2 headline-secondary">📢 Classifieds</h3>
          <ul className="list-none text-sm">
            <li>
              <span className="font-bold">For Sale:</span> Hovercar, slightly used. Contact John at 555-1234.
            </li>
            <li>
              <span className="font-bold">Job Opening:</span> Software Engineer at NovaTech. Apply online.
            </li>
          </ul>
        </div>
      </section>

      <footer className="text-center mt-8 text-gray-500 text-xs">
        © 2025 The Frontier Times. All rights reserved.
      </footer>
    </div>
  )
}

export default NewspaperFrontPage
