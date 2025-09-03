// Header.tsx
import React from "react";
import styles from "./Header.module.scss";
import logo from "@/assets/icons/Miraflores_logo.svg";
import logoMobile from "@/assets/icons/MirafloresMobile.svg";
import { useIsMobile } from "@/hooks/useIsMobile";
import HeaderLeft from "./LeftSideHeader/HeaderLeftPart";
import HeaderRight from "./RightSideHeader/HeaderRightPart";
const Header: React.FC = () => {
  const isMobile = useIsMobile(450);

  console.log(isMobile, "isMobile");

  return (
    <header className={styles.header}>
      <HeaderLeft />

      {isMobile ? (
        <div className={styles.logoMobile}>
          <img src={logoMobile} alt="Miraflores" />
        </div>
      ) : (
        <div className={styles.logo}>
          <img src={logo} alt="Miraflores" />
        </div>
      )}

      <HeaderRight />
    </header>
  );
};

export default Header;
