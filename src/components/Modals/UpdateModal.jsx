"use client";

import Modal from "react-modal";
import {
  AiFillTwitterSquare,
  AiFillYoutube,
  AiFillInstagram,
} from "react-icons/ai";
import { customStyles } from "@/lib/modalStyle";

export default function UpdateModal({
  modalIsOpen,
  setIsOpen,
  updateUrl,
  setUpdateUrl,
  onConfirm,
  hostname,
  createdMsg,
}) {
  const closeModal = () => setIsOpen((prev) => !prev);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Cart Modal"
    >
      <div className="relative">
        <div className="flex justify-between mb-3">
          <p className="text-center">Update</p>
          <button onClick={closeModal}>&#10005;</button>
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            name="newUrl"
            placeholder="Enter New Url"
            value={updateUrl}
            onChange={(e) => setUpdateUrl(e.target.value)}
            className="w-72 text-sm bg-[#00000032] rounded-lg border-[1px] border-[#ffffff2e]"
          />
          <div className="flex justify-end mt-3">
            <button
              className="bg-[#0075FF] py-2 px-4 rounded-lg hover:bg-[#0077ff9c] text-sm"
              onClick={() => onConfirm()}
            >
              Update
            </button>
          </div>
        </div>

        <div className="absolute left-2 bottom-1">
          {createdMsg ? (
            <span className="text-red-500 text-sm">{createdMsg.msg}</span>
          ) : null}
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
    </Modal>
  );
}
