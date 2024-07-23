import Image from "next/image";

export default function ProjectCard({ sponsor }) {
  return (
    <div className=" ">
      <div className="relative w-[100%] h-48 lg:w-[100%] lg:min-w-60 lg:h-32 rounded-lg overflow-hidden mb-2">
        <Image
          src={sponsor.img}
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div>
        <p className="text-[10px]">{sponsor.smallTitle}</p>
        <p className="font-semibold">{sponsor.title}</p>
        <p className="text-[10px]">{sponsor.subTitle}</p>
      </div>
      <div>
        <button className="border-[1px] border-white  rounded-lg mt-3 hover:bg-white hover:text-black">
          <p className="text-[10px] hover:text-black px-4 py-1">VIEW ALL</p>
        </button>
      </div>
    </div>
  );
}
