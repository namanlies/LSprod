"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { RiMenu4Line } from "react-icons/ri";
import { setAuthLogout, setAuthState } from "@/redux/features/authSlice";
import { getUserFromToken } from "@/lib/userInfo";
import Sidebar from "@/components/Sidebar";
import Loader from "@/components/Loader";
import logo from "@/assets/svg/logo.svg";

export default function DashboardLayout({ children }) {
  const [isLoading, setIsLoading] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const { authState } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  const toggleSidebar = () => {
    setOpenSideBar((prev) => !prev);
  };

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const user = await getUserFromToken();
        if (user?.success == false) {
          dispatch(setAuthLogout());
          setCookie("token", "");
          router.push("/");
        }
        dispatch(setAuthState({ authState: true, user: user }));
      } catch (error) {
        dispatch(setAuthLogout());
        setCookie("token", "");
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    if (!authState) {
      getUser();
    }
  }, [dispatch, authState, router]);

  return (
    <div className="flex h-screen overflow-hidden flex-col lg:flex-row">
      <Sidebar openSideBar={openSideBar} />

      <div className="lg:hidden sticky">
        <div className="relative flex justify-center flex-col items-center bg-[#090F29] py-1">
          <div className="absolute top-0 left-0">
            <RiMenu4Line
              size={50}
              className="mx-4 my-2 glass p-2"
              onClick={toggleSidebar}
            />
          </div>
          <Image src={logo} alt="logo" height={50} width={50} priority />
          <div className="logo_border h-[2px] w-20 mt-1" />
        </div>
      </div>

      <div className="relative">
        <div className="gradient" />
      </div>
      <div className="relative mx-auto overflow-auto w-[100%] lg:w-[1100px]">
        <div
          onClick={() => setOpenSideBar(false)}
          className={`${
            openSideBar &&
            "before:bg-black before:opacity-40 before:w-[100%] before:h-[100%] relative before:absolute before:top-0 before:left-0 z-30"
          }`}
        >
          {children}
        </div>
      </div>
      <Loader modalIsOpen={isLoading} />
    </div>
  );
}
