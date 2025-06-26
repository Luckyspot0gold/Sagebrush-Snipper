import type React from "react"
import Image from "next/image"

interface BuiltWithBotBadgeProps {
  alt?: string
  className?: string
  eagerLoad?: boolean
}

const BuiltWithBotBadge: React.FC<BuiltWithBotBadgeProps> = ({
  alt = "Built with a Bot!",
  className,
  eagerLoad = false,
}) => {
  return (
    <Image
      src="/built-with-bot.svg"
      alt={alt}
      width={150}
      height={30}
      className={className}
      loading={eagerLoad ? "eager" : "lazy"}
    />
  )
}

export default BuiltWithBotBadge
