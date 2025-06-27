interface WeatherData {
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  windDirection: string
  pressure: number
  visibility: number
  uvIndex: number
  lastUpdated: string
}

class WyomingWeatherAPI {
  private getSeasonalTemp(): number {
    const now = new Date()
    const month = now.getMonth() + 1
    const hour = now.getHours()

    // Wyoming seasonal temperature ranges (Fahrenheit)
    let baseTemp: number
    if (month >= 12 || month <= 2) {
      // Winter: -10°F to 30°F
      baseTemp = Math.random() * 40 - 10
    } else if (month >= 3 && month <= 5) {
      // Spring: 20°F to 70°F
      baseTemp = Math.random() * 50 + 20
    } else if (month >= 6 && month <= 8) {
      // Summer: 50°F to 90°F
      baseTemp = Math.random() * 40 + 50
    } else {
      // Fall: 10°F to 60°F
      baseTemp = Math.random() * 50 + 10
    }

    // Daily temperature variation using sine wave
    const dailyVariation = Math.sin(((hour - 6) * Math.PI) / 12) * 15
    return Math.round(baseTemp + dailyVariation)
  }

  private getCondition(temp: number): string {
    const conditions = [
      "Clear Skies",
      "Partly Cloudy", 
      "Mostly Sunny",
      "Scattered Clouds",
      "Overcast",
      "Light Breeze",
      "Windy",
      "Calm",
    ]

    if (temp < 20) {
      return Math.random() > 0.5 ? "Snow Flurries" : "Frigid Clear"
    } else if (temp > 80) {
      return Math.random() > 0.5 ? "Hot & Sunny" : "Heat Haze"
    }

    return conditions[Math.floor(Math.random() * conditions.length)]
  }

  async getCurrentWeather(): Promise<WeatherData> {
    const temperature = this.getSeasonalTemp()
    const condition = this.getCondition(temperature)

    return {
      temperature,
      condition,
      humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
      windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 mph
      windDirection: ["N", "NE", "E", "SE", "S", "SW", "W", "NW"][Math.floor(Math.random() * 8)],
      pressure: Math.floor(Math.random() * 100) + 2950, // 29.50-30.50 inHg
      visibility: Math.floor(Math.random() * 5) + 10, // 10-15 miles
      uvIndex: Math.max(0, Math.floor(Math.random() * 11)), // 0-10
      lastUpdated: new Date().toISOString(),
    }
  }
}

export const weatherAPI = new WyomingWeatherAPI()
