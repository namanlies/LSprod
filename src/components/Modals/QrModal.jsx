import Link from "next/link";
import Image from "next/image";
import Modal from "react-modal";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { customStyles } from "@/lib/modalStyle";

export default function QrModal({ modalIsOpen, setIsOpen, link }) {
  const [qrCodeDataURL, setQRCodeDataURL] = useState("");
  const closeModal = () => setIsOpen((prev) => !prev);

  const handleDownloadClick = () => {
    const link = document.createElement("a");
    link.href = qrCodeDataURL;
    link.download = "Branéd Link";
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      fetch(qrCodeDataURL)
        .then((response) => response.blob())
        .then((blob) => {
          // Create a temporary blob URL
          const blobURL = URL.createObjectURL(blob);
          const file = new File([blob], "qrcode.png", { type: "image/png" });
          navigator
            .share({
              title: "Branéd Link",
              text: "Share this QR code",
              files: [file],
            })
            .then(() => {
              console.log("Successfully shared");
            })
            .catch((error) => {
              console.error("Share error:", error);
            });
          URL.revokeObjectURL(blobURL);
        })
        .catch((error) => {
          console.error("Error converting data URL to Blob:", error);
        });
    } else {
      console.log("Web Share API not supported on this browser.");
      // Fallback to some other sharing mechanism or show a message
    }
  };

  useEffect(() => {
    var opts = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      quality: 0.3,
      margin: 1,
      color: {
        dark: "#ffffff00",
        light: "#ffffffff",
      },
    };
    if (link && link.length) {
      QRCode.toDataURL(link, opts, (err, url) => {
        if (err) {
          console.error("Error generating QR code:", err);
        } else {
          setQRCodeDataURL(url);
        }
      });
    }
  }, [link]);

  return (
    <Modal
      ariaHideApp={false}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="QrCode Modal"
    >
      <div className="flex justify-between gap-10">
        <p className="text-center">QR Code</p>
        <button onClick={closeModal}>&#10005;</button>
      </div>

      <div className="mt-4 flex flex-col justify-center gap-2 items-center min-w-[200px]">
        {qrCodeDataURL && (
          <div className="flex flex-col items-center gap-2">
            <Image src={qrCodeDataURL} alt="QR Code" height={200} width={200} />
            <Link href={link} passHref target="_blank">
              <p className="text-xs text-blue-500 underline">{link}</p>
            </Link>
            <div className="flex justify-between w-[100%]">
              <button
                onClick={handleDownloadClick}
                className="border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black"
              >
                Download
              </button>
              <button
                onClick={handleShareClick}
                className="border-2 rounded-lg px-4 py-1 hover:bg-white hover:text-black "
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
