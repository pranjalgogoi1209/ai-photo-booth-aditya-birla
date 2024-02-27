import React, { useState, useEffect } from "react";
import styles from "./Auth.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EMPTY_CONTACT = {
  username: "",
  password: "",
};

export default function Auth({ isShowAuth, setIsShowAuth }) {
  const [contact, setContact] = useState(EMPTY_CONTACT);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onInputChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // toast options
  const toastOptions = {
    position: "top-left",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  // post request to send email api
  const send = async contact => {
    try {
      let response = await axios.post(
        "https://adp24companyday.com/aiphotobooth/auth.php",
        contact
      );
      console.log(response);
      if (response.data.status === "success") {
        // set local storage
        localStorage.setItem("message", JSON.stringify(response.data.message));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  // form submission
  const submitForm = async e => {
    e.preventDefault();
    console.log("submitting the form", contact);
    setIsLoad(true);
    if (contact.username && contact.password) {
      console.log("move on");
      const isSend = await send({ ...contact });
      if (isSend) {
        setIsLoggedIn(true);
        setIsLoad(false);
        toast.success(
          "The submission of details has been completed successfully",
          toastOptions
        );
        setContact(EMPTY_CONTACT);
        console.log("post request successfull");
        setTimeout(() => {
          setIsShowAuth(false);
        }, 1200);
      } else {
        console.log("catching error");
        setIsLoad(false);
        toast.error("Please enter correct credentials", toastOptions);
      }
    } else {
      setIsLoad(false);
      toast.error("Please fill all the required fields", toastOptions);
    }
  };

  // close icon click
  const closePopup = () => {
    if (isLoggedIn) {
      setIsShowAuth(false);
    } else {
      toast.error("Please Login Yourself", toastOptions);
    }
  };

  // local storage get Item
  useEffect(() => {
    if (localStorage.getItem("message")) {
      setIsShowAuth(false);
      console.log("get Item");
    }
  }, [isShowAuth]);

  return (
    <div className={styles.Auth}>
      {/* pre-loader */}
      {isLoad && (
        <div className={styles.preLoader}>
          <div className={styles.loading}>
            <div className={styles.ldsRing}>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.container}>
        <IoCloseCircle className={styles.icon} onClick={closePopup} />
        <h2>Login</h2>
        <div>
          <input
            type="text"
            placeholder="Enter Your Username *"
            required
            name="username"
            onChange={onInputChange}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter Your Password *"
            required
            name="password"
            onChange={onInputChange}
          />
        </div>
        <button type="submit" onClick={e => submitForm(e)}>
          Submit
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}
