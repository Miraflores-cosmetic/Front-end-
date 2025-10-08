import React, { useState } from "react";
import styles from "./TotalAccardion.module.scss";
import { TotalAccordionProps } from "../types";

const TotalAccordion: React.FC<TotalAccordionProps> = ({
  total,
  totalOld,
  products,
  discount,
  promo,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className={styles.accordion}>
      <button className={styles.header} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.headerLeft}>
          <span className={styles.title}>Итого</span>
          <div className={`${styles.arrow} ${isOpen ? styles.open : ""}`} />
        </div>
        <div className={styles.price}>
          <p className={styles.count}>3 товара</p>
          <p className={styles.priceNew}>{total}</p>
          <p className={styles.priceOld}>{totalOld}</p>
        </div>
      </button>

      {isOpen && (
        <article className={styles.content}>
          <section className={styles.productList}>
            {products.map((item) => (
              <div key={item.id} className={styles.productItem}>
                <div className={styles.imageWrapper}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className={styles.image}
                  />
                </div>
                <div className={styles.productInfo}>
                  <div className={styles.nameSize}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.size}>{item.size}</p>
                  </div>
                  <p className={styles.priceBlock}>
                    {!item.isGift && (
                      <div className={styles.price}>
                        <p className={styles.count}>3 товара</p>
                        <p className={styles.priceNew}>{total}</p>
                        <p className={styles.priceOld}>{totalOld}</p>
                      </div>
                    )}
                    {item.discount && (
                      <span className={styles.discount}>{item.discount}</span>
                    )}
                    {item.isGift && (
                      <span className={styles.gift}>Подарок</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </section>
          <section className={styles.addPromo}></section>

          <section className={styles.summary}>
            <p>
              Скидка: <span>-{discount}₽</span>
            </p>
            <p>
              Промокод: <span>-{promo}₽</span>
            </p>
          </section>

          <div className={styles.footer}>
            <p>
              Многие наши товары изготавливаются непосредственно после заказа,
              поэтому срок от прибытия заказа до его отправки может составлять
              3–5 рабочих дней после 100% оплаты.
            </p>
            <p>
              После обработки заказа нашими операторами информация о заказе
              будет отправлена на e-mail, указанный при оформлении.
            </p>
          </div>
        </article>
      )}
    </section>
  );
};

export default TotalAccordion;
