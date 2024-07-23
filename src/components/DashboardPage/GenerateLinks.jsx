import ComingSoon from "../ComingSoon";
import GenerateLink from "./GenerateLink";

export default function GenerateLinks({ links, comingSoon }) {
  return (
    <div className="bg-[#090F29] rounded-lg p-4 relative">
      {comingSoon && <ComingSoon />}
      <p className="font-bold">Generate Links</p>
      <p className="text-[10px]">Accounts</p>
      <div className="grid grid-cols-2 gap-4 p-4">
        {links.map((link, i) => (
          <GenerateLink
            comingSoon={link.comingSoon}
            key={i}
            imgUrl={link.imgLink}
            name={link.name}
            link={link.link}
          />
        ))}
      </div>
    </div>
  );
}
