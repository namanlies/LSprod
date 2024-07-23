import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { customStyles } from "@/lib/modalStyle";
import ThirdPartyLogin from "./ThirdPartyLogin";
import Loader from "../Loader";

export default function SignUpModal({
  modalIsOpen,
  setIsOpen,
  otherModalOne,
  otherModalTwo,
  openValidation,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const closeModal = () => setIsOpen((prev) => !prev);

  const openLogin = () => {
    setIsOpen(false);
    otherModalOne((prev) => !prev);
  };

  const openForgotPass = () => {
    setIsOpen(false);
    otherModalTwo((prev) => !prev);
  };

  const handleFormSubmit = async ({ name, email, mobileNo, password }) => {
    let data = JSON.stringify({
      name,
      email,
      password,
      mobileNo,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/user/signUp`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      if (status === 201) {
        openValidation((prev) => !prev);
        closeModal();
        reset();
        toast.success("Please check your mail for confirmation");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <div className="flex justify-between gap-10">
        <p className="text-center">SIGN UP</p>
        <button onClick={closeModal}>&#10005;</button>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex gap-2 flex-col my-4 items-center"
        >
          <div>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              className="w-56 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "At least 3 characters required",
                },
                maxLength: {
                  value: 20,
                  message: "Maximum 20 characters allowed",
                },
                validate: {
                  space: (value) => !/\s/g.test(value) || "No space allowed",
                  specialChar: (value) =>
                    /^[a-zA-Z]+$/.test(value) ||
                    "No special characters are allowed",
                },
              })}
            />
            {errors.name && (
              <p className="text-[12px] text-red-500 ml-3 font-bold">
                {`${errors.name.message}`}
              </p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="w-56 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
              {...register("email", {
                required: "This field is required",
                validate: {
                  space: (value) => !/\s/g.test(value) || "No space allowed",
                  ismail: (value) =>
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                      value
                    ) || "Invalid email",
                },
              })}
            />
            {errors?.email && (
              <p className="text-[12px] text-red-500 ml-3 font-bold">
                {`${errors.email.message}`}
              </p>
            )}
          </div>

          <div>
            <input
              name="mobileNo"
              type="number"
              placeholder="Enter your phone no."
              className="w-56 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
              {...register("mobileNo", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "At least 10 characters required",
                },
                maxLength: {
                  value: 12,
                  message: "Maximum 12 characters allowed",
                },
              })}
            />
            {errors.mobileNo && (
              <p className="text-[12px] text-red-500 ml-3 font-bold">
                {`${errors.mobileNo.message}`}
              </p>
            )}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Enter your password."
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

          <button
            type="submit"
            className="bg-[#0075FF] px-3 py-2 w-24 rounded-lg mt-2  hover:bg-[#0077ff9c] disabled:bg-gray-500 "
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="border-[1px]" />
      <p className="text-center mt-2 text-sm">
        <span className="cursor-pointer" onClick={openLogin}>
          Login
        </span>{" "}
        |{" "}
        <span className="cursor-pointer" onClick={openForgotPass}>
          Forgot Password ?
        </span>
      </p>
      <ThirdPartyLogin />
      <Loader modalIsOpen={isSubmitting} />
    </Modal>
  );
}
