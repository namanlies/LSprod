import Modal from "react-modal";
import { customStyles } from "@/lib/modalStyle";

export default function VerificationModal({ modalIsOpen, setIsOpen }) {
  const closeModal = () => setIsOpen((prev) => !prev);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Login Modal"
    >
      <div className="flex justify-between gap-10">
        <p className="text-center"></p>
        <button onClick={closeModal}>&#10005;</button>
      </div>

      <div className="flex flex-col justify-center items-center mx-4 mt-4 gap-2">
        <p className="text-xl text-center">
          Please check your mail <br /> for confirmation
        </p>
        <button
          onClick={closeModal}
          className="border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black mt-3"
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
