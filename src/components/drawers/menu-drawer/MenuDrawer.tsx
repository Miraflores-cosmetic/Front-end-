import React from "react";
import styles from "./MenuDrawer.module.scss";
import MenuList from "./menu-list/MenuList";
import linToMenu from "@/assets/icons/Miraflores_logo.svg";
import menuLine from "@/assets/icons/menuLine.svg";

import { useScreenMatch } from "@/hooks/useScreenMatch";
import MenuRightPart from "./menu-right-part/MenuRightPart";

const MenuDrawer: React.FC = () => {
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

      <MenuRightPart />
    </div>
  );
};

export default MenuDrawer;
