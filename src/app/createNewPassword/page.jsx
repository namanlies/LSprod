"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { routes } from "@/lib/routes";
import Loader from "@/components/Loader";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleForgotPassword = async ({ password }) => {
    try {
      const { statusText, status, data } = await axios.post(
        `${process.env.API_URL}/api/user/createNewPassword`,
        {
          token,
          password: password,
        }
      );
      if (statusText === "OK" && status === 200) {
        reset();
        toast.success("Password updated Successful");
        router.push("/");
      } else {
        toast.error(
          `Password updated failed, statusText: ${statusText}, status: ${status}`
        );
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="bg-[url(/braded_bg.jpg)] bg-fixed bg-cover bg-center min-h-screen  before:bg-black before:opacity-40 before:w-[100%] before:h-[100%] relative before:absolute before:top-0 before:left-0">
      <div className="absolute top-[50%] right-[50%] left-auto bottom-auto glass p-6 trans_center">
        <p className="text-center text-xl">Create New Password</p>
        <form
          onSubmit={handleSubmit(handleForgotPassword)}
          className="flex gap-2 flex-col my-4 items-center"
        >
          <div className="flex flex-col">
            <label htmlFor="password">Password:-</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              className="w-56 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
              {...register("password", {
                required: "This field is required",
                minLength: {
                  value: 6,
                  message: "At least 6 characters required",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum 10 characters allowed",
                },
                validate: {
                  space: (value) => !/\s/g.test(value) || "No space allowed",
                  lowerCase: (value) =>
                    /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain lowercase character",
                  upperCase: (value) =>
                    /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain uppercase character",
                  number: (value) =>
                    /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain number",
                  specialChar: (value) =>
                    /^(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(
                      value
                    ) || "Must contain special character",
                },
              })}
            />
            {errors.password && (
              <p className="text-[12px] text-red-500 ml-3 font-bold">
                {`${errors.password.message}`}
              </p>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password">Confirm Password:-</label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm password"
              className="w-56 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
              {...register("confirm_password", {
                required: "This field is required",
                mminLength: {
                  value: 6,
                  message: "At least 6 characters required",
                },
                maxLength: {
                  value: 10,
                  message: "Maximum 10 characters allowed",
                },
                validate: {
                  space: (value) => !/\s/g.test(value) || "No space allowed",
                  lowerCase: (value) =>
                    /^(?=.*[a-z])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain lowercase character",
                  upperCase: (value) =>
                    /^(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain uppercase character",
                  number: (value) =>
                    /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(value) ||
                    "Must contain number",
                  specialChar: (value) =>
                    /^(?=.*[!@#$%^&*.,])[a-zA-Z0-9!@#$%^&*.,]{1,}$/.test(
                      value
                    ) || "Must contain special character",
                  match: (value) =>
                    value === getValues("password") || "Passwords must match",
                },
              })}
            />
            {errors.confirm_password && (
              <p className="text-[12px] text-red-500 ml-3 font-bold">
                {`${errors.confirm_password.message}`}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#0075FF] px-3 py-2 w-24 rounded-lg mt-2  hover:bg-[#0077ff9c]"
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </form>

        <Link href={routes.Home}>
          <p className="hover:text-white text-blue-400 text-center">
            Home &#x2192;
          </p>
        </Link>
      </div>

      <Loader modalIsOpen={isSubmitting} />
    </div>
  );
}
