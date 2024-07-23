"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { routes } from "@/lib/routes";
import Loader from "@/components/Loader";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token.length) {
      const verifyUserEmail = async () => {
        setLoading(true);
        try {
          const { statusText, status, data } = await axios.post(
            `${process.env.API_URL}/api/user/verifyMail`,
            {
              token,
            }
          );

          if (status === 200) {
            toast.success("Email verification Successful");
            setVerified(true);
          } else {
            toast.error(
              `Email verification failed, statusText: ${statusText}, status: ${status}`
            );
          }
        } catch (error) {
          setError(true);
          toast.error(error.response.data.error);
        } finally {
          setLoading(false);
        }
      };
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="bg-[url(/braded_bg.jpg)] bg-fixed bg-cover bg-center min-h-screen  before:bg-black before:opacity-40 before:w-[100%] before:h-[100%] relative before:absolute before:top-0 before:left-0">
      <div className="absolute top-[50%] right-[50%] left-auto bottom-auto glass p-6 trans_center w-56">
        <p className="text-xl text-center">Verify Email</p>
        <div className="mt-4">
          {verified ? (
            <>
              <p className="text-xl text-center">Email Verified</p>
              <Link href={routes.Home}>
                <p className="hover:text-white text-blue-400 text-center">
                  Home &#x2192;
                </p>
              </Link>
            </>
          ) : null}
          {error ? (
            <p className="text-red-500 text-center font-bold">
              Unable to verify <br />
              please try again
            </p>
          ) : null}
        </div>
      </div>
      <Loader modalIsOpen={loading} />
    </div>
  );
}
