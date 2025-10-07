import React from "react";
import styles from "./Order.module.scss";

const SumDiscount = () => {
  return (
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
  );
};

export default SumDiscount;
