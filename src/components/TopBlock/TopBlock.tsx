import React from "react";
import styles from "./TopBlock.module.scss";

import flower from "@/assets/images/flower.png";
import flowerSmall from "@/assets/images/flowerSmall.png";
import lineTo from "@/assets/icons/lineTo.svg";
import info from "@/assets/icons/info.svg";

import { useIsMobile } from "@/hooks/useIsMobile";
import DesktopTextImages from "./DesktopTextImages";
import TextWrapper from "./TextWrapper";
import MarqueeText from "./MarqeenText";

const TopBlock: React.FC = () => {
  const isMobile = useIsMobile(700);

  const mobileTexts = {
    title: "Предложения",
    items: ["Подобрать уход", "Акции"],
  };

  const desktopTexts = {
    title: "Подобрать уход",
    items: ["Программа благодарности", "Шаг за шагом к чистой коже"],
  };

  return (
    <section className={styles.topBlockContainer}>
      <article className={styles.left}>
        <div className={styles.wrapper}>
          {isMobile ? <MarqueeText /> : <DesktopTextImages />}

          <div className={styles.content}>
            <img src={flowerSmall} alt="Маленький цветок" />

            <TextWrapper
              title={isMobile ? mobileTexts.title : desktopTexts.title}
              items={isMobile ? mobileTexts.items : desktopTexts.items}
            />

            <img src={lineTo} alt="Стрелка" className={styles.lineTo} />
            <img src={info} alt="Информация" className={styles.info} />
          </div>
        </div>
      </article>

      <article className={styles.right}>
        <img src={flower} alt="Цветок" />
      </article>
    </section>
  );
};

export default TopBlock;
