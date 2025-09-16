import React from "react";
import styles from "./MenuRightPart.module.scss";
import kosmetika from "@/assets/images/kosmetika.png";
import centerImageMenu from "@/assets/images/centerImageMenu.png";
import sun from "@/assets/icons/sun.svg";
import lineTo from "@/assets/icons/linToMenu.svg";

import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";

const MenuRightPart: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.right}>
      <p className={styles.close} onClick={() => dispatch(closeDrawer())}>
        Закрыть
      </p>
      <div className={styles.rightWraeer}>
        <div className={styles.imgWrapper}>
          <img src={kosmetika} alt="kosmetika" className={styles.kosmetika} />
          <img src={sun} alt="sun" className={styles.sun} />
          <p className={styles.discount}>23%</p>
          <div className={styles.size}>
            <p className={styles.size50}>50 мл</p>
            <p className={styles.size100}>100 мл</p>
          </div>
          <img src={lineTo} alt="lineTo" className={styles.lineTo} />
          <p className={styles.textTo}>
            обноснование почему именно этот товар здесь
          </p>
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.infoTop}>
            <p className={styles.infoTopName}>Цветочный мист</p>
            <div className={styles.infoPrice}>
              <p className={styles.from}>4000₽</p>
              <p className={styles.to}>3590₽</p>
            </div>
          </div>
          <p className={styles.description}>
            Мист для влажной, глянцевой кожи с экстрактом розы
          </p>
        </div>
      </div>
      <div className={styles.centerImageContainer}>
        <img src={centerImageMenu} alt="centerImageMenu" />
        <button>Подобрать уход</button>
      </div>
    </div>
  );
};

export default MenuRightPart;
