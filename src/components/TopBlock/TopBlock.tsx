// Header.tsx
import React from "react";
import styles from "./TopBlock.module.scss";
import flower from "@/assets/images/flower.png";
import txt1 from "@/assets/icons/Ботаническая1.svg";
import txt2 from "@/assets/icons/Ботаническая2.svg";
import { useIsMobile } from "@/hooks/useIsMobile";
const TopBlock: React.FC = () => {
  const isMobile = useIsMobile(450);

  console.log(isMobile, "isMobile");

  return (
    <section className={styles.topBlockContainer}>
      <article className={styles.left}>
        <div className={styles.imageWrapper}>
          <img src={txt2} alt="text" />
          <img src={txt1} alt="text2" />
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
