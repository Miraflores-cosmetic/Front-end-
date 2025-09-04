// Header.tsx
import React from "react";
import styles from "./TopBlock.module.scss";
import flower from "@/assets/images/flower.png";
import flowerSmall from "@/assets/images/flowerSmall.png";
import lineTo from "@/assets/icons/lineTo.svg";
import info from "@/assets/icons/info.svg";
import txt1 from "@/assets/icons/Ботаническая1.svg";
import txt2 from "@/assets/icons/Ботаническая2.svg";
import { useIsMobile } from "@/hooks/useIsMobile";
const TopBlock: React.FC = () => {
  const isMobile = useIsMobile(450);

  console.log(isMobile, "isMobile");

  return (
    <section className={styles.topBlockContainer}>
      <article className={styles.left}>
        <div className={styles.wrapper}>
          {isMobile ? (
            <div className={styles.marqueeContent}>
              <p className={styles.textIcon}>Ботаническая</p>
              <p className={styles.textIcon}>Косметика</p>
            </div>
          ) : (
            <div className={styles.imageWrapper}>
              <img src={txt2} alt="text" />
              <img src={txt1} alt="text2" />
            </div>
          )}
          <div className={styles.content}>
            <img src={flowerSmall} alt="flowerSmall" />
            {isMobile ? (
              <div className={styles.textWrapper}>
                <p className={styles.textWrapperTitle}>Предложения</p>
                <p className={styles.textWrappertxt}>Подобрать уход</p>
                <p className={styles.textWrappertxt}>Акции</p>
              </div>
            ) : (
              <div className={styles.textWrapper}>
                <p className={styles.textWrapperTitle}>Подобрать уход</p>
                <p className={styles.textWrappertxt}>Программа благодарности</p>
                <p className={styles.textWrappertxt}>
                  Шаг за шагом к чистой коже
                </p>
              </div>
            )}
            <img src={lineTo} alt="text" className={styles.lineTo} />
            <img src={info} alt="text2" className={styles.info} />
          </div>
        </div>
      </article>
      <article className={styles.right}>
        <div>
          <img src={flower} alt="flower" />
        </div>
      </article>
    </section>
  );
};
export default TopBlock;
