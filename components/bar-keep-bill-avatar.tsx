import Image from "next/image"

const BarKeepBillAvatar = () => {
  return (
    <Image
      src="/images/bill-avatar.png"
      alt="Bar Keep Bill"
      width={96}
      height={96}
      className="h-24 w-24 rounded-full shadow-lg"
      priority
    />
  );
};

export default BarKeepBillAvatar;
