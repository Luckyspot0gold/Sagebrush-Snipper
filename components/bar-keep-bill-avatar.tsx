import Image from "next/image"

/**
 * Bar Keep Bill’s circular avatar.
 * Can be imported as:
 *   import { BarKeepBillAvatar } from "@/components/bar-keep-bill-avatar"
 * or
 *   import BarKeepBillAvatar from "@/components/bar-keep-bill-avatar"
 */
export function BarKeepBillAvatar() {
  return (
    <Image
      src="/images/bill-avatar.png"
      alt="Bar Keep Bill"
      width={96}
      height={96}
      className="h-24 w-24 rounded-full shadow-lg"
      priority
    />
  )
}

export default BarKeepBillAvatar
