"use client";

import Image from "next/image";
import React from "react";
import styled from "styled-components";

function Gauge({
  fillColor,
  percentage,
  logo,
  metric,
  name,
  button,
  setDetails,
  setIsOpen,
}) {
  return (
    <GaugeContainer>
      <div className="w-40">
        <div className="gauge__body relative overflow-hidden bg-[#b4c0be] h-0 w-[100%] pb-[50%]">
          <div
            className="gauge__fill absolute top-[100%] left-0 h-[100%]"
            style={{
              background: fillColor,
              transform: `rotate(${percentage / 2}turn)`,
            }}
          ></div>
          <div className="gauge__cover text-white w-[90%] h-[180%] bg-[#15162c] absolute top-[10%] left-[50%] flex justify-center items-center box-border">
            <div className="flex justify-center items-center flex-col pb-5">
              <Image src={logo} alt="logo" width={30} height={30} priority />
              <p className="text-[12px]">{name}</p>
              <p className="text-[12px] font-semibold">{metric}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p
            className="font-semibold text-[14px] mt-2 text-center cursor-pointer"
            onClick={() => {
              setDetails({ fillColor, percentage, logo, name, metric, button });
              setIsOpen((prev) => !prev);
            }}
          >
            {button}
          </p>
        </div>
      </div>
    </GaugeContainer>
  );
}
export default Gauge;

const GaugeContainer = styled.div`
  .gauge__body {
    border-top-left-radius: 100% 200%;
    border-top-right-radius: 100% 200%;
  }
  .gauge__fill {
    width: inherit;
    transform-origin: center top;
    transform: rotate(0.25turn);
    transition: transform 0.2s ease-out;
  }
  .gauge__cover {
    border-radius: 50%;
    transform: translateX(-50%);
    /* Text */
    padding-bottom: 25%;
    }
  }
`;
