import React from "react";
import styles from "./HeaderLeft.module.scss";
import { Link } from "react-router-dom";
import menu from "@/assets/icons/menu.svg";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const HeaderLeft: React.FC = () => {
  const isMobile = useScreenMatch(850);

  console.log(isMobile, "isMobile");
  return (
    <div>
      {isMobile ? (
        <div className={styles.logo}>
          <img src={menu} alt="menu" />
        </div>
      ) : (
        <nav className={styles.navLeft}>
          <Link to="#" className={styles.link}>
            Наборы
          </Link>
          <Link to="#">Лицо</Link>
          <Link to="#">Волосы</Link>
          <Link to="#">Эфирные масла</Link>
        </nav>
      )}
    </div>
  );
};

export default HeaderLeft;
