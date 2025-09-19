import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/icons/Miraflores_logo.svg";
import logoMobile from "@/assets/icons/MirafloresMobile.svg";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import HeaderLeft from "./LeftSideHeader/HeaderLeftPart";
import HeaderRight from "./RightSideHeader/HeaderRightPart";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const isMobile = useScreenMatch(450);
  const navigate = useNavigate();
  const handleToHome = () => {
    navigate("/");
  };

  return (
    <header className={styles.header}>
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
    </header>
  );
};

export default Header;
