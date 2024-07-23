"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InApp from "detect-inapp";
import toast from "react-hot-toast";
import getIntend from "@/lib/intend";
import getMobileOperatingSystem from "@/lib/os";

export default function Page({ params }) {
  const [qrValue, setQrValue] = useState("");
  const [useragent, setUseragent] = useState("");
  const [domain, setDomain] = useState("");
  const [os, setOs] = useState("");
  const [flagToCall, setFlagToCall] = useState(false);

  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    let dom = window.location.hostname.split(".")[0];
    if (dom === "www" || dom === "app" || dom === "localhost" || dom === "192")
      dom = undefined;
    setDomain(dom);
    setUseragent(
      window.navigator.userAgent || window.navigator.vendor || window.opera
    );
    setFlagToCall(true);
    setOs(getMobileOperatingSystem());
  }, []);

  const inApp = new InApp(useragent);

  const value = [`${useragent}`];
  let device = inApp.device;
  let browser = inApp.browser;

  let desktop = inApp.isDesktop;
  let mobile = inApp.isMobile;

  const deviceType = desktop ? "Desktop" : mobile ? "Mobile" : "none";
  const osType = os;
  const BrowserType = browser;

  useEffect(() => {
    const getValue = async () => {
      let data = JSON.stringify({
        route: id,
        domain,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.API_URL}/api/forward`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      try {
        const { data, status } = await axios.request(config);
        let to_link;
        let intend = getIntend(data.host);
        if (os === "Android" && intend.intend_android_before.length) {
          to_link =
            intend.intend_android_before +
            data.link.split("//")[1] +
            intend.intend_android_after;
        } else if (os === "iOS" && intend.intend_ios_before.length) {
          to_link =
            intend.intend_ios_before +
            data.link.split("//")[1] +
            intend.intend_ios_after;
        } else {
          to_link = data.link;
        }
        setQrValue(to_link);

        if (desktop) {
          window.open(to_link);
        } else {
          setTimeout(() => {
            router.push(to_link);
          }, 0);
        }
      } catch (error) {
        toast.error("Error, Please try again later");
      }
    };

    if (flagToCall) getValue();
  }, [id, domain, os, router, flagToCall, desktop]);

  return (
    <main className="text-center">
      <p>This is Splash Page</p>
      {qrValue ? (
        <Link href={qrValue} className="text-blue-500 underline">
          If redirect don&apos;t occur click here
        </Link>
      ) : null}
    </main>
  );
}
