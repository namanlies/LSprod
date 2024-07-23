"use client";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import toast from "react-hot-toast";
import linkIcon from "@/assets/svg/link-icon.svg";
import { regex } from "@/lib/urlRegex";
import { getCookie } from "cookies-next";
import Loader from "../Loader";

export default function GenerateShortUrl({ user, setLoadTable }) {
  const token = getCookie("token");
  const [link, setLink] = useState("");
  const [hostname, setHostname] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [createdMsg, setCreatedMsg] = useState({
    success: false,
    msg: "",
    link: undefined,
  });

  const generateLink = async () => {
    if (regex.test(link)) {
      setIsLoading(true);
      let data = JSON.stringify({
        link,
        host: hostname,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/links/shorten`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };

      try {
        const { data, status } = await axios.request(config);
        if (data.success) {
          setHostname(undefined);
          setLink("");
          setCreatedMsg(data);
          setLoadTable((prev) => !prev);
          toast.success("Link created");
        } else {
          toast.error("something went wrong... Please try again!");
          setCreatedMsg({
            success: false,
            msg: "something went wrong... Please try again!",
          });
        }
      } catch (error) {
        toast.error("something went wrong... Please try again!");
        setCreatedMsg({
          success: false,
          msg: "something went wrong... Please try again!",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Invalid link... Please check and try again!");
      setCreatedMsg({
        success: false,
        msg: "Invalid link... Please check and try again!",
      });
    }
  };

  useEffect(() => {
    const getHostname = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/links/host?uri=${link}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data, status } = await axios.request(config);
        if (data.success && data.hostname != "www") {
          setHostname(data.hostname);
        } else {
          setHostname(undefined);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (link.length) {
      getHostname();
    } else {
      setHostname(undefined);
    }
  }, [link]);

  return (
    <div className="bg-[#090F29] p-4 rounded-lg overflow-hidden w-[600px] pb-14 relative">
      <p>Generate Link</p>
      <p className="text-xs">Hello, {user?.name}! You can generate the links</p>

      <div className="flex px-6 justify-between items-center mt-4 flex-col lg:flex-row">
        <div className="flex bg-[#101a46] py-1 px-2 rounded-lg">
          <input
            className="w-[300px] bg-[#ffffff00]"
            type="text"
            placeholder="Paste the link here"
            value={link}
            onChange={(e) => {
              setLink(e.target.value.trim());
              setCreatedMsg({ msg: "" });
            }}
          />
          <Image
            className="cursor-pointer"
            src={linkIcon}
            alt=""
            height={35}
            width={35}
            onClick={() => {
              navigator.clipboard.readText().then((text) => {
                setLink(text);
              });
            }}
          />
        </div>
        <div className="flex justify-end w-[100%] mt-3 lg:mt-0">
          <button
            className="bg-[#0075FF] py-2 px-4 rounded-lg hover:bg-[#0077ff9c]"
            onClick={generateLink}
          >
            Generate link
          </button>
        </div>
      </div>

      <div className="absolute left-14 bottom-4">
        {createdMsg.success ? (
          <Link
            href={createdMsg.link}
            rel="noopener noreferrer"
            target="_blank"
            className="underline text-blue-400"
          >
            {createdMsg.link}
          </Link>
        ) : (
          <span className="text-red-500">{createdMsg.msg}</span>
        )}
      </div>

      <div className="absolute left-14 bottom-1">
        {hostname && hostname === "youtube" && (
          <AiFillYoutube color="red" size={40} />
        )}
        {hostname && hostname === "instagram" && (
          <AiFillInstagram color="#C805d1" size={40} />
        )}
        {hostname && hostname === "twitter" && (
          <AiFillTwitterSquare color="skyBlue" size={40} />
        )}
      </div>
      <Loader modalIsOpen={isLoading} />
    </div>
  );
}
