import Image from "next/image"

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Website</h1>
      <p>This is the homepage.</p>

      {/* Example 1: Image with priority (to be updated) */}
      <img src="/logo.svg" alt="Logo" width={120} height={40} loading="eager" />

      {/* Example 2: Another image with priority (to be updated) */}
      <img src="/banner.png" alt="Banner" width={600} height={200} loading="eager" />

      {/* Example 3: Next/Image component (no change needed) */}
      <Image src="/next.svg" alt="Next.js Logo" width={100} height={30} />

      {/* Example 4: Image without priority (no change needed) */}
      <img src="/icon.png" alt="Icon" width={50} height={50} />
    </main>
  )
}
