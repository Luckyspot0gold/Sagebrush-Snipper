import { Flame, Snowflake, Zap } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type MarketMood = "Bullish" | "Bearish" | "Volatile" | "Idle"

interface MarketMoodIndicatorProps {
  mood: MarketMood
}

export function MarketMoodIndicator({ mood }: MarketMoodIndicatorProps) {
  const getMoodIcon = () => {
    switch (mood) {
      case "Bullish":
        return <Flame className="h-5 w-5 text-green-500" />
      case "Bearish":
        return <Snowflake className="h-5 w-5 text-blue-500" />
      case "Volatile":
        return <Zap className="h-5 w-5 text-yellow-500" />
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-400" />
    }
  }

  const getMoodDescription = () => {
    switch (mood) {
      case "Bullish":
        return "Market is trending upward"
      case "Bearish":
        return "Market is trending downward"
      case "Volatile":
        return "Market is experiencing high volatility"
      default:
        return "Market is stable"
    }
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-background border">
            {getMoodIcon()}
            <span className="text-sm font-medium">{mood}</span>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{getMoodDescription()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
