import React from "react";
import styles from "./HeaderRight.module.scss";
import { Link } from "react-router-dom";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import { useDispatch } from "react-redux";
import { openDrawer } from "@/store/slices/drawerSlice";

const HeaderRight: React.FC = () => {
  const isMobile = useScreenMatch(850);
  const dispatch = useDispatch();

  return (
    <div>
      {isMobile ? (
        <div
          className={styles.basketMobile}
          onClick={() => {
            dispatch(openDrawer("basket"));
          }}
        >
          <Link to="#">Корзина</Link>
          <p className={styles.cartCount}>2</p>
        </div>
      ) : (
        <nav className={styles.navRight}>
          <Link to="#">Аккаунт</Link>
          <div
            className={styles.basket}
            onClick={() => {
              dispatch(openDrawer("basket"));
            }}
          >
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
