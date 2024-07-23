import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    right: "50%",
    left: "auto",
    padding: "50px",
    bottom: "auto",
    transform: "translate(50%, -50%)",
    background: "none",
    border: "0px solid rgba(255, 255, 255, 0)",
    backdropFilter: "blur(0)",
    // boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
  },
};

export default function Loader({ modalIsOpen }) {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      style={customStyles}
      contentLabel="Loading"
    >
      <div className="loader"></div>
    </Modal>
  );
}
