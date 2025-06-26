import Image from "next/image"

export function BuiltWithBoltBadge() {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700 transition-colors"
    >
      <Image
        src="/placeholder.svg?height=20&width=100&text=Bolt.new"
        alt="Built with Bolt.new"
        width={100}
        height={20}
        className="opacity-70"
      />
      <span>Built with Bolt.new</span>
    </a>
  )
}
