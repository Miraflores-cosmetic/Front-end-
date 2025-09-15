import React from "react";
import styles from "./CatalogList.module.scss";
import krem from "@/assets/images/krem.webp";

interface CatalogItem {
  id: number;
  title: string;
  image: string;
}

interface CatalogProps {
  items: CatalogItem[];
}

const CatalogList: React.FC = () => {
  return (
    <div className={styles["catalog-grid"]}>
      {/* Row 1 */}
      <div className={`${styles.item} ${styles["row-1-item-1"]}`}>
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-1-item-2"]}`}>
        {" "}
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-1-item-3"]}`}>
        {" "}
        <img src={krem} />
      </div>
      {/* Row 2: три занятых колонки — две пустые + реальный + ещё одна пустая */}
      <div className={styles.placeholder}></div> {/* колонка 1 */}
      <div className={styles.placeholder}></div> {/* колонка 2 */}
      <div className={`${styles.item} ${styles["row-2-item-1"]}`}>
        {" "}
        <img src={krem} />
      </div>
      <div className={styles.placeholder}></div> {/* колонка 4 */}
      {/* Row 3 */}
      <div className={`${styles.item} ${styles["row-3-item-1"]}`}>
        {" "}
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-3-item-2"]}`}>
        I <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-3-item-3"]}`}>
        I <img src={krem} />
      </div>
      {/* Row 4: три занятых колонки — две пустые + реальный + ещё одна пустая */}
      <div className={styles.placeholder}></div> {/* колонка 1 */}
      <div className={`${styles.item} ${styles["row-4-item-1"]}`}>
        <img src={krem} />
      </div>
      <div className={styles.placeholder}></div> {/* колонка 2 */}
      <div className={styles.placeholder}></div> {/* колонка 4 */}
      {/* Row 5 */}
      <div className={`${styles.item} ${styles["row-5-item-5"]}`}>
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-5-item-5"]}`}>
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-5-item-5"]}`}>
        <img src={krem} />
      </div>
      <div className={`${styles.item} ${styles["row-5-item-5"]}`}>
        <img src={krem} />
      </div>
    </div>
  );
};

export default CatalogList;
