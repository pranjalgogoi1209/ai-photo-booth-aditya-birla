import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import AvatarMobile from "../components/avatar/mobile/AvatarMobile";
import { maleCards, femaleCards } from "../utils/constants";

export default function AvatarPage({
  capturedImage,
  setGeneratedImage,
  selectedGender,
  generatedImage,
}) {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  /*   capturedImage && console.log("capturedImage =>", capturedImage.split(",")[1]); */
  // selectedImage && console.log("selectedImage =>", selectedImage.split(",")[1]);
  /*  console.log("actual=>", maleCardsActual, femaleCardsActual); */

  selectedGender && console.log(selectedGender);

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // submitting the selected image and post request to api
  const handleSubmit = () => {
    console.log("clicked");
    setGeneratedImage("");
    if (selectedImage) {
      axios
        .post("https://e9d8-103-17-110-127.ngrok-free.app/rec", {
          image: capturedImage.split(",")[1],
          choice: selectedImage.split(",")[1],
        })
        .then(function (response) {
          console.log(response);
          setGeneratedImage(`data:image/webp;base64,${response.data.result}`);
        })
        .catch(function (error) {
          console.log(error);
        });
      navigate("/generated-image");
    } else {
      toast.error("Please select an image...", toastOptions);
    }
  };
  return (
    <AvatarPageWrapper>
      <div className="mobile">
        <AvatarMobile
          maleCards={maleCards}
          femaleCards={femaleCards}
          selectedGender={selectedGender}
          handleSubmit={handleSubmit}
          setSelectedImage={setSelectedImage}
          generatedImage={generatedImage}
        />
      </div>
      <ToastContainer />
    </AvatarPageWrapper>
  );
}

const AvatarPageWrapper = styled.div``;
