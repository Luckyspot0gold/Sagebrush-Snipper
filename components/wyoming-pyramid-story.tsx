"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Landmark, MapPin, Calendar, Users, ExternalLink } from "lucide-react"
import Link from "next/link"

export function WyomingPyramidStory() {
  return (
    <div className="newspaper-article border-4 border-black p-1 mb-6">
      <div className="newspaper-article-inner border-2 border-black p-6">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold font-serif uppercase mb-2 headline-primary">
            MYSTERIOUS WYOMING PYRAMID DISCOVERED
          </h2>
          <h3 className="text-xl font-serif italic headline-secondary">
            Ancient Structure Reveals Astronomical Secrets in Digital Frontier
          </h3>
          <div className="newspaper-byline mt-3">By Sarah Mitchell, Frontier Archaeological Correspondent</div>
          <div className="newspaper-dateline">WYOMING TERRITORY, December 15, 1868</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div className="newspaper-paragraph">
              <span className="text-6xl float-left mr-4 mt-2 font-serif">A</span>
              remarkable discovery has sent shockwaves through the archaeological community and captured the imagination
              of settlers across the Wyoming Territory. Deep within the rugged landscape, researchers have uncovered
              what appears to be an ancient pyramid structure of unknown origin.
            </div>

            <div className="newspaper-paragraph">
              The structure, measuring approximately 150 feet at its base and rising 75 feet into the Wyoming sky,
              exhibits precise astronomical alignments that suggest advanced knowledge of celestial mechanics. Local
              Shoshone tribal elders speak of ancient legends surrounding the site, referring to it as "The Star
              Watcher's Lodge."
            </div>

            <div className="newspaper-quote">
              "This discovery challenges everything we thought we knew about pre-Columbian architecture in the American
              West. The precision of the astronomical alignments rivals that of the great pyramids of Egypt."
              <div className="text-right mt-2 font-serif italic">
                - Dr. Edmund Blackwood, Harvard Archaeological Society
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-2 border-black">
              <CardHeader className="bg-gray-100">
                <CardTitle className="font-serif flex items-center gap-2">
                  <Landmark className="h-5 w-5" />
                  Pyramid Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm font-serif">
                  <div className="flex justify-between">
                    <span>Base Dimensions:</span>
                    <span>150 x 150 feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Height:</span>
                    <span>75 feet</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Material:</span>
                    <span>Local sandstone</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Age:</span>
                    <span>800-1200 years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Orientation:</span>
                    <span>True North alignment</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-black">
              <CardHeader className="bg-blue-50">
                <CardTitle className="font-serif flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-2 text-sm font-serif">
                  <div>
                    <strong>Coordinates:</strong> 41°24'N, 104°49'W
                  </div>
                  <div>
                    <strong>Nearest Settlement:</strong> Cheyenne (47 miles SE)
                  </div>
                  <div>
                    <strong>Terrain:</strong> High plains plateau
                  </div>
                  <div>
                    <strong>Access:</strong> Guided expeditions only
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="newspaper-paragraph mb-4">
          The pyramid's most intriguing feature is a series of precisely carved channels that align with major celestial
          events. During the winter solstice, sunlight penetrates the structure through a carefully positioned opening,
          illuminating an inner chamber containing what appears to be an ancient star map carved into the stone floor.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-2 border-black">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 mx-auto mb-2 text-blue-600" />
              <h4 className="font-serif font-bold mb-2">Astronomical Events</h4>
              <p className="text-sm font-serif">
                Solstice and equinox alignments suggest advanced astronomical knowledge
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h4 className="font-serif font-bold mb-2">Cultural Significance</h4>
              <p className="text-sm font-serif">Local tribes maintain oral traditions about the "Star Watchers"</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-black">
            <CardContent className="p-4 text-center">
              <Landmark className="h-8 w-8 mx-auto mb-2 text-purple-600" />
              <h4 className="font-serif font-bold mb-2">Archaeological Value</h4>
              <p className="text-sm font-serif">Challenges existing theories about pre-Columbian architecture</p>
            </CardContent>
          </Card>
        </div>

        <div className="newspaper-paragraph mb-4">
          Local rancher Thomas McKenzie, whose property borders the discovery site, reports strange phenomena occurring
          near the pyramid during certain lunar phases. "The stones seem to hum with an otherworldly energy," McKenzie
          told our correspondent. "My cattle won't graze within a quarter-mile of the place during the full moon."
        </div>

        <div className="border-4 border-black p-4 bg-yellow-50 mb-4">
          <h4 className="font-serif font-bold text-lg mb-2 text-center">EXPEDITION ANNOUNCEMENT</h4>
          <p className="font-serif text-center mb-3">
            The Wyoming Territory Archaeological Society is organizing guided expeditions to the pyramid site. Limited
            to 12 participants per expedition due to the sacred nature of the location.
          </p>
          <div className="flex justify-center gap-4">
            <Badge variant="outline" className="border-black">
              Next Expedition: December 21st (Winter Solstice)
            </Badge>
            <Badge variant="outline" className="border-black">
              Cost: $25 per person
            </Badge>
          </div>
        </div>

        <div className="newspaper-paragraph mb-6">
          The discovery has also attracted the attention of Eastern universities and European archaeological societies.
          Plans are underway for a comprehensive survey using the latest scientific instruments, including photographic
          documentation and precise measurements using surveying equipment recently arrived from Philadelphia.
        </div>

        <div className="text-center">
          <Link href="/wyoming-pyramid">
            <Button className="newspaper-button font-serif text-lg px-8 py-3">
              <ExternalLink className="h-5 w-5 mr-2" />
              EXPLORE THE PYRAMID MYSTERY
            </Button>
          </Link>
        </div>

        <div className="border-t-2 border-black pt-4 mt-6 text-center">
          <p className="text-sm font-serif italic text-gray-600">
            Continued coverage of the Wyoming Pyramid discovery will appear in future editions of The WyoVerse Pioneer.
            Readers with information about similar structures in the territory are encouraged to contact our editorial
            office.
          </p>
        </div>
      </div>
    </div>
  )
}
