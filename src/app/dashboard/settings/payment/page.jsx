"use client";

import Image from "next/image";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdEmail } from "react-icons/md";

import visaIcon from "@/assets/svg/visa.svg";
import mastercardIcon from "@/assets/svg/mastercard.svg";
import phonePe from "@/assets/svg/phonepe.svg";
import google from "@/assets/svg/google-pay.svg";
import paytm from "@/assets/svg/paytm.svg";
import bhim from "@/assets/svg/bhim.svg";
import mobikwik from "@/assets/svg/mobikwik.svg";
import sbipay from "@/assets/svg/sbi-pay.svg";
import axisBank from "@/assets/svg/axis-bank.svg";
import paypal from "@/assets/svg/paypal.svg";

export default function PaymentPage() {
  const { user } = useSelector((state) => state.userReducer);

  const paymentMethods = [
    {
      id: 1,
      imgUrl: visaIcon,
      name: "Visa",
      expiry: "05/2024",
      lastDigit: "1234",
    },
    {
      id: 2,
      imgUrl: mastercardIcon,
      name: "Mastercard",
      expiry: "04/2026",
      lastDigit: "5678",
    },
  ];

  const upiPaymentMethods = [{ id: 1, name: "Paypal", imgUrl: paypal }];

  const [card, setCard] = useState({});

  return (
    <div className="px-6 py-4 max-w-[800px] ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-lg">Payment method</p>
          <p className="text-[10px]">
            Update your photo and personal details here
          </p>
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-sm">Contact email</p>
          <p className="text-[10px]">where should invoice be sent?</p>
        </div>
        <div className="lg:w-[500px] flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="flex justify-center mt-1">
              <input
                type="radio"
                name="previousMail"
                id="previousMail"
                className="h-4 w-4"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sx">Send to my account email</p>
              <p className="text-[10px]">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex justify-center mt-1">
              <input
                type="radio"
                name="previousMail"
                id="previousMail"
                className="h-4 w-4"
              />
            </div>
            <div className="flex flex-col">
              <p className="text-sx">Send to my account email</p>
              <div className="flex gap-4">
                <div className="flex bg-[#00000029] px-2 border-[1px] border-white rounded justify-center items-center">
                  <p className="text-2xl">
                    <MdEmail />
                  </p>
                  <input
                    type="text"
                    placeholder="Enter your alternative email"
                    className="bg-[#00000000] text-xs"
                  />
                </div>
                <button className="bg-[#0075FF] px-4 rounded hover:bg-[#0077ff9c]">
                  <p className="text-xs">Save</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-sm">Card Details</p>
          <p className="text-[10px]">Select default payment method.</p>
        </div>
        <div className="flex gap-2 flex-col lg:w-[500px]">
          {paymentMethods.map((paymentMethod) => (
            <div
              className={`p-2 border-[1px]  flex rounded gap-2 hover:bg-[#0077ff3d] cursor-pointer ${
                card.id === paymentMethod.id
                  ? "border-[#0075FF] bg-[#0077ff3d]"
                  : "border-[#ffffff82]"
              } `}
              key={paymentMethod.id}
              onClick={() => setCard(paymentMethod)}
            >
              <div className="bg-white px-3 rounded h-[30px]">
                <div className="relative w-8 h-8">
                  <Image
                    src={paymentMethod.imgUrl}
                    alt={paymentMethod.name}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
              <div className="flex justify-between w-[100%]">
                <div>
                  <p className="text-[12px]">
                    {paymentMethod.name} ending in {paymentMethod.lastDigit}
                  </p>
                  <p className="text-[10px]">Expiry {paymentMethod.expiry}</p>
                  <div className="flex gap-4">
                    <button>
                      <p className="text-[10px]">Set as default</p>
                    </button>
                    <button>
                      <p className="text-[10px]">Edit</p>
                    </button>
                  </div>
                </div>
                <div className="flex justify-center items-center pr-3">
                  <input type="radio" name="card" id="card" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-sm">UPI App</p>
          <p className="text-[10px]">Select default payment method.</p>
        </div>
        <div className="flex gap-2 flex-col lg:w-[500px]">
          {upiPaymentMethods.map((method) => (
            <div key={method.id}>
              <div className="relative h-16 w-12 cursor-pointer">
                <Image
                  src={method.imgUrl}
                  alt={method.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#ffffff82] h-[1px] my-4" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div>
          <p className="text-sm">Renewal</p>
          <p className="text-[10px]">Select default renewal method.</p>
        </div>
        <div className="flex gap-6 lg:w-[500px]">
          <button className="bg-[#0075FF] rounded w-44 hover:bg-[#0077ff9c] p-2">
            <p className="lg:text-xs">Automatic Connect</p>
          </button>
          <button className="bg-[#0075FF] rounded w-44 hover:bg-[#0077ff9c] p-2">
            <p className="lg:text-xs">Manual Connect</p>
          </button>
        </div>
      </div>
    </div>
  );
}
