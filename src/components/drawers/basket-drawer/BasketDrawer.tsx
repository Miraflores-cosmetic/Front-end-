import React from "react";
import styles from "./BasketDrawer.module.scss";
import basketKrem from "@/assets/images/krem.webp";

import blackBasketTrash from "@/assets/icons/blackBasketTrash.svg";
import BasketCard from "./basket-card/BascetCard";
import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";

const BasketDrawer: React.FC = () => {
  const dispatch = useDispatch();

  const items = [
    {
      image: basketKrem,
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      count: 1,
      discount: "-23%",
      fromPrice: "4800₽",
      toPrice: "3900₽",
    },
    {
      image: basketKrem,
      name: "Мист с экстрактом лаванды",
      size: "100 мл",
      count: 2,
      discount: "-15%",
      fromPrice: "5600₽",
      toPrice: "4760₽",
    },
    {
      image: basketKrem,
      name: "Увлажняющий мист для лица",
      size: "75 мл",
      count: 1,
      discount: "-10%",
      fromPrice: "4200₽",
      toPrice: "3780₽",
    },
  ];
  return (
    <div className={`${styles.drawer}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <p className={styles.title}>Корзина</p>
          <button
            onClick={() => dispatch(closeDrawer())}
            className={styles.closeTxt}
          >
            Закрыть
          </button>
        </div>
        <div className={styles.progresContainer}>
          <div className={styles.progresContent}>
            <p className={styles.txt1}>15 780₽ д</p>
            <p className={styles.txt2}>о бесплатной доставки</p>
          </div>
        </div>

        <div className={styles.basketList}>
          {items.map((item, idx) => (
            <BasketCard key={idx} {...item} />
          ))}
        </div>
      </div>
      <div className={styles.orderButtonContainer}>
        <div className={styles.txtWrapper}>
          <p className={styles.sum}>Сумма • {3} товара </p>
          <div className={styles.price}>
            <p className={styles.priceOld}>ada</p>
            <p className={styles.priceNew}>ada</p>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.orderButtonLeft}>Оформить заказ</button>
          <img src={blackBasketTrash} alt={`blackBasketTrash`} />
        </div>
      </div>
    </div>
  );
};

export default BasketDrawer;
