"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useSelector } from "react-redux";
import { routes } from "@/lib/routes";
import { CartModal } from "../Modals";
import edit from "@/assets/svg/edit.svg";
import overviewIcon from "@/assets/svg/overview.svg";
import teamIcon from "@/assets/svg/team.svg";
import projectsIcon from "@/assets/svg/projects.svg";
import ProfileIcon from "@/assets/user.png";

export default function UserInfo() {
  const { user } = useSelector((state) => state.userReducer);
  const [cartModalIsOpen, setCartModalIsOpen] = useState(false);

  return (
    <div className="bg-[#090F29] p-2 rounded-lg justify-between hidden lg:flex">
      <div className="flex gap-2">
        <div className="relative">
          <Image
            src={user?.profileImg.length ? user?.profileImg : ProfileIcon}
            alt="profile"
            height={50}
            width={50}
            className="rounded-lg"
          />

          <Image
            src={edit}
            alt="edit"
            height={20}
            width={20}
            priority
            className="rounded-full absolute bottom-[-5px] right-[-5px] bg-black cursor-pointer"
          />
        </div>

        <div>
          <p>{user?.name}</p>
          <p className="text-xs">Get your branded domain today</p>
        </div>
      </div>

      <div className="flex justify-center items-center gap-2">
        {/* <Link href={routes.} > */}
        <div className="bg-[#0075FF] py-1 px-2 flex cursor-pointer rounded-lg justify-center items-center w-32 gap-1 hover:bg-[#0077ff9c]">
          <Image
            src={overviewIcon}
            alt="get yours"
            width={20}
            height={20}
            priority
          />
          <p className="text-xs">GET YOURS</p>
        </div>
        {/* </Link> */}

        <div
          className="bg-[#0075FF] py-1 px-2 flex cursor-pointer rounded-lg justify-center items-center w-32 gap-1 hover:bg-[#0077ff9c]"
          onClick={() => setCartModalIsOpen(true)}
        >
          <Image src={teamIcon} alt="cart" width={20} height={20} priority />
          <p className="text-xs">CART</p>
        </div>

        <Link href={routes.DomainMarketplace}>
          <div className="bg-[#0075FF] py-1 px-2 flex cursor-pointer rounded-lg justify-center items-center w-32 gap-1 hover:bg-[#0077ff9c]">
            <Image src={projectsIcon} alt=" " width={20} height={20} priority />
            <p className="text-xs">MARKETPLACE</p>
          </div>
        </Link>
      </div>

      <CartModal
        setIsOpen={setCartModalIsOpen}
        modalIsOpen={cartModalIsOpen}
        openLoginModal={() => {}}
      />
    </div>
  );
}
