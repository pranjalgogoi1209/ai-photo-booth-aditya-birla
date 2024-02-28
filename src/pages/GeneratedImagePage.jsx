import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import exportAsImage from "../utils/exportAsImage";
import logo from "./../assets/logo.png";
import frame from "./../assets/generated-image-frame.png";
import { useReactToPrint } from "react-to-print";
import EmailFeature from "../components/modal/EmailFeature";
import { Link } from "react-router-dom";
import QrFeature from "../components/generateImage/qrFeature/QrFeature";
import html2canvas from "html2canvas";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import { useParams } from "react-router-dom";

export default function GeneratedImagePage({ generatedImage, selectedGender }) {
  // const exportRef = useRef();
  const printRef = useRef();
  const frameRef = useRef();
  const [isEmailOpen, setIsEmailOpen] = useState(false);
  generatedImage && console.log(generatedImage);
  const [printImage, setPrintImage] = useState();
  const [url, setUrl] = useState("");
  let { paramName } = useParams();
  console.log(paramName);

  const queryParameters = new URLSearchParams(window.location.search);
  const sw = queryParameters.get("sw");
  const sh = queryParameters.get("sh");
  console.log(sw, sh);

  // handlePrint
  // window.print();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  // handle Email
  const handleEmail = () => {
    console.log("clicked on Email Button");
    setIsEmailOpen(true);
    // document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    if (generatedImage) {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (selectedGender.toLowerCase() === "female") {
          canvas.width = img.width * 0.5;
          canvas.height = img.height * 0.5;
        } else if (selectedGender.toLowerCase() === "male") {
          canvas.width = img.width * 0.5;
          canvas.height = img.height * 0.5;
        }

        if (frameRef.current) {
          frameRef.current.style.display = "none";
        }

        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        console.log("frame", frameRef.current);

        frameRef.current &&
          context.drawImage(
            frameRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );

        const scaledImage = canvas.toDataURL("image/png");
        setPrintImage(scaledImage);
      };

      img.src = generatedImage;
    }
  }, [generatedImage, frameRef.current]);

  useEffect(() => {
    console.log("useEffect working", printRef.current);

    setTimeout(() => {
      if (printRef.current) {
        console.log("printref working");

        html2canvas(printRef.current).then(canvas => {
          const imageUrl = canvas.toDataURL();

          axios
            .post(
              "https://adp24companyday.com/aiphotobooth/aiphotobooth_Navy/upload.php",
              {
                img: imageUrl.split(",")[1],
              }
            )
            .then(function (response) {
              console.log(response);
              setUrl(response.data.url);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      }
    }, 1000);
  }, [generatedImage]);

  url && console.log(url);
  return (
    <GeneratedImageWrapper>
      {/* email feature */}
      {isEmailOpen && (
        <EmailFeature
          setIsEmailOpen={setIsEmailOpen}
          generatedImage={generatedImage}
          className="EmailFeature"
        />
      )}
      <header>
        <Link to={"/"} className="logo">
          {/* <img src={logo} alt="logo" /> */}
          <h1>
            <FaHome />
          </h1>
        </Link>
        <h1>AI Generated Image</h1>
      </header>

      {printImage ? (
        <div className="generatedImageContainer">
          <div className="generatedImageParent" ref={printRef}>
            <img
              src={printImage}
              alt="generated image"
              className="generatedImage"
            />
            <img ref={frameRef} src={frame} alt="frame" className="frame" />
          </div>
          <div className="buttons">
            {/* print feature */}
            {/* <button onClick={handlePrint}>Print</button> */}
            {/* email feature */}
            {/* <button onClick={handleEmail}>Email</button> */}

            {/* download button */}
            <button
              onClick={() =>
                exportAsImage(printRef.current, "ai-photobooth-aditya-birla")
              }
            >
              Download
            </button>

            {/* qr feature */}
            <QrFeature
              generatedImg={generatedImage}
              printRef={printRef}
              url={url}
            />

            <Link to={"/avatar"} className="btn">
              Regenerate
            </Link>
          </div>
        </div>
      ) : (
        <div className="loading">
          <div className="lds-ring">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
    </GeneratedImageWrapper>
  );
}

const GeneratedImageWrapper = styled.div`
  /* border: 1px solid red; */
  height: 100vh;
  padding: 4vw;
  display: flex;
  flex-direction: column;
  gap: 5vw;
  .EmailFeature {
    height: 100%;
    position: absolute;
  }

  header {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    gap: 3vw;
    .logo {
      margin: 0 auto;
      width: 20vw;
      text-decoration: none;
      img {
        width: 100%;
        height: 100%;
      }

      svg {
        color: #c72041;
        font-size: 8vw;
      }
    }
    h1 {
      /* border: 1px solid black; */
      font-size: 6.5vw;
      text-align: center;
      font-weight: 600;
    }
  }
  .generatedImageContainer {
    /* border: 1px solid black; */
    /* height: 150vw; */
    display: flex;
    flex-direction: column;
    gap: 10vw;
    margin-top: 3vw;
    justify-content: space-between;
    position: relative;
    .generatedImageParent {
      /* border: 1px solid black; */
      margin: 0 auto;
      /* width: 70vw; */
      width: 60vw;
      position: relative;
      background-color: #000;
      .generatedImage {
        width: 100.3%;
        height: 100.3%;
        box-shadow: 0.5vw 0.5vw 1vw rgba(0, 0, 0, 0.6);
        /* border-radius: 3.5vh; */
      }
      .frame {
        position: absolute;
        top: 0;
        left: 0;
        width: 100.3%;
        height: 100.3%;
      }
    }

    /* border: 1px solid black; */
    .buttons {
      display: flex;
      justify-content: center;
      gap: 3vw;
      button,
      .btn {
        text-decoration: none;
        width: 30vw;
        text-align: center;
        border: none;
        background-color: transparent;
        outline: none;
        padding: 2vw 0;
        font-size: 4vw;
        font-weight: 600;
        border-radius: 1vw;
        cursor: pointer;
        box-shadow: 0.3vw 0.3vw 0.8vw rgba(0, 0, 0, 0.5);
        transform: translateY(-0.4vw);
        transition: all ease 0.5s;
        background-color: #c72041;
        color: #f1f1f1;
        &:hover {
          box-shadow: none;
          transform: translateY(0);
        }
      }
    }
  }

  /* loading starts here */
  .loading {
    margin: auto;
    .lds-ring {
      display: inline-block;
      position: relative;
      width: 80px;
      height: 80px;
    }
    .lds-ring div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid #fff;
      border-radius: 50%;
      animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: #fff transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
      animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
      animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes lds-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
  /* loading ends here */
`;
