import React, { useState } from "react";
import QRCode from "react-qr-code";
import { IoIosCloseCircle } from "react-icons/io";
import styles from "./qrFeature.module.css";
import axios from "axios";
import logo from "./../../../assets/logo.png";
import html2canvas from "html2canvas";

export default function QrFeature({ generatedImg, printRef, url }) {
  const [showQrPopup, setShowQrPopup] = useState(false);
  const [qr, setQr] = useState("");

  // handle QR code generation
  const handleSubmitQr = () => {
    setShowQrPopup(true);
    console.log("submitting qr");

    console.log("printRef", printRef.current);

    /*  if (printRef.current) {
      html2canvas(printRef.current).then(canvas => {
        const imageUrl = canvas.toDataURL();
        axios
          .post("https://adp24companyday.com/aiphotobooth/upload.php", {
            img: imageUrl.split(",")[1],
          })
          .then(function (response) {
            console.log(response);
            setQr(response.data.url);
            console.log(qr);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
 */
    // setQr(url);
  };
  return (
    <div className={styles.QrFeature}>
      <button
        onClick={handleSubmitQr}
        style={{ display: "flex", justifyContent: "center", width: "30vw" }}
        disabled={url ? false : true}
        // className={styles.disabled}
      >
        QR
      </button>

      {showQrPopup && (
        <div className={styles.popupQr} onClick={() => setShowQrPopup(false)}>
          <div
            className={styles.qr}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            {/* close */}
            <div className={styles.close} onClick={() => setShowQrPopup(false)}>
              <IoIosCloseCircle />
            </div>

            {/* header */}
            <header>
              <h2>Scan this QR to get Image</h2>
              <div className={styles.logoContainer}>
                <img src={logo} alt="logo" />
              </div>
            </header>
            <QRCode size={256} value={url} className={styles.qrCode} />
          </div>
        </div>
      )}
    </div>
  );
}
