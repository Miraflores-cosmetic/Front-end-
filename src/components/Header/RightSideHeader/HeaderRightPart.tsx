import React from "react";
import styles from "./HeaderRight.module.scss";
import { Link } from "react-router-dom";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@/store/slices/drawerSlice";
import { RootState } from "@/store/store";

const HeaderRight: React.FC = () => {
  const isMobile = useScreenMatch(850);
  const dispatch = useDispatch();
  const count = useSelector(
    (state: RootState) => state.bestSellerSlice.bestSellers.length
  );

  const handleNavigatetoAccount = () => {};

  return (
    <div>
      {isMobile ? (
        <div
          className={styles.basketMobile}
          onClick={() => dispatch(openDrawer("basket"))}
        >
          <Link to="#">Корзина</Link>
          <p className={styles.cartCount}>2</p>
        </div>
      ) : (
        <nav className={styles.navRight}>
          <Link to="/sign-in" onClick={handleNavigatetoAccount}>
            Аккаунт
          </Link>
          <div
            className={styles.basket}
            onClick={() => dispatch(openDrawer("basket"))}
          >
            <Link to="#">Корзина</Link>
            <p className={styles.cartCount}>{count}</p>
          </div>
          <Link to="#">Поиск</Link>
          <Link to="#" onClick={() => dispatch(openDrawer("menu"))}>
            Меню
          </Link>
        </nav>
      )}
    </div>
  );
};

export default HeaderRight;
