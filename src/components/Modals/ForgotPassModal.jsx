import axios from "axios";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { customStyles } from "@/lib/modalStyle";
import ThirdPartyLogin from "./ThirdPartyLogin";
import Loader from "../Loader";

export default function ForgotPassModal({
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

  const openSignUp = () => {
    setIsOpen(false);
    otherModalTwo((prev) => !prev);
  };

  const handleFormSubmit = async ({ email }) => {
    let data = JSON.stringify({
      email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/user/forgotPassword`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const { data, status } = await axios.request(config);
      if (status === 200) {
        openValidation((prev) => !prev);
        closeModal();
        reset();
        toast.success("Please check your mail for confirmation");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
    reset();
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
        <p className="text-center">FORGOT PASSWORD</p>
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
        <span className="cursor-pointer" onClick={openSignUp}>
          SignUp
        </span>
      </p>
      <ThirdPartyLogin />
      <Loader modalIsOpen={isSubmitting} />
    </Modal>
  );
}
