"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { routes } from "@/lib/routes";

import ProfileIcon from "@/assets/ProfileIcon";
import VerifyIcon from "@/assets/VerifyIcon";
import AvatarLogo from "@/assets/AvatarLogo";
import DomainIcon from "@/assets/DomainIcon";
import LinkIcon from "@/assets/LinkIcon";
import SellDomainIcon from "@/assets/SellDomainIcon";
import needHelpIcon from "@/assets/svg/help-icon.svg";
import logo from "@/assets/svg/logo.svg";

export default function Sidebar({ openSideBar }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogOut = () => {
    setCookie("token", "");
    router.push(routes.Home);
  };

  return (
    <div
      className={`w-56 lg:w-44 z-50 h-[100%] sidebar flex-col justify-between flex bg-[#090F29] ${
        openSideBar ? "left-0" : "left-[-14rem]"
      } absolute lg:flex lg:static py-6 px-4 transition-all ease-in-out duration-200 overflow-auto`}
    >
      <div>
        <div className="flex flex-col justify-center items-center ">
          <Link href={routes.DashboardHome}>
            <Image src={logo} alt="logo" height={50} width={50} priority />
          </Link>
          <div className="logo_border h-[2px] w-[80%] mt-4" />
        </div>

        <div className="mt-4">
          <p className="lg:text-xs mx-4 font-bold">MANAGE</p>

          <div className="mt-2 flex flex-col gap-1">
            <Link href={routes.DashboardHome}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname === routes.DashboardHome ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    pathname === routes.DashboardHome
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <ProfileIcon
                    color={
                      pathname === routes.DashboardHome ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Home</p>
              </div>
            </Link>

            <Link href={routes.Domain}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname.includes(routes.Domain) ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={` p-2 rounded-lg ${
                    pathname.includes(routes.Domain)
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <DomainIcon
                    color={
                      pathname.includes(routes.Domain) ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Domain</p>
              </div>
            </Link>

            {pathname.includes(routes.Domain) && (
              <div className="ml-4">
                <Link href={routes.Domain}>
                  <div
                    className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                      pathname === routes.Domain ? "bg-[#1A1E37]" : ""
                    }`}
                  >
                    <div
                      className={` p-2 rounded-lg ${
                        pathname === routes.Domain
                          ? "bg-[#0075FF]"
                          : "bg-[#1A1F37]"
                      }`}
                    >
                      <ProfileIcon
                        color={pathname === routes.Domain ? "white" : "#0075FF"}
                      />
                    </div>
                    <p className="lg:text-xs">Dashboard</p>
                  </div>
                </Link>

                <Link href={routes.DomainMarketplace}>
                  <div
                    className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                      pathname === routes.DomainMarketplace
                        ? "bg-[#1A1E37]"
                        : ""
                    }`}
                  >
                    <div
                      className={` p-2 rounded-lg ${
                        pathname === routes.DomainMarketplace
                          ? "bg-[#0075FF]"
                          : "bg-[#1A1F37]"
                      }`}
                    >
                      <SellDomainIcon
                        color={
                          pathname === routes.DomainMarketplace
                            ? "white"
                            : "#0075FF"
                        }
                      />
                    </div>
                    <p className="lg:text-xs">Marketplace</p>
                  </div>
                </Link>
              </div>
            )}

            <Link href={routes.Analytics}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname.includes(routes.Analytics) ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={` p-2 rounded-lg ${
                    pathname.includes(routes.Analytics)
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <AvatarLogo
                    color={
                      pathname.includes(routes.Analytics) ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Analytics</p>
              </div>
            </Link>

            <Link href={routes.Links}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname.includes(routes.Links) ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={` p-2 rounded-lg ${
                    pathname.includes(routes.Links)
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <LinkIcon
                    color={
                      pathname.includes(routes.Links) ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Links</p>
              </div>
            </Link>

            <Link href={routes.Cosmos}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname.includes(routes.Cosmos) ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={` p-2 rounded-lg ${
                    pathname.includes(routes.Cosmos)
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <VerifyIcon
                    color={
                      pathname.includes(routes.Cosmos) ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Create Cosmos</p>
              </div>
            </Link>

            <Link href={routes.Settings}>
              <div
                className={`flex items-center gap-2 hover:bg-[#455ccb] lg:p-1 p-2 rounded-lg ${
                  pathname.includes(routes.Settings) ? "bg-[#1A1E37]" : ""
                }`}
              >
                <div
                  className={` p-2 rounded-lg ${
                    pathname.includes(routes.Settings)
                      ? "bg-[#0075FF]"
                      : "bg-[#1A1F37]"
                  }`}
                >
                  <AvatarLogo
                    color={
                      pathname.includes(routes.Settings) ? "white" : "#0075FF"
                    }
                  />
                </div>
                <p className="lg:text-xs">Settings</p>
              </div>
            </Link>
          </div>
        </div>
        <div className="my-4">
          <p>Resources</p>
          <p className="text-xs hover:underline text-blue-500 cursor-pointer hover:text-blue-400">
            How to sell the Domain
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2">
        <div
          className={`bg-[url(/need-help.png)] bg-cover bg-center p-2 rounded-xl w-[100%]`}
        >
          <Image src={needHelpIcon} alt="" height={30} width={30} priority />

          <p className="bold">Need Help?</p>
          <p className="text-xs">Please check our docs</p>
          <div className="flex justify-center mt-2">
            <button className="bg-[#00000062] py-1 px-4 rounded-xl">
              <p className="text-xs">DOCUMENTATION</p>
            </button>
          </div>
        </div>

        <div className="flex gap-2 ">
          <Link href={routes.Home}>
            <button className="bg-[#0075FF] py-1 px-2 rounded-lg  hover:bg-[#0077ff9c]">
              <p>&#x2190;</p>
            </button>
          </Link>
          <button
            onClick={handleLogOut}
            className="bg-[#0075FF] py-1 px-2 rounded-lg w-24  hover:bg-[#0077ff9c]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
