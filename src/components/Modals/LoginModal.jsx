import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setCookie } from "cookies-next";
import toast from "react-hot-toast";
import { setAuthState } from "@/redux/features/authSlice";
import { customStyles } from "@/lib/modalStyle";
import { getUserFromToken } from "@/lib/userInfo";
import Loader from "../Loader";
import ThirdPartyLogin from "./ThirdPartyLogin";

export default function LoginModal({
  modalIsOpen,
  setIsOpen,
  otherModalOne,
  otherModalTwo,
}) {
  const dispatch = useDispatch();

  const closeModal = () => setIsOpen((prev) => !prev);

  const openSignUp = () => {
    setIsOpen(false);
    otherModalOne((prev) => !prev);
  };

  const openForgotPass = () => {
    setIsOpen(false);
    otherModalTwo((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFormSubmit = async ({ email, password }) => {
    let data = JSON.stringify({
      email,
      password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/user/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      if (status === 400) {
        console.log("called", data);
      }
      const token = data;
      setCookie("token", token);
      const user = await getUserFromToken();
      dispatch(setAuthState({ authState: true, user: user }));
      toast.success("Login Successful");
      reset();
    } catch (error) {
      console.log(error);
      toast.error("Login fail!.. plz try again later");
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
        <p className="text-center">LOGIN</p>
        <button onClick={closeModal}>&#10005;</button>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex gap-2 flex-col my-4 items-center"
        >
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
            className="bg-[#0075FF] px-3 py-2 w-24 rounded-lg mt-2  hover:bg-[#0077ff9c] disabled:bg-gray-500"
            disabled={isSubmitting}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="border-[1px]" />
      <p className="text-center mt-2 text-sm">
        <span className="cursor-pointer" onClick={openSignUp}>
          SignUp
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
