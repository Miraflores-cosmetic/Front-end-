import React from "react";
import styles from "../right-part/OrderRightPart.module.scss";
import promocode from "@/assets/icons/promocode.svg";
import minus from "@/assets/icons/minus.svg";
import plus from "@/assets/icons/add.svg"; // 👈 можно использовать ту же иконку что была для добавления

interface SertificateProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sertificate: React.FC<SertificateProps> = ({ isOpen, onToggle }) => {
  return (
    <section className={styles.sertificatWrapper}>
      <div className={styles.promoWrapper}>
        <div className={styles.promoWrapperLeft}>
          <img src={promocode} alt="promocode" className={styles.promocode} />
          <p className={styles.promoTxt}>Добавить промокод или сертификат</p>
        </div>

        {/* Меняем иконку при открытии/закрытии */}
        <img
          src={isOpen ? minus : plus}
          alt={isOpen ? "minus" : "plus"}
          className={styles.minus}
          onClick={onToggle}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* Показываем SALE только когда открыт */}
      {isOpen && <p className={styles.SALE}>SALE2025</p>}
    </section>
  );
};

export default Sertificate;
