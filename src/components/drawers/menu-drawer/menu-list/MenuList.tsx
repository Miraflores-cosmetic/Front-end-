import React from "react";
import styles from "./MenuList.module.scss";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import arrow from "@/assets/icons/ArrowToRight.svg";
import mobileImage from "@/assets/images/mobileImage.webp";
import { useNavigate } from "react-router-dom";

type MenuItem = {
  label: string;
  href: string;
};

type MenuListProps = {
  title: string;
  items: MenuItem[];
  withColor?: boolean;
};

const MenuList: React.FC<MenuListProps> = ({ title, items, withColor }) => {
  const isMobile = useScreenMatch(450);
  const navigate = useNavigate();

  return (
    <div className={styles.menu}>
      <div className={styles.titleWrapper}>
        <p
          className={`${styles.menuTitle} ${withColor ? styles.withColor : ""}`}
        >
          {title}
        </p>
        <img
          src={arrow}
          alt=""
          className={styles.arraw}
          onClick={() => navigate("catalog")}
        />
      </div>
      {isMobile && title === "Аккаунт" && (
        <div className={styles.mobileWrapper}>
          <p className={styles.mobileWrapperTxt}>
            Подберем персональный уход за 5 мин!
          </p>
          <img
            src={mobileImage}
            alt="mobileImage"
            className={styles.mobileImage}
          />
          <button className={styles.mobileBtn}>Пройти тест</button>
        </div>
      )}
      <ul className={styles.menuList}>
        {items.map((item, index) => (
          <li key={index} className={styles.menuItem}>
            <a href={item.href}>{item.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
