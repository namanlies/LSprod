import { routes } from "@/lib/routes";
import {
  CreateCosmos,
  GenerateLinks,
  Analytics,
  WelcomeBack,
  UserInfo,
  GetSponsored,
} from "@/components/DashboardPage";

import logo1 from "@/assets/svg/appopennerLogo.svg";
import logo2 from "@/assets/svg/logo.svg";
import instagramLogo from "@/assets/svg/instagram-3d.svg";
import youtubeLogo from "@/assets/svg/youtube-3d.svg";
import ProjectCard1 from "@/assets/svg/project1.png";
import ProjectCard2 from "@/assets/svg/project2.jpg";
import ProjectCard3 from "@/assets/svg/project3.jpg";

const links = [
  {
    imgLink: logo1,
    name: "AppOpener",
    link: routes.DomainMarketplace,
    comingSoon: false,
  },
  {
    imgLink: logo2,
    name: "Branéd Link",
    link: routes.DomainMarketplace,
    comingSoon: false,
  },
  {
    imgLink: logo2,
    name: "Deet Links",
    link: routes.DomainMarketplace,
    comingSoon: false,
  },
  {
    imgLink: logo2,
    name: "Form Links",
    link: routes.DomainMarketplace,
    comingSoon: false,
  },
];

const gauges = [
  {
    fillColor: "#b03199",
    percentage: 0.5,
    logo: instagramLogo,
    metric: "22M",
    name: "Instagram",
    button: "View More",
    width: "100px",
  },
  {
    fillColor: "#E73030",
    percentage: 0.8,
    logo: youtubeLogo,
    metric: "2.1M",
    name: "YouTube",
    button: "View More",
    width: "100px",
  },
];

const sponsors = [
  {
    id: "1",
    img: ProjectCard3,
    title: "Travel",
    smallTitle: "Project#1",
    subTitle:
      "As Uber works through a huge amount of internal management turmoil.",
  },
  {
    id: "2",
    img: ProjectCard1,
    title: "Fashion",
    smallTitle: "Project#2",
    subTitle:
      "Music is something that every person has his or her own specific opinion about.",
  },
  {
    id: "3",
    img: ProjectCard2,
    title: "Equipment",
    smallTitle: "Project#3",
    subTitle:
      "Different people have different taste, and various types of music.",
  },
];

export default function DashboardPage() {
  return (
    <main className="p-3 pt-0 lg:p-6 overflow-auto min-h-screen">
      <UserInfo />

      <div className="flex flex-col lg:grid lg:grid-cols-4 lg:gap-x-4 gap-y-2 lg:gap-y-4 lg:mt-4 mt-2">
        <WelcomeBack />
        <Analytics gauges={gauges} setDetails={{}} setIsOpen={false} />
        <CreateCosmos comingSoon={true} />
        <GenerateLinks links={links} />
        <GetSponsored sponsors={sponsors} comingSoon={true} />
      </div>
    </main>
  );
}
