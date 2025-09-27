import React from "react";
import styles from "./BestSellerEtaps.module.scss";
import line from "@/assets/icons/Line-Dots.svg";

export interface BestSellerEtap {
  id: string | number;
  title: string;
  name: string;
}

interface EtapsProps {
  items: BestSellerEtap[];
}

const BestSellerEtaps: React.FC<EtapsProps> = ({ items }) => {
  return (
    <div className={styles.etapsWrapper}>
      <div className={styles.etaps}>
        {items.map((item, ind) => (
          <div
            key={item.id}
            className={` ${ind === 1 ? styles.etapActive : styles.etap}`}
          >
            <div className={styles.etapTextWrapper}>
              <p className={styles.etapTitle}>{item.title}</p>
              <p className={styles.etapName}>{item.name}</p>
            </div>
            <img src={line} alt="line icon" className={styles.check} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSellerEtaps;
