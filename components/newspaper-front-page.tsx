"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function NewspaperFrontPage() {
  const [currentStory, setCurrentStory] = useState("main")

  const stories = {
    main: {
      headline: "WYOVERSE PIONEER DIGITAL FRONTIER OPENS",
      subheadline: "Revolutionary Gaming Platform Combines Old West Spirit with Modern Technology",
      content: `CHEYENNE, WYOMING TERRITORY - In a groundbreaking development that bridges the gap between frontier tradition and digital innovation, the WyoVerse Pioneer platform has officially opened its virtual doors to settlers from across the nation.

The ambitious project, spearheaded by digital pioneers and backed by blockchain technology, offers participants the opportunity to claim virtual land, engage in frontier trading, and participate in authentic Old West experiences through cutting-edge gaming technology.

"We're not just building games," declared project founder during yesterday's grand opening ceremony. "We're creating a living, breathing digital frontier where the spirit of Wyoming's pioneers lives on through modern technology."

The platform features multiple gaming experiences including the popular Crypto Clashers Boxing Arena, high-stakes racing circuits, and Bar Keep Bill's authentic frontier saloon experience.`,
    },
    trading: {
      headline: "STONEYARD GAMING ANNOUNCES FRONTIER TRADER",
      subheadline: "New Era in GameFi Brings Advanced Trading to the Digital Frontier",
      content: `FRONTIER TERRITORY - Stoneyard Gaming has unveiled their revolutionary Frontier Trader platform, combining the rugged independence of frontier trading with sophisticated modern financial technology.

The platform features a mysterious cowboy figure who represents the bridge between traditional frontier commerce and today's digital asset trading. Standing between a classic covered wagon and a modern sports car, this symbolic representation captures the essence of evolution in trading methods.

"From trading posts to trading platforms," explains the development team. "We're bringing the same pioneering spirit that built the American West to the world of GameFi and digital assets."

The Frontier Trader platform offers multi-blockchain support, real-time market analysis, and authentic frontier-themed trading experiences that honor Wyoming's rich commercial heritage.`,
    },
    pyramid: {
      headline: "MYSTERIOUS WYOMING PYRAMID DISCOVERED",
      subheadline: "Archaeological Team Uncovers Ancient Structure in Remote Wyoming Valley",
      content: `REMOTE WYOMING VALLEY - A team of archaeologists has made a startling discovery in the remote wilderness of Wyoming Territory - a perfectly preserved pyramid structure that predates known Native American settlements in the region.

The structure, measuring approximately 200 feet at its base and rising 150 feet into the sky, appears to be constructed from locally quarried stone using techniques not previously documented in North American archaeological records.

"This discovery challenges everything we thought we knew about pre-Columbian architecture in the American West," stated lead archaeologist Dr. Sarah Mitchell. "The precision of the construction and the astronomical alignments suggest a sophisticated understanding of engineering and astronomy."

Local Shoshone tribal elders have confirmed oral traditions speaking of "the ancient builders" but had not previously shared the specific location of such structures with outside researchers.

The site has been secured for further study, with plans for guided expeditions beginning next month for qualified researchers and adventure seekers.`,
    },
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-amber-50 border-8 border-amber-900 p-8 font-serif">
      {/* Newspaper Header */}
      <div className="text-center border-b-4 border-amber-900 pb-6 mb-6">
        <h1 className="text-6xl font-bold text-amber-900 mb-2" style={{ fontFamily: "IM Fell English, serif" }}>
          THE WYOVERSE PIONEER
        </h1>
        <div className="flex justify-between items-center text-sm text-amber-700">
          <span>CHEYENNE, WYOMING TERRITORY</span>
          <span className="text-lg font-bold">PRICE: 5¢</span>
          <span>DECEMBER 26, 2024</span>
        </div>
        <div className="text-center text-xs text-amber-600 mt-2">"ALL THE NEWS THAT'S FIT TO MINE"</div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        <Button
          variant={currentStory === "main" ? "default" : "outline"}
          onClick={() => setCurrentStory("main")}
          className="text-xs"
        >
          FRONT PAGE
        </Button>
        <Button
          variant={currentStory === "trading" ? "default" : "outline"}
          onClick={() => setCurrentStory("trading")}
          className="text-xs"
        >
          BUSINESS
        </Button>
        <Button
          variant={currentStory === "pyramid" ? "default" : "outline"}
          onClick={() => setCurrentStory("pyramid")}
          className="text-xs"
        >
          DISCOVERY
        </Button>
      </div>

      {/* Main Story */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-3xl font-bold text-amber-900 mb-2 leading-tight">{stories[currentStory].headline}</h2>
          <h3 className="text-lg text-amber-700 mb-4 italic">{stories[currentStory].subheadline}</h3>

          {currentStory === "trading" && (
            <div className="mb-4">
              <img
                src="/images/frontiertraderposter.jpg"
                alt="Frontier Trader Poster"
                className="w-full h-48 object-cover border-2 border-amber-700 rounded"
              />
              <p className="text-xs text-amber-600 text-center mt-1">
                Frontier Trader: Bridging Old West and New Technology
              </p>
            </div>
          )}

          <div className="text-sm text-amber-800 leading-relaxed columns-1 md:columns-2 gap-4">
            {stories[currentStory].content.split("\n\n").map((paragraph, index) => (
              <p key={index} className="mb-3 break-inside-avoid">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="border-2 border-amber-700">
            <CardContent className="p-4">
              <h4 className="font-bold text-amber-900 mb-2">WANTED</h4>
              <div className="text-xs text-amber-800">
                <p className="mb-2">DIGITAL PIONEERS</p>
                <p className="mb-2">For frontier settlement and land claiming</p>
                <p>REWARD: Virtual land deeds and gaming tokens</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-700">
            <CardContent className="p-4">
              <h4 className="font-bold text-amber-900 mb-2">GAMING SCHEDULE</h4>
              <div className="text-xs text-amber-800 space-y-1">
                <p>• Boxing Matches: Daily 8PM</p>
                <p>• Racing Circuit: Weekends</p>
                <p>• Saloon Games: Always Open</p>
                <p>• Land Auctions: Fridays</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-700">
            <CardContent className="p-4">
              <h4 className="font-bold text-amber-900 mb-2">ADVERTISEMENTS</h4>
              <div className="text-xs text-amber-800 space-y-2">
                <div className="border border-amber-600 p-2">
                  <p className="font-bold">BILL'S SALOON</p>
                  <p>Finest drinks on the frontier!</p>
                  <p>Now serving Snipers Sarsaparilla</p>
                </div>
                <div className="border border-amber-600 p-2">
                  <p className="font-bold">LAND OFFICE</p>
                  <p>Prime virtual real estate</p>
                  <p>Stake your claim today!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-amber-900 mt-8 pt-4 text-center text-xs text-amber-600">
        <p>Published by WyoVerse Media Company • Printed on the finest digital paper</p>
      </div>
    </div>
  )
}

// Default export for compatibility
export default NewspaperFrontPage
