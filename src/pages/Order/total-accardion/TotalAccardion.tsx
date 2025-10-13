import React, { useState } from "react";
import styles from "./TotalAccardion.module.scss";
import { TotalAccordionProps } from "../types";
import promoImage from "@/assets/icons/promocode.svg";
import addImage from "@/assets/icons/add.svg";
import userImage from "@/assets/images/userImage.webp";

const TotalAccordion: React.FC<TotalAccordionProps> = ({
  total,
  totalOld,
  products,
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
          <section className={styles.addPromo}>
            <div className={styles.promoWrapper}>
              <img src={promoImage} alt={"promo"} className={styles.promo} />
              <p className={styles.promoTxt}>
                Добавить промокод или сертификат
              </p>
            </div>
            <img src={addImage} alt={"addImage"} className={styles.addImage} />
          </section>

          {/* <section className={styles.summary}>
            <p>
              Скидка: <span>-{discount}₽</span>
            </p>
            <p>
              Промокод: <span>-{promo}₽</span>
            </p>
          </section> */}

          <section className={styles.sectionSumDiscount}>
            <div className={styles.sumWrapper}>
              <p className={styles.sum}>Сумма • {3} товара </p>
              <div className={styles.price}>
                <p className={styles.priceNew}>7 180₽ </p>
                <p className={styles.priceOld}>8 980₽</p>
              </div>
            </div>
            <div className={styles.discountWrapper}>
              <p className={styles.name}>Скидка</p>
              <p className={styles.value}>-800₽ </p>
            </div>
            <div className={styles.promocodeWrapper}>
              <p className={styles.name}>Промокод</p>
              <p className={styles.value}>-1 000₽ </p>
            </div>
          </section>

          <section className={styles.infoWrapper}>
            <div className={styles.userWrapper}>
              <img
                className={styles.userImage}
                src={userImage}
                alt="user image"
              />
              <div className={styles.userInfo}>
                <p className={styles.userName}>Дмитрий Патрацкий</p>
                <p className={styles.userRole}>CEO</p>
              </div>
            </div>
            <div className={styles.textsWrapper}>
              <p className={styles.text}>
                Многие наши товары изготавливаются непосредственно после заказа,
                поэтому срок от приёма заказа до его отправки такого заказа
                составляет <span>3-5 рабочих дня</span> после 100% оплаты.
              </p>
              <p className={styles.text}>
                После обработки заказа нашими операторами, информация о заказе
                будет отправлена на e-mail, указанный при оформлении заказа
              </p>
            </div>
          </section>
        </article>
      )}
    </section>
  );
};

export default TotalAccordion;
