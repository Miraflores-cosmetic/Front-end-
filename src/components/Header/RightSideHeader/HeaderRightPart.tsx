import React from "react";
import styles from "./HeaderRight.module.scss";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
const HeaderRight: React.FC = () => {
  const isMobile = useIsMobile(850);

  return (
    <div>
      {isMobile ? (
        <div className={styles.basketMobile}>
          <Link to="#">Корзина</Link>
          <p className={styles.cartCount}>2</p>
        </div>
      ) : (
        <nav className={styles.navRight}>
          <Link to="#">Аккаунт</Link>
          <div className={styles.basket}>
            <Link to="#">Корзина</Link>
            <p className={styles.cartCount}>2</p>
          </div>
          <Link to="#">Поиск</Link>
          <Link to="#">Меню</Link>
        </nav>
      )}
    </div>
  );
};

export default HeaderRight;
