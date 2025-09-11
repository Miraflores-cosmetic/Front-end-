import React from "react";
import styles from "./BasketDrawer.module.scss";
import basketKrem from "@/assets/images/krem.png";
import trash from "@/assets/icons/trash.svg";
import add from "@/assets/icons/add.svg";
import blackBasketTrash from "@/assets/icons/blackBasketTrash.svg";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const BasketDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <p className={styles.title}>Корзина</p>
          <button onClick={onClose} className={styles.closeTxt}>
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
          <div className={styles.basketCard}>
            <div className={styles.basketImage}>
              <img
                src={basketKrem}
                alt={`basketKrem`}
                className={styles.kremImage}
              />
            </div>
            <div className={styles.basketInfo}>
              <div className={styles.topInfo}>
                <p className={styles.productName}>
                  Цветочный мист с экстрактами розы
                </p>
                <p className={styles.productSize}>50 мл</p>
              </div>
              <div className={styles.bottomInfo}>
                <img src={trash} alt={`trash`} className={styles.trashImage} />
                <p className={styles.trashCount}>1</p>
                <img src={add} alt={`add`} className={styles.addImage} />
              </div>
            </div>
            <div className={styles.baskePrice}>
              <p className={styles.discount}>-23%</p>
              <div className={styles.fromTo}>
                <p className={styles.from}>4800₽</p>
                <p className={styles.to}>3900₽</p>
              </div>
            </div>
          </div>
          <div className={styles.basketCard}>
            <div className={styles.basketImage}>
              <img
                src={basketKrem}
                alt={`basketKrem`}
                className={styles.kremImage}
              />
            </div>
            <div className={styles.basketInfo}>
              <div className={styles.topInfo}>
                <p className={styles.productName}>
                  Цветочный мист с экстрактами розы
                </p>
                <p className={styles.productSize}>50 мл</p>
              </div>
              <div className={styles.bottomInfo}>
                <img src={trash} alt={`trash`} className={styles.trashImage} />
                <p className={styles.trashCount}>1</p>
                <img src={add} alt={`add`} className={styles.addImage} />
              </div>
            </div>
            <div className={styles.baskePrice}>
              <p className={styles.discount}>-23%</p>
              <div className={styles.fromTo}>
                <p className={styles.from}>4800₽</p>
                <p className={styles.to}>3900₽</p>
              </div>
            </div>
          </div>
          <div className={styles.basketCard}>
            <div className={styles.basketImage}>
              <img
                src={basketKrem}
                alt={`basketKrem`}
                className={styles.kremImage}
              />
            </div>
            <div className={styles.basketInfo}>
              <div className={styles.topInfo}>
                <p className={styles.productName}>
                  Цветочный мист с экстрактами розы
                </p>
                <p className={styles.productSize}>50 мл</p>
              </div>
              <div className={styles.bottomInfo}>
                <img src={trash} alt={`trash`} className={styles.trashImage} />
                <p className={styles.trashCount}>1</p>
                <img src={add} alt={`add`} className={styles.addImage} />
              </div>
            </div>
            <div className={styles.baskePrice}>
              <p className={styles.discount}>-23%</p>
              <div className={styles.fromTo}>
                <p className={styles.from}>4800₽</p>
                <p className={styles.to}>3900₽</p>
              </div>
            </div>
          </div>
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
