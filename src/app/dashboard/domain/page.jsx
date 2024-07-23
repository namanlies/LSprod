"use client";

import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCookie } from "cookies-next";
import {
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import { regex } from "@/lib/urlRegex";
import { SubDomainTable } from "@/components/DashboardPage";
import Loader from "@/components/Loader";

const availableHost = ["youtube", "instagram", "facebook", "twitter"];

export default function DomainPage() {
  const token = getCookie("token");
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDomainId, setSelectedDomainId] = useState("");
  const [selectedDomainName, setSelectedDomainName] = useState("");
  const [host, setHost] = useState("");
  const [route, setRoute] = useState("");
  const [link, setLink] = useState("");
  const [hostname, setHostname] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [createdMsg, setCreatedMsg] = useState({
    success: true,
    msg: "",
    link: undefined,
  });

  const currentDomain = selectedDomainName.length
    ? `https://${selectedDomainName}${host.length ? `/${host}` : ""}${
        route.length ? `/${route}` : ""
      }`
    : "";

  const handleDomainSelect = (e) => {
    const selectedSub = e.target.value;
    setSelectedDomain(selectedSub);
    const { _id, domain } = JSON.parse(selectedSub);
    setSelectedDomainName(domain);
    setSelectedDomainId(_id);
  };

  const handleConnect = async () => {
    if (regex.test(link)) {
      setIsLoading(true);
      let data, url;
      if (host.length || route.length) {
        url = `${process.env.API_URL}/api/subdomain/checkout`;
        data = {
          subDomain: currentDomain,
          domainId: selectedDomainId,
          link,
          host: hostname,
        };
      } else {
        url = `${process.env.API_URL}/api/domain/update`;
        data = {
          host: hostname,
          newUrl: link,
          _id: selectedDomainId,
        };
      }

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data,
      };

      try {
        const { data } = await axios.request(config);
        console.log(data);
        if (data.success) {
          if (data.added) {
            setLink("");
            setHost("");
            setRoute("");
            getDomains();
            toast.success("Link created");
            setCreatedMsg({
              success: true,
              msg: "",
              link: undefined,
            });
          } else {
            toast.error("Subdomain already exists");
            setCreatedMsg({
              success: false,
              msg: "Subdomain already exists",
            });
          }
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

  // useEffect(() => {
  //   if ("geolocation" in window.navigator) {
  //     // Geolocation is available in this browser
  //     window.navigator.geolocation.getCurrentPosition(
  //       function (position) {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;

  //         console.log("Latitude:", latitude);
  //         console.log("Longitude:", longitude);

  //         fetch(`https://geocode.xyz/${latitude},${longitude}?json=1`)
  //           .then((response) => response.json())
  //           .then((data) => {
  //             const userCountry = data.country;
  //             const city = data.city;
  //             console.log("User's Country:", userCountry, city, data.state);
  //           })
  //           .catch((error) => {
  //             console.error("Error fetching country:", error);
  //           });

  //         // You can use latitude and longitude in your application
  //       },
  //       function (error) {
  //         // Handle any errors that may occur
  //         switch (error.code) {
  //           case error.PERMISSION_DENIED:
  //             console.error("User denied the request for Geolocation.");
  //             break;
  //           case error.POSITION_UNAVAILABLE:
  //             console.error("Location information is unavailable.");
  //             break;
  //           case error.TIMEOUT:
  //             console.error("The request to get user location timed out.");
  //             break;
  //           case error.UNKNOWN_ERROR:
  //             console.error("An unknown error occurred.");
  //             break;
  //         }
  //       }
  //     );
  //   } else {
  //     console.error("Geolocation is not available in this browser.");
  //   }
  // }, []);

  const getDomains = useCallback(async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/domain/getDomains`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await axios.request(config);
      if (data.success) {
        setDomains(data.data);
        if (selectedDomain.length) {
          setSelectedDomain(
            JSON.stringify(
              data.data.find((el) => el._id == JSON.parse(selectedDomain)._id)
            )
          );
        }
      }
    } catch (error) {
      setDomains([]);
    }
  }, [token, selectedDomain]);

  useEffect(() => {
    if (token && token.length) {
      getDomains();
    }
  }, [getDomains, token]);

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
    <main className="p-3 lg:py-6 overflow-auto min-h-screen">
      <p className="text-xl">Connect your Domain</p>
      <div className="bg-[#090F29] p-4 rounded-lg mt-2">
        <div className="flex justify-between flex-col lg:flex-row gap-2">
          <select
            onChange={handleDomainSelect}
            value={selectedDomain}
            className="lg:w-72 rounded-lg branded_input bg-[#00000029] border-[1px] border-white"
          >
            <option value={""} disabled>
              Domain
            </option>
            {domains.map((domain) => (
              <option value={JSON.stringify(domain)} key={domain._id}>
                {domain.domain}
              </option>
            ))}
          </select>
          <select
            onChange={(e) => setHost(e.target.value)}
            value={host}
            className="lg:w-72 rounded-lg branded_input bg-[#00000029] border-[1px] border-white"
          >
            <option value={""}>Select</option>
            {availableHost.map((host) => (
              <option value={host} key={host}>
                {host}
              </option>
            ))}
          </select>
          <input
            value={route}
            placeholder="Route"
            minLength={3}
            maxLength={10}
            onChange={(e) => setRoute(e.target.value.trim())}
            className="lg:w-72 rounded-lg branded_input bg-[#00000029] border-[1px] border-white"
          />
        </div>
      </div>

      <div className="mt-4">
        <p>Connect To</p>
        <div className="bg-[#090F29] p-4  rounded-lg mt-2">
          <div className="flex flex-col gap-2 lg:grid lg:grid-cols-3">
            <div className="flex items-center overflow-auto">
              <p className="text-sm">{currentDomain}</p>
            </div>

            <div className="flex items-center relative px-8 flex-col lg:flex-row gap-2">
              <p>Connects to</p>
              <div className="absolute right-14">
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
            </div>
            <div>
              <input
                value={link}
                placeholder="Link"
                onChange={(e) => setLink(e.target.value)}
                className="w-[100%] rounded-lg branded_input bg-[#00000029] border-[1px] border-white"
              />
              <div>
                {!createdMsg.success ? (
                  <span className="text-red-500 text-xs pl-4">
                    {createdMsg.msg}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-[#0075FF] py-2 px-4 rounded-lg hover:bg-[#0077ff9c] disabled:bg-[#41474d9c]"
          onClick={handleConnect}
          disabled={!selectedDomain.length}
        >
          Connect
        </button>
      </div>
      <p className="text-center mt-4">TO LEARN WITH VIDEO</p>
      <div className="w-[100%] overflow-auto">
        <SubDomainTable
          selectedDomain={
            selectedDomain.length ? JSON.parse(selectedDomain) : {}
          }
          getDomains={getDomains}
        />
      </div>
      <Loader modalIsOpen={isLoading} />
    </main>
  );
}
