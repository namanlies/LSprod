import Link from "next/link";
import Image from "next/image";
import ComingSoon from "../ComingSoon";

export default function GenerateLink({ imgUrl, name, link, comingSoon }) {
  return (
    <div className="relative m-2 cursor-pointer">
      {comingSoon && <ComingSoon />}
      <Link href={link}>
        <div className="flex justify-center items-center flex-col">
          <Image src={imgUrl} alt="" width={50} height={50} priority />
          <p className="text-xs">{name}</p>
        </div>
      </Link>
    </div>
  );
}
