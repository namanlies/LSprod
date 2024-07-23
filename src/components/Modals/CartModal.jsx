import Image from "next/image";
import Script from "next/script";
import axios from "axios";
import Modal from "react-modal";
import { useState } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/features/cartSlice";
import { customStyles } from "@/lib/modalStyle";
import DeleteModal from "./DeleteModal";
import Loader from "../Loader";
import deleteIcon from "@/assets/svg/deleteIcon.svg";
import logo from "@/assets/svg/logo.svg";

export default function CartModal({ modalIsOpen, setIsOpen, openLoginModal }) {
  const token = getCookie("token");
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartReducer);
  const { authState, user } = useSelector((state) => state.userReducer);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDomain, SetSelectedDomain] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const total = cart.length * 50;
  const closeModal = () => setIsOpen((prev) => !prev);

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(selectedDomain));
    setDeleteModalOpen(false);
  };

  const openDeleteModal = (subDomain) => {
    SetSelectedDomain(subDomain);
    setDeleteModalOpen(true);
  };

  const purchaseDomain = async () => {
    const keyConfig = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/payment/razorPay/getKey`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const keyResult = await axios.request(keyConfig);
    if (!keyResult || !keyResult.data.success) {
      alert("Server error. Are you online?");
      return;
    }
    const { key } = keyResult.data;

    const orderConfig = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.API_URL}/api/payment/razorPay/order`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { cart, total },
    };
    const orderResult = await axios.request(orderConfig);
    if (!orderResult) {
      alert("Server error. Are you online?");
      return;
    }
    const { amount, id: order_id, currency } = orderResult.data;

    const options = {
      key,
      amount,
      currency,
      name: "Branéd Links",
      description: "Retain Your Brand Image",
      image: logo,
      order_id,
      callback_url: `${process.env.API_URL}/api/payment/razorPay/success`,
      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobileNo,
      },
      notes: {
        address: `${user.address} ${user.city} ${user.country} ${user.pinCode}`,
      },
      theme: {
        color: "#121212",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  };

  const handleProceedToPay = () => {
    if (authState) {
      purchaseDomain();
    } else {
      openLoginModal();
    }
  };

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Cart Modal"
      >
        <div className="flex justify-between gap-10 w-[300px] lg:w-[500px] mb-2">
          <div className="flex justify-between w-[100%] items-center">
            <p className="text-center text-2xl">CART</p>
            {cart.length ? (
              <div className="flex gap-2">
                <p>Total</p>
                <p>₹ {total}</p>
              </div>
            ) : null}
          </div>

          <button onClick={closeModal}>&#10005;</button>
        </div>

        {cart.length ? (
          <>
            <div className="max-h-[300px] min-h-[200px] overflow-y-auto">
              {cart.map((subDomain) => (
                <div
                  key={subDomain.domainId}
                  className={`flex justify-center px-3 py-2 gap-4 hover:bg-[#324cd160] rounded`}
                >
                  <div className="flex lg:gap-2 w-[100%] justify-center lg:justify-between lg:items-center lg:flex-row flex-col">
                    <div className="whitespace-normal max-w-[400px]">
                      <p className="break-words">{subDomain.domain}</p>
                    </div>

                    <div className="ml-2 lg:ml-0">
                      <p>₹ 50</p>
                    </div>
                  </div>
                  <div
                    className="p-1 cursor-pointer hover:bg-white rounded"
                    onClick={() => openDeleteModal(subDomain)}
                  >
                    <div className="relative h-5 w-5 ">
                      <Image
                        src={deleteIcon}
                        alt="delete_Icon"
                        fill
                        className="object-cover text-red-500"
                        priority
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="border-2 rounded-lg px-4 py-2 hover:bg-white hover:text-black"
                onClick={handleProceedToPay}
              >
                Proceed to Pay
              </button>
            </div>
          </>
        ) : (
          <div className="mt-6">
            <p className="text-center text-2xl">Your Cart is empty</p>
            <div className="flex justify-center">
              <button
                className="border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black mt-3"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      <DeleteModal
        modalIsOpen={deleteModalOpen}
        setIsOpen={setDeleteModalOpen}
        title="Confirm to Delete"
        onConfirm={handleRemoveFromCart}
      />
      <Loader modalIsOpen={isLoading} />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}
