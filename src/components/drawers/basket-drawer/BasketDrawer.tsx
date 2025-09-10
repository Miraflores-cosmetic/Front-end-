import React from "react";
import styles from "./BasketDrawer.module.scss";

interface CartDrawerProps {
  isOpen: string | null;
  onClose: () => void;
}

const BasketDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
      <div className={styles.header}>
        <h2>Корзина</h2>
        <button onClick={onClose} className={styles.closeBtn}>
          ×
        </button>
      </div>

      <div className={styles.content}>
        {/* Здесь выводим товары */}
        <p>Цветочный мист с экстрактами розы</p>
      </div>
    </div>
  );
};

export default BasketDrawer;
