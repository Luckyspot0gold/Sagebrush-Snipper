"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { MapPin, Mountain, Palette, GraduationCap, Scroll, Wind, ArrowRight } from "lucide-react"
import Image from "next/image"

export function LifestyleSection() {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="newspaper-article">
        <div className="newspaper-article-inner">
          <div className="text-center border-b-4 border-black pb-4 mb-6">
            <h1 className="text-5xl font-bold font-serif uppercase">LIFESTYLE SECTION</h1>
            <p className="text-lg font-serif italic">Culture, Tourism & Territory Life</p>
            <div className="flex justify-center mt-2">
              <Badge className="bg-blue-100 text-blue-800 font-serif">Explore the Digital Frontier</Badge>
            </div>
          </div>

          {/* Quick Access Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/tourism" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">TOURISM</h3>
                  <p className="text-xs font-serif text-center">Explore Wyoming</p>
                </div>
              </div>
            </Link>

            <Link href="/parks" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Mountain className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">PARKS</h3>
                  <p className="text-xs font-serif text-center">Recreation</p>
                </div>
              </div>
            </Link>

            <Link href="/art" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Palette className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">ART GALLERY</h3>
                  <p className="text-xs font-serif text-center">Digital Art</p>
                </div>
              </div>
            </Link>

            <Link href="/education" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <GraduationCap className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">EDUCATION</h3>
                  <p className="text-xs font-serif text-center">Learning</p>
                </div>
              </div>
            </Link>

            <Link href="/native-history" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Scroll className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">NATIVE HISTORY</h3>
                  <p className="text-xs font-serif text-center">Indigenous Culture</p>
                </div>
              </div>
            </Link>

            <Link href="/energy" className="group">
              <div className="border-4 border-black p-1 hover:shadow-lg transition-shadow">
                <div className="border-2 border-black p-4 bg-white group-hover:bg-gray-50">
                  <Wind className="h-8 w-8 mx-auto mb-2" />
                  <h3 className="font-serif font-bold text-center">ENERGY</h3>
                  <p className="text-xs font-serif text-center">Sustainability</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-8">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-3xl font-bold font-serif mb-4">FEATURED DESTINATIONS</h2>

              <div className="space-y-6">
                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Image
                          src="/images/crypto-clash-colosseum.webp"
                          alt="Colosseum"
                          width={200}
                          height={150}
                          className="w-full h-auto border border-black"
                        />
                      </div>
                      <div className="w-2/3">
                        <h3 className="text-xl font-bold font-serif mb-2">CRYPTO CLASH COLOSSEUM</h3>
                        <p className="font-serif mb-3">
                          Experience the grandeur of our Roman-inspired arena where epic battles unfold. This
                          architectural marvel hosts thousands of spectators for the most thrilling market-driven combat
                          in the digital frontier.
                        </p>
                        <Link href="/boxing-arena">
                          <Button variant="link" className="p-0 font-serif">
                            Visit Arena <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-4 border-black p-1">
                  <div className="border-2 border-black p-4">
                    <div className="flex gap-4">
                      <div className="w-1/3">
                        <Image
                          src="/images/wind-energy-wyoming.png"
                          alt="Wind Energy"
                          width={200}
                          height={150}
                          className="w-full h-auto border border-black"
                        />
                      </div>
                      <div className="w-2/3">
                        <h3 className="text-xl font-bold font-serif mb-2">WYOMING WIND FARMS</h3>
                        <p className="font-serif mb-3">
                          Discover the sustainable energy revolution powering our digital territory. These magnificent
                          wind farms generate clean energy while creating stunning landscapes across the Wyoming plains.
                        </p>
                        <Link href="/energy">
                          <Button variant="link" className="p-0 font-serif">
                            Energy Tour <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="newspaper-article">
            <div className="newspaper-article-inner">
              <h2 className="text-2xl font-bold font-serif mb-4">EVENTS CALENDAR</h2>
              <div className="space-y-3">
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Cheyenne Frontier Days</h4>
                  <p className="text-sm font-serif">July 22-31, 2024</p>
                  <p className="text-xs font-serif text-gray-600">Virtual rodeo experience</p>
                </div>
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Art Gallery Opening</h4>
                  <p className="text-sm font-serif">March 1, 2024</p>
                  <p className="text-xs font-serif text-gray-600">Digital NFT exhibition</p>
                </div>
                <div className="border border-black p-3">
                  <h4 className="font-serif font-bold">Native History Month</h4>
                  <p className="text-sm font-serif">November 2024</p>
                  <p className="text-xs font-serif text-gray-600">Cultural celebration</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold font-serif mb-3">WEATHER</h3>
                <div className="border border-black p-3">
                  <p className="font-serif">Sunny skies across the digital frontier</p>
                  <p className="text-sm font-serif text-gray-600">Perfect for exploration</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
