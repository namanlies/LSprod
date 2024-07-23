import Modal from "react-modal";
import { customStyles } from "@/lib/modalStyle";

export default function DeleteModal({
  modalIsOpen,
  setIsOpen,
  title,
  onConfirm,
}) {
  const closeModal = () => setIsOpen((prev) => !prev);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Cart Modal"
    >
      <div className="mb-2">
        <p className="text-center text-2xl">{title}</p>
      </div>

      <div className="flex justify-between px-2 mt-4 min-w-[200px]">
        <button
          onClick={closeModal}
          className="border-[1px] border-white px-4 py-1 rounded hover:bg-[#0077ff9c]"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="border-[1px] border-white px-4 py-1 rounded hover:bg-[#ff0000cb] bg-[#e73b3b]"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
