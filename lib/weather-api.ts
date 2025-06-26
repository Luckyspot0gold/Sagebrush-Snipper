interface WeatherData {
  temperature: number
  condition: string
  description: string
  humidity: number
  windSpeed: number
  pressure: number
  visibility: number
  uvIndex: number
  location: string
  lastUpdated: string
}

class WeatherAPI {
  private baseUrl = "https://api.openweathermap.org/data/2.5"

  // Using a free tier API key - in production, you'd want to use environment variables
  private apiKey = "demo" // This would be process.env.OPENWEATHER_API_KEY

  async getCurrentWeather(city = "Cheyenne,WY,US"): Promise<WeatherData> {
    try {
      // For demo purposes, we'll simulate real weather data
      // In production, you'd make actual API calls
      const response = await this.simulateWeatherAPI(city)
      return response
    } catch (error) {
      console.error("Weather API error:", error)
      return this.getFallbackWeather()
    }
  }

  private async simulateWeatherAPI(city: string): Promise<WeatherData> {
    // Simulate realistic Wyoming weather patterns
    const now = new Date()
    const hour = now.getHours()
    const month = now.getMonth()

    // Wyoming seasonal temperature ranges
    let baseTemp: number
    if (month >= 11 || month <= 2) {
      // Winter
      baseTemp = 25 + Math.random() * 20 // 25-45°F
    } else if (month >= 3 && month <= 5) {
      // Spring
      baseTemp = 45 + Math.random() * 25 // 45-70°F
    } else if (month >= 6 && month <= 8) {
      // Summer
      baseTemp = 65 + Math.random() * 25 // 65-90°F
    } else {
      // Fall
      baseTemp = 40 + Math.random() * 30 // 40-70°F
    }

    // Daily temperature variation
    const dailyVariation = Math.sin(((hour - 6) * Math.PI) / 12) * 15
    const temperature = Math.round(baseTemp + dailyVariation)

    // Weather conditions based on temperature and randomness
    const conditions = [
      "Clear Sky",
      "Partly Cloudy",
      "Cloudy",
      "Light Snow",
      "Snow",
      "Sunny",
      "Overcast",
      "Windy",
      "Foggy",
    ]

    let condition: string
    let description: string

    if (temperature < 32) {
      condition = Math.random() > 0.5 ? "Snow" : "Cloudy"
      description = condition === "Snow" ? "Light snow expected" : "Cold and cloudy"
    } else if (temperature > 75) {
      condition = Math.random() > 0.3 ? "Sunny" : "Partly Cloudy"
      description = condition === "Sunny" ? "Perfect frontier weather" : "Warm with some clouds"
    } else {
      condition = conditions[Math.floor(Math.random() * conditions.length)]
      description = "Typical Wyoming weather"
    }

    return {
      temperature,
      condition,
      description,
      humidity: Math.round(30 + Math.random() * 40), // 30-70%
      windSpeed: Math.round(5 + Math.random() * 15), // 5-20 mph
      pressure: Math.round(29.8 + Math.random() * 0.4), // 29.8-30.2 inHg
      visibility: Math.round(8 + Math.random() * 2), // 8-10 miles
      uvIndex: Math.max(0, Math.round((hour - 6) / 2)), // UV based on time
      location: "Cheyenne, Wyoming",
      lastUpdated: now.toISOString(),
    }
  }

  private getFallbackWeather(): WeatherData {
    return {
      temperature: 45,
      condition: "Partly Cloudy",
      description: "Typical frontier weather",
      humidity: 45,
      windSpeed: 12,
      pressure: 30.0,
      visibility: 10,
      uvIndex: 3,
      location: "Wyoming Territory",
      lastUpdated: new Date().toISOString(),
    }
  }

  // Get weather for multiple Wyoming cities
  async getWyomingWeather(): Promise<WeatherData[]> {
    const cities = ["Cheyenne,WY,US", "Casper,WY,US", "Laramie,WY,US", "Jackson,WY,US"]

    const weatherPromises = cities.map((city) => this.getCurrentWeather(city))
    return Promise.all(weatherPromises)
  }
}

export const weatherAPI = new WeatherAPI()
