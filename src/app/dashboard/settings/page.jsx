"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import edit from "@/assets/svg/edit.svg";
import ProfileIcon from "@/assets/user.png";

export default function SettingsPage() {
  const { user } = useSelector((state) => state.userReducer);

  return (
    <div className="px-6 py-4 lg:max-w-[800px] w-[100vw]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-lg">Profile</p>
          <p className="text-[10px]">
            Update your photo and personal details here
          </p>
        </div>
        <div className="col-span-2 flex justify-end">
          <div className="relative">
            <div className="relative w-14 h-14 rounded overflow-hidden">
              <Image
                src={user?.profileImg.length ? user?.profileImg : ProfileIcon}
                alt="Profile image"
                fill
              />
            </div>
            <Image
              src={edit}
              alt="edit"
              height={20}
              width={20}
              priority
              className="rounded-full absolute bottom-[-5px] left-[-5px] bg-[#000000bc] cursor-pointer"
            />
            <button className="rounded-full absolute bottom-[-5px] right-[-5px] bg-[#FF0000ca] cursor-pointer w-[18px] h-[18px]">
              <p className="text-[10px]">X</p>
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <p className="text-sm">Username</p>
        <div className="lg:w-[500px] rounded overflow-hidden">
          <input
            type="text"
            className="border-[1px] border-white rounded px-8 text-sm bg-[#00000029]"
            placeholder="Enter your name"
          />
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <p className="text-sm">Website</p>
        <div className="lg:w-[500px]">
          <input
            type="text"
            className="border-[1px] border-white rounded px-8 text-sm bg-[#00000029]"
            placeholder="Enter your brand domain website"
          />
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <p className="text-sm">Location</p>
        <div className="lg:w-[500px]">
          <input
            type="text"
            className="border-[1px] border-white rounded px-8 text-sm bg-[#00000029]"
            placeholder="Enter your location"
          />
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-sm">Alternative contact email</p>
          <p className="text-[10px]">
            Enter an alternative email if you&apos;d like to add
          </p>
        </div>
        <div className="lg:w-[500px]">
          <input
            type="text"
            className="border-[1px] border-white rounded px-8 text-sm bg-[#00000029]"
            placeholder="Enter your contact email"
          />
        </div>
      </div>
    </div>
  );
}
