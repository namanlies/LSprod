"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  GenerateShortUrl,
  UrlTable,
  UserInfo,
  ChoiceLinks,
  BrandedLinks,
  DeetLinks,
  FormLinks,
  Tutorials,
} from "@/components/DashboardPage";

import AstronautImg from "@/assets/svg/astronaut.png";

export default function LinksPage() {
  const { user } = useSelector((state) => state.userReducer);
  const [loadTable, setLoadTable] = useState(false);

  return (
    <main className="p-3 lg:py-6 overflow-auto min-h-screen">
      <UserInfo />

      <div className="flex mt-4 gap-4 justify-center">
        <GenerateShortUrl user={user} setLoadTable={setLoadTable} />
        <Image
          src={AstronautImg}
          alt="AstronautImg"
          height={100}
          width={80}
          className="astronaut hidden lg:disabled:block"
        />
      </div>

      <p className="text-center mt-4">TO LEARN WITH VIDEO</p>
      <div className="w-[100%] overflow-auto">
        <UrlTable user={user} loadTable={loadTable} />
      </div>

      <div className="my-4 mt-8">
        <p>Other Tools</p>
        <p className="text-xs">Upcoming projects</p>
      </div>

      <div className="flex flex-col gap-2">
        <ChoiceLinks />
        <BrandedLinks />
        <DeetLinks />
        <FormLinks />
      </div>

      <Tutorials />
    </main>
  );
}
