import React, { useState } from "react";
// import HomeDesktop from "./../components/home/desktop/HomeDesktop";
import HomeMobile from "../components/home/mobile/HomeMobile";
import styled from "styled-components";
import Auth from "./../components/home/auth/Auth";

export default function HomePage() {
  const [isShowAuth, setIsShowAuth] = useState(true);
  return (
    <HomeWrapper>
      {/*<div className="desktop">
        <HomeDesktop />
      </div> */}

      <div className="mobile">
        <HomeMobile />
      </div>
      <div className={`"auth" ${!isShowAuth ? "showAuth" : ""}`}>
        <Auth setIsShowAuth={setIsShowAuth} isShowAuth={isShowAuth} />
      </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  /*  @media screen and (max-width: 1025px) {
    .desktop {
      display: none;
    }
  }

  @media screen and (min-width: 1025px) {
    .mobile {
      display: none;
    }
  } */
  .auth {
    display: flex;
  }
  .showAuth {
    display: none;
  }
`;
