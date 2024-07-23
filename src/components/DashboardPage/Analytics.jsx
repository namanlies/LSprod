"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import Gauge from "../Gauge";
import ComingSoon from "../ComingSoon";
import { routes } from "@/lib/routes";

export default function Analytics({
  comingSoon,
  gauges,
  setDetails,
  setIsOpen,
}) {
  const { user } = useSelector((state) => state.userReducer);
  return (
    <div className="lg:col-span-2 bg-[#090F29] rounded-lg p-4 relative">
      {comingSoon && <ComingSoon />}

      <p className="font-bold">Analytics</p>
      <p className="text-[10px]">
        Hello, {user?.name}! Your Analytics is ready.
      </p>
      <div className="flex flex-wrap flex-col lg:flex-row">
        <div className="flex gap-3 justify-center items-center my-6 lg:m-6">
          {gauges.map((gauge) => (
            <Gauge
              key={gauge.name}
              fillColor={gauge.fillColor}
              percentage={gauge.percentage}
              logo={gauge.logo}
              metric={gauge.metric}
              name={gauge.name}
              button={gauge.name}
              setDetails={setDetails}
              setOpen={setIsOpen}
              width={gauge.width}
            />
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link href={routes.Analytics}>
            <p className="hover:border-b-[1px] hover:border-white text-center">
              View More
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
