"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <div className="p-6 pb-4 border-b-[1px]">
      <p className="text-xl">Settings</p>
      <p className="text-[10px]">Manage your profile and payment</p>
      <div className="flex mt-4 gap-4">
        <Link href={routes.Settings}>
          <div
            className={`flex items-center gap-2 hover:bg-[#455ccb] py-1 px-4 rounded-lg ${
              pathname === routes.Settings && "bg-[#222171b0]"
            }`}
          >
            <p
              className={`${
                pathname === routes.Settings && "text-blue-400"
              } text-sm`}
            >
              Profile
            </p>
          </div>
        </Link>
        <Link href={routes.SettingsPayment}>
          <div
            className={`flex items-center gap-2 hover:bg-[#455ccb] py-1 px-4 rounded-lg ${
              pathname === routes.SettingsPayment && "bg-[#222171b0]"
            }`}
          >
            <p
              className={`${
                pathname === routes.SettingsPayment && "text-blue-400"
              } text-sm`}
            >
              Payment
            </p>
          </div>
        </Link>
        <Link href={routes.SettingsTransaction}>
          <div
            className={`flex items-center gap-2 hover:bg-[#455ccb] py-1 px-4 rounded-lg ${
              pathname === routes.SettingsTransaction && "bg-[#222171b0]"
            }`}
          >
            <p
              className={`${
                pathname === routes.SettingsTransaction && "text-blue-400"
              } text-sm`}
            >
              Transaction
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
