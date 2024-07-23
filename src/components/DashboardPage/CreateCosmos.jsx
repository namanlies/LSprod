"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import ComingSoon from "../ComingSoon";

export default function CreateCosmos({ comingSoon }) {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="bg-[#090F29] rounded-lg p-4 relative">
      {comingSoon && <ComingSoon />}
      <div className="flex justify-between">
        <p className="font-bold">Creator Cosmos</p>
        <div>
          <p className="text-sm cursor-pointer hover:border-b-[1px] hover:border-white">
            View more
          </p>
        </div>
      </div>
      <p className="text-[10px] mt-2">
        Hi, I’m {user?.name}, Decisions: If you can’t decide, the answer is no.
        If two equally difficult paths, choose the one more painful in the short
        term (pain avoidance is creating an illusion of equality).
      </p>
      <div className="logo_border h-[2px] w-[80%] m-1" />
      <p className="text-[10px]">
        Full Name: <span>{user?.name}</span>
      </p>
      <p className="text-[10px]">
        Mobile: <span>{user?.mobileNo}</span>
      </p>
      <p className="text-[10px]">
        Email: <span>{user?.email}</span>
      </p>
      <p className="text-[10px]">
        Location: <span>{user?.country}</span>
      </p>

      <p className="text-[10px] flex gap-2">
        Social Media:
        {user?.facebookUrl && (
          <Link href={user?.facebookUrl} passHref target="_blank">
            <span className="cursor-pointer">
              <BsFacebook />
            </span>
          </Link>
        )}
        {user?.twitterUrl && (
          <Link href={user?.twitterUrl} passHref target="_blank">
            <span className="cursor-pointer">
              <BsTwitter />
            </span>
          </Link>
        )}
        {user?.instagramUrl && (
          <Link href={user?.instagramUrl} passHref target="_blank">
            <span className="cursor-pointer">
              <BsInstagram />
            </span>
          </Link>
        )}
      </p>
    </div>
  );
}
