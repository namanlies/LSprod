"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { routes } from "@/lib/routes";
import { resetCart } from "@/redux/features/cartSlice";
import { useEffect } from "react";
import ThankYou from "@/assets/thankyou.png";
import Image from "next/image";

export default function PaymentSuccessPAge() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const reference = searchParams.get("reference");

  useEffect(() => {
    dispatch(resetCart());
  }, [dispatch]);

  return (
    <main className="h-[100vh] flex justify-center items-center flex-col gap-2">
      <div className="border p-10 rounded-lg bg-[#cacaca7d]">
        <div className="flex justify-center items-center mb-4">
          <Image src={ThankYou} height={100} width={300} alt="Thankyou" />
        </div>
        <p className="text-center text-3xl pb-6">Order Successfully Placed</p>
        <p className="text-center text-2xl">
          Welcome to the{" "}
          <span className="text-blue-400 font-semibold">Branéd</span> world
        </p>
        <p className="text-center">
          Ref No.:{" "}
          <span className="text-blue-400 font-semibold">{reference}</span>
        </p>
      </div>
      <Link href={routes.DashboardHome}>
        <button className="border-2 px-4 py-2 rounded-lg hover:bg-white bg-[#cacaca7d] hover:text-black text-white">
          Home
        </button>
      </Link>
    </main>
  );
}
