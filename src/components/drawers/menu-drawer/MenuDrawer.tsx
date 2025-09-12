import React from "react";
import styles from "./MenuDrawer.module.scss";
import MenuList from "./menu-list/MenuList";
import kosmetika from "@/assets/images/kosmetika.png";
import sun from "@/assets/icons/sun.svg";
import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";

const MenuDrawer: React.FC = () => {
  const dispatch = useDispatch();

  const menuData = {
    navigation: {
      title: "Каталог",
      items: [
        { label: "Наборы", href: "/" },
        { label: "Кожа", href: "/about" },
        { label: "Волосы", href: "/contacts" },
        { label: "Эфирные масла", href: "/contacts" },
        { label: "Экотовары", href: "/contacts" },
        { label: "Персональный уход", href: "/contacts" },
        { label: "Косметическое ателье", href: "/contacts" },
        { label: "Хочу знать больше", href: "/contacts" },
        { label: "Что подарить?", href: "/contacts" },
      ],
    },
    about: {
      title: "О Компании",
      withColor: true,
      items: [
        { label: "Полезные статьи", href: "/contacts" },
        { label: "Программа благодарности", href: "/contacts" },
        { label: "R&D исследование растений", href: "/contacts" },
      ],
    },
    info: {
      title: "Информация",
      items: [
        { label: "Условия пользования", href: "/contacts" },
        { label: "Политика конфеденциальности", href: "/contacts" },
        { label: "Оплата и доставка", href: "/contacts" },
        { label: "FAQ", href: "/contacts" },
        { label: "Контакты", href: "/contacts" },
      ],
    },
  };

  return (
    <div className={styles.menuContainer}>
      <div className={styles.left}>
        {Object.entries(menuData).map(([key, section]) => (
          <MenuList
            key={key}
            title={section.title}
            items={section.items}
            withColor={(section as any).withColor}
          />
        ))}
      </div>

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
      </div>
    </div>
  );
};

export default MenuDrawer;
