import React from "react";
import styles from "../right-part/OrderRightPart.module.scss";
import promocode from "@/assets/icons/promocode.svg";
import minus from "@/assets/icons/minus.svg";

const Sertificate = () => {
  return (
    <section className={styles.sertificatWrapper}>
      <div className={styles.promoWrapper}>
        <div className={styles.promoWrapperLeft}>
          <img src={promocode} alt={"promocode"} className={styles.promocode} />
          <p className={styles.promoTxt}>Добавить промокод или сертификат</p>
        </div>
        <img src={minus} alt={"minus"} className={styles.minus} />
      </div>
      <p className={styles.SALE}>SALE2025</p>
    </section>
  );
};

export default Sertificate;
