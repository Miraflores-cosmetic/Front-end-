import React from "react";
import styles from "./MenuDrawer.module.scss";
import MenuList from "./menu-list/MenuList";
import kosmetika from "@/assets/images/kosmetika.png";
import centerImageMenu from "@/assets/images/centerImageMenu.png";
import sun from "@/assets/icons/sun.svg";
import lineTo from "@/assets/icons/linToMenu.svg";
import linToMenu from "@/assets/icons/Miraflores_logo.svg";
import menuLine from "@/assets/icons/menuLine.svg";

import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const MenuDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useScreenMatch(450);

  const menuData = {
    navigation: {
      title: "Каталог",
      link: "catalog",
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
      link: "company",
      withColor: true,
      items: [
        { label: "Полезные статьи", href: "/contacts" },
        { label: "Программа благодарности", href: "/contacts" },
        { label: "R&D исследование растений", href: "/contacts" },
      ],
    },
    info: {
      title: "Информация",
      link: "info",
      items: [
        { label: "Условия пользования", href: "/contacts" },
        { label: "Политика конфеденциальности", href: "/contacts" },
        { label: "Оплата и доставка", href: "/contacts" },
        { label: "FAQ", href: "/contacts" },
        { label: "Контакты", href: "/contacts" },
      ],
    },

    ...(isMobile && {
      account: {
        title: "Аккаунт",
        items: [],
      },
    }),
  };

  return (
    <div className={styles.menuContainer}>
      {isMobile && (
        <div className={styles.menuMobileHeader}>
          <img src={menuLine} alt="menuLine" />
          <img src={linToMenu} alt="linToMenu" />
        </div>
      )}
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
    </div>
  );
};

export default MenuDrawer;
