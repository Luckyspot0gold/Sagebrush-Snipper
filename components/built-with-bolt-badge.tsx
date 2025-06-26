import Image from "next/image"

export function BuiltWithBoltBadge() {
  return (
    <a
      href="https://bolt.new"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-gray-700"
    >
      <Image src="/bolt-badge.svg" alt="Built with Bolt.new" width={100} height={20} priority />
      Built with Bolt.new
    </a>
  )
}
