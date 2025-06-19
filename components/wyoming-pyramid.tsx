"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Landmark, MapPin, Compass, History } from "lucide-react"

export function WyomingPyramid() {
  return (
    <div className="space-y-6">
      <div className="relative w-full h-64 bg-accent/20 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Landmark className="h-32 w-32 text-muted-foreground opacity-20" />
        </div>
        <div className="relative z-10 text-center p-6">
          <h2 className="text-2xl font-bold">The Mysterious Wyoming Pyramid</h2>
          <p className="text-muted-foreground mt-2">An enigmatic structure with remarkable astronomical alignments</p>
        </div>
      </div>

      <div className="prose max-w-none">
        <p>
          Nestled in the vast Wyoming landscape, a remarkable structure has captured the imagination of researchers and
          visitors alike: the Wyoming Pyramid. This mysterious monument, located at a precise geographical position that
          aligns with significant celestial events, has become a subject of fascination for those interested in ancient
          architecture and astronomical alignments.
        </p>

        <h3>Remarkable Placement</h3>
        <p>
          What makes the Wyoming Pyramid truly extraordinary is its precise placement. Researchers have discovered that
          the structure is positioned at coordinates that create perfect alignments with the summer and winter
          solstices. During these celestial events, the pyramid casts shadows and captures light in patterns that
          suggest an advanced understanding of astronomical principles by its creators.
        </p>

        <h3>Astronomical Significance</h3>
        <p>
          The pyramid's orientation appears to be deliberately aligned with specific star systems, including the
          Pleiades constellation. During certain times of the year, the structure's features frame these celestial
          bodies in ways that could not be coincidental. This has led researchers to believe that the pyramid may have
          served as an ancient observatory or calendar.
        </p>

        <h3>Geological Harmony</h3>
        <p>
          Another fascinating aspect of the Wyoming Pyramid is how it harmonizes with the surrounding landscape. The
          structure appears to be positioned at a point where several geological features converge, creating natural
          energy lines that some researchers believe enhance the pyramid's unique properties. The materials used in its
          construction also appear to be carefully selected from local sources, yet arranged with remarkable precision.
        </p>

        <h3>Cultural Significance</h3>
        <p>
          Local indigenous traditions speak of the area as a place of power and spiritual significance. Some oral
          histories describe the location as a "meeting place between earth and sky" where important ceremonies were
          conducted. These cultural connections add another layer of mystery to the pyramid's purpose and origins.
        </p>

        <h3>Ongoing Research</h3>
        <p>
          Today, the Wyoming Pyramid continues to be studied by archaeologists, astronomers, and historians who are
          working to unravel its secrets. Advanced mapping technologies and seasonal observations are providing new
          insights into this remarkable structure and its relationship to both the landscape and the cosmos.
        </p>

        <p>
          The Wyoming Pyramid stands as a testament to the ingenuity and astronomical knowledge of its creators,
          offering a window into ancient understanding of celestial mechanics and sacred geometry. As research
          continues, this enigmatic structure may reveal even more about its purpose and the civilization that created
          it.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium">Location</h3>
              <p className="text-sm text-muted-foreground">
                Positioned at a precise geographical coordinate that aligns with celestial events
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <Compass className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium">Alignment</h3>
              <p className="text-sm text-muted-foreground">
                Perfectly aligned with solstices and specific star systems
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-start gap-3">
            <History className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium">Origins</h3>
              <p className="text-sm text-muted-foreground">
                Subject of ongoing research and connected to indigenous traditions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button>Explore in Virtual Reality</Button>
      </div>
    </div>
  )
}
