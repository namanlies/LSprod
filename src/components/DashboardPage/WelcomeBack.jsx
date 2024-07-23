"use client";

import { useSelector } from "react-redux";

export default function WelcomeBack() {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="bg-[url(/welcome-back.png)] bg-cover bg-center p-4 rounded-lg flex flex-col justify-between h-36 lg:h-auto">
      <div>
        <p className="text-white text-xl font-bold">Welcome Back!</p>
        <p className="text-xs">Nice to see you, {user?.name}!</p>
      </div>

      <div className="flex items-center">
        <p className="text-sm cursor-pointer hover:border-b-[1px] hover:border-white">
          Profile Dashboard
        </p>{" "}
        <p> &#x2192;</p>
      </div>
    </div>
  );
}
