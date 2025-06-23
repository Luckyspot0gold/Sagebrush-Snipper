"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCasino } from "@/components/casino-provider"

const landParcels = [
  {
    id: 1,
    name: "Yellowstone Gateway",
    coordinates: "44.4280° N, 110.5885° W",
    size: "2.5 acres",
    price: 500,
    features: ["Mountain View", "River Access", "Historic Trail"],
    rarity: "Epic",
  },
  {
    id: 2,
    name: "Prairie Wind Ranch",
    coordinates: "42.8618° N, 106.3131° W",
    size: "5.0 acres",
    price: 750,
    features: ["Wind Power", "Grazing Rights", "Mineral Rights"],
    rarity: "Legendary",
  },
  {
    id: 3,
    name: "Devil's Tower Vista",
    coordinates: "44.5902° N, 104.7146° W",
    size: "1.8 acres",
    price: 300,
    features: ["Monument View", "Climbing Access", "Sacred Land"],
    rarity: "Rare",
  },
]

export function LandDeeds() {
  const { state, dispatch } = useCasino()
  const [selectedParcel, setSelectedParcel] = useState(null)

  const purchaseLand = (parcel: any) => {
    if (state.tonkaTokens >= parcel.price) {
      dispatch({ type: "UPDATE_TOKENS", payload: -parcel.price })
      dispatch({ type: "ADD_LAND_DEED" })
      alert(`Congratulations! You now own ${parcel.name}`)
    } else {
      alert("Insufficient TONKA tokens")
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-amber-800 mb-2">Wyoming Land Deeds</h2>
        <p className="text-amber-600">Own a piece of the digital frontier</p>
        <Badge variant="outline" className="mt-2">
          Carbon County MOU - 10 Acres Available
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {landParcels.map((parcel) => (
          <Card key={parcel.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{parcel.name}</CardTitle>
                <Badge
                  variant={parcel.rarity === "Legendary" ? "default" : "secondary"}
                  className={
                    parcel.rarity === "Legendary"
                      ? "bg-purple-600"
                      : parcel.rarity === "Epic"
                        ? "bg-orange-600"
                        : "bg-blue-600"
                  }
                >
                  {parcel.rarity}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{parcel.coordinates}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-amber-50 p-3 rounded-lg">
                <div className="text-2xl mb-2">🏞️</div>
                <p className="font-semibold">{parcel.size}</p>
                <p className="text-sm text-gray-600">Non-arable land</p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <div className="flex flex-wrap gap-1">
                  {parcel.features.map((feature) => (
                    <Badge key={feature} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <p className="text-2xl font-bold text-amber-600">{parcel.price} TONKA</p>
                  <p className="text-xs text-gray-500">+ AR Historical Layers</p>
                </div>
                <Button
                  onClick={() => purchaseLand(parcel)}
                  disabled={state.tonkaTokens < parcel.price}
                  className="bg-amber-600 hover:bg-amber-700"
                >
                  Purchase
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Land Pool Merge Contracts */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">🤝 LandPool Merge Contracts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 mb-4">
            Combine adjacent land parcels to create larger estates and unlock special bonuses!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Ranch Estate (10+ acres)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Unlock horse breeding NFTs</li>
                <li>• 50% bonus on all casino games</li>
                <li>• Exclusive "Ranch MBA" curriculum access</li>
              </ul>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Frontier Kingdom (25+ acres)</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Governance voting rights</li>
                <li>• Custom land development tools</li>
                <li>• Revenue sharing from tourism NFTs</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
