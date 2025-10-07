import React from "react";
import styles from "./Order.module.scss";

export interface CartItem {
  id: number;
  image: string;
  alt: string;
  name: string;
  size: string;
  discount?: string;
  count: string;
  priceOld?: string;
  priceNew?: string;
  isGift?: boolean;
}

interface OrderCartListProps {
  cartData: CartItem[];
}

const CardList: React.FC<OrderCartListProps> = ({ cartData }) => {
  return (
    <>
      {cartData.map((item) => (
        <div className={styles.orderCart} key={item.id}>
          <figure className={styles.cartImageWrapper}>
            <img src={item.image} alt={item.alt} className={styles.kremImage} />
          </figure>

          <div className={styles.cardInfoWrapper}>
            <div className={styles.top}>
              <div className={styles.texts}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.size}>{item.size}</p>
              </div>

              {item.discount && (
                <div className={styles.discount}>{item.discount}</div>
              )}
            </div>

            <div className={styles.bottom}>
              {
                <p className={styles.count}>
                  {item.discount ? item.count : null}
                </p>
              }

              {item.isGift ? (
                <div className={styles.surprise}>Подарок</div>
              ) : (
                <div className={styles.price}>
                  <p className={styles.priceOld}>{item.priceOld}</p>
                  <p className={styles.priceNew}>{item.priceNew}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CardList;
