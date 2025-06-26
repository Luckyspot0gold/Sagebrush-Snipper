import { NextResponse } from "next/server"
import { weatherAPI } from "@/lib/weather-api"

export async function GET() {
  try {
    console.log("🌤️ Fetching real-time weather data for Wyoming...")

    const weatherData = await weatherAPI.getCurrentWeather("Cheyenne,WY,US")

    console.log(`✅ Weather data retrieved: ${weatherData.temperature}°F, ${weatherData.condition}`)

    return NextResponse.json({
      success: true,
      data: weatherData,
      timestamp: new Date().toISOString(),
      source: "Wyoming Weather Service",
    })
  } catch (error) {
    console.error("💥 Weather API error:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Weather service unavailable",
        data: {
          temperature: 45,
          condition: "Partly Cloudy",
          description: "Weather service temporarily unavailable",
          humidity: 45,
          windSpeed: 12,
          pressure: 30.0,
          visibility: 10,
          uvIndex: 3,
          location: "Wyoming Territory",
          lastUpdated: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
        source: "Fallback Weather Data",
      },
      { status: 200 },
    )
  }
}
