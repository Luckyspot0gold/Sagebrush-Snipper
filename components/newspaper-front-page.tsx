import { WyoVerseCalendar } from "@/components/wyoverse-calendar"

export default function NewspaperFrontPage() {
  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Headline Section */}
      <div className="col-span-full">
        <h1 className="text-4xl font-bold">WyoVerse Daily News</h1>
        <p className="text-gray-600">Your source for all things WyoVerse</p>
      </div>

      {/* Top Story Section */}
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">Breaking: New AI Discovered in WyoVerse!</h2>
        <p>
          A groundbreaking AI has been discovered within the WyoVerse, promising to revolutionize virtual interactions.
          Details are still emerging, but experts believe this could be a game-changer.
        </p>
        <img src="https://via.placeholder.com/600x300" alt="AI Discovery" className="mt-2" />
      </div>

      {/* Sidebar Section */}
      <div>
        <h3 className="text-xl font-semibold">Weather Update</h3>
        <p>Sunny skies and mild temperatures expected in the WyoVerse today.</p>

        <h3 className="text-xl font-semibold mt-4">Stock Market Report</h3>
        <p>WYO coin is up 5% following the AI announcement.</p>
      </div>

      {/* Games Section */}
      <div className="col-span-full">
        <h2 className="text-2xl font-semibold">New Games Released This Week</h2>
        <ul>
          <li>WyoFighters - A thrilling fighting game set in the WyoVerse arena.</li>
          <li>WyoRacers - Experience high-speed racing across the digital landscape.</li>
        </ul>
      </div>

      {/* Calendar Section */}
      <div className="col-span-full">
        <WyoVerseCalendar />
      </div>

      {/* Footer Section */}
      <div className="col-span-full text-center mt-8">
        <p>&copy; 2023 WyoVerse Daily News</p>
      </div>
    </div>
  )
}
