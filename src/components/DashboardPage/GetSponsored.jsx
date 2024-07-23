import ComingSoon from "../ComingSoon";
import ProjectCard from "./ProjectCard";

export default function GetSponsored({ comingSoon, sponsors }) {
  return (
    <div className="col-span-3 bg-[#090F29] rounded-lg p-4 relative">
      {comingSoon && <ComingSoon />}
      <div className="flex justify-between">
        <div>
          <p className="font-bold">Get Spawnsered</p>
          <p className="text-[10px]">Get Spawnsered of all the things</p>
        </div>
        <div className="flex justify-center items-center cursor-pointer ">
          <p className="hover:border-b-[1px] hover:border-white">View More</p>
        </div>
      </div>
      <div className="flex mt-4 gap-8 lg:gap-3 flex-col lg:flex-row">
        {sponsors.map((sponsor) => (
          <ProjectCard key={sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}
