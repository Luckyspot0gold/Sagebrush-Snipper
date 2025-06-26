interface EnvironmentConfig {
  database: {
    url: string
    supabaseUrl: string
    supabaseAnonKey: string
    supabaseServiceKey: string
  }
  apis: {
    groqApiKey: string
    coinbaseApiKey?: string
    coinbaseApiSecret?: string
    avalancheRpcUrl: string
  }
  app: {
    environment: "development" | "production" | "test"
    baseUrl: string
    enableAnalytics: boolean
  }
}

class ConfigManager {
  private config: EnvironmentConfig

  constructor() {
    this.config = this.loadConfig()
    this.validateConfig()
  }

  private loadConfig(): EnvironmentConfig {
    return {
      database: {
        url: process.env.DATABASE_URL || "",
        supabaseUrl: process.env.SUPABASE_SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL || "",
        supabaseAnonKey: process.env.SUPABASE_SUPABASE_ANON_KEY || "",
        supabaseServiceKey: process.env.SUPABASE_SUPABASE_SERVICE_ROLE_KEY || "",
      },
      apis: {
        groqApiKey: process.env.GROQ_API_KEY || "",
        coinbaseApiKey: process.env.COINBASE_API_KEY,
        coinbaseApiSecret: process.env.COINBASE_API_SECRET,
        avalancheRpcUrl: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL || "https://api.avax.network/ext/bc/C/rpc",
      },
      app: {
        environment: (process.env.NODE_ENV as any) || "development",
        baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
        enableAnalytics: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === "true",
      },
    }
  }

  private validateConfig(): void {
    const errors: string[] = []

    // Required environment variables
    if (!this.config.database.url) {
      errors.push("DATABASE_URL is required")
    }

    if (!this.config.apis.groqApiKey) {
      errors.push("GROQ_API_KEY is required")
    }

    if (!this.config.database.supabaseUrl) {
      errors.push("SUPABASE_SUPABASE_NEXT_PUBLIC_SUPABASE_URL is required")
    }

    if (!this.config.database.supabaseServiceKey) {
      errors.push("SUPABASE_SUPABASE_SERVICE_ROLE_KEY is required")
    }

    if (errors.length > 0) {
      console.error("❌ Configuration errors:")
      errors.forEach((error) => console.error(`  - ${error}`))

      if (this.config.app.environment === "production") {
        throw new Error("Invalid configuration for production environment")
      }
    }
  }

  get(): EnvironmentConfig {
    return this.config
  }

  isDevelopment(): boolean {
    return this.config.app.environment === "development"
  }

  isProduction(): boolean {
    return this.config.app.environment === "production"
  }

  getDatabaseUrl(): string {
    return this.config.database.url
  }

  getSupabaseConfig() {
    return {
      url: this.config.database.supabaseUrl,
      anonKey: this.config.database.supabaseAnonKey,
      serviceKey: this.config.database.supabaseServiceKey,
    }
  }
}

export const config = new ConfigManager()
export type { EnvironmentConfig }
