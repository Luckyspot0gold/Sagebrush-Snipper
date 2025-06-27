import { NextResponse } from "next/server"
import { weatherAPI } from "@/lib/weather-api"

export async function GET() {
  try {
    const weatherData = await weatherAPI.getCurrentWeather()

    return NextResponse.json({
      success: true,
      data: weatherData,
      location: "Cheyenne, Wyoming",
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Weather API error:", error)

    return NextResponse.json({
      success: false,
      data: {
        temperature: 45,
        condition: "Data Unavailable",
        humidity: 50,
        windSpeed: 10,
        windDirection: "W",
        pressure: 3000,
        visibility: 10,
        uvIndex: 5,
        lastUpdated: new Date().toISOString(),
      },
      location: "Cheyenne, Wyoming",
      timestamp: new Date().toISOString(),
      error: "Weather service temporarily unavailable",
    })
  }
}
