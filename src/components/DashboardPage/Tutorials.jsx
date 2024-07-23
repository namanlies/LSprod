import Image from "next/image";
import Link from "next/link";
import video1 from "@/assets/svg/video1.svg";
import video2 from "@/assets/svg/video2.svg";
import video3 from "@/assets/svg/video3.svg";
import video4 from "@/assets/svg/video4.svg";

export default function Tutorials() {
  const data = [
    { id: 1, title: "Use of Analytics", img: video1, link: "" },
    { id: 2, title: "Use of branded link", img: video2, link: "" },
    { id: 3, title: "Use of choice link", img: video3, link: "" },
    { id: 4, title: "Use of From link", img: video4, link: "" },
  ];

  return (
    <>
      <div className="my-4 mt-8">
        <p>Tutorials</p>
        <p className="text-xs">Learn from video</p>
      </div>

      <div className="flex flex-wrap lg:flex-row flex-col gap-4">
        {data.map((link) => (
          <div key={link.id}>
            {/* <Link href={link.link} passHref target="_blank"> */}
            <div className="w-[100%] h-[200px] lg:w-[200px] relative rounded-lg bg-black overflow-hidden">
              <Image
                src={link.img}
                alt={link.title}
                fill
                className="object-cover"
              />
            </div>
            <p>{link.title}</p>
            {/* </Link> */}
          </div>
        ))}
      </div>
    </>
  );
}
