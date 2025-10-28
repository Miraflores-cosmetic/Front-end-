import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/icons/Miraflores_logo.svg";
import logoMobile from "@/assets/icons/MirafloresMobile.svg";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import HeaderLeft from "./LeftSideHeader/HeaderLeftPart";
import HeaderRight from "./RightSideHeader/HeaderRightPart";
import { useLocation, useNavigate } from "react-router-dom";
import { getHeaderStyle } from "@/helpers/helpers";
const Header: React.FC = () => {
  const isMobile = useScreenMatch(450);
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate("/");
  };
  const location = useLocation();
  console.log(location.pathname, "patname");
  return (
    <div>
      <header
        className={styles.header}
        style={getHeaderStyle(location.pathname, isMobile)}
      >
        <div className={styles.headerContent}>
          <HeaderLeft />

          {isMobile ? (
            <div className={styles.logoMobile} onClick={handleToHome}>
              <img src={logoMobile} alt="Miraflores" />
            </div>
          ) : (
            <div className={styles.logo} onClick={handleToHome}>
              <img src={logo} alt="Miraflores" />
            </div>
          )}

          <HeaderRight />
        </div>
      </header>
    </div>
  );
};

export default Header;
