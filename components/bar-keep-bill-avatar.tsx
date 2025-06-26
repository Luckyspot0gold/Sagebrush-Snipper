import Image from "next/image"

export function BarKeepBillAvatar() {
  return (
    <div className="relative">
      <Image
        src="/placeholder.svg?height=96&width=96&text=Bar+Keep+Bill"
        alt="Bar Keep Bill"
        width={96}
        height={96}
        className="h-24 w-24 rounded-full shadow-lg border-4 border-amber-800"
      />
      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
    </div>
  )
}

export default BarKeepBillAvatar
