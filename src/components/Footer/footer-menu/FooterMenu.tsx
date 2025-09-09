import React from "react";
import styles from "./FooterMenu.module.scss";
import { useScreenMatch } from "@/hooks/useScreenMatch";

type MenuItem = {
  label: string;
  href: string;
};

type FooterMenuProps = {
  title: string;
  items: MenuItem[];
};

const FooterMenu: React.FC<FooterMenuProps> = ({ title, items }) => {
  const isMobile = useScreenMatch(450);

  return (
    <div className={styles.footerMenu}>
      <p className={styles.menuTitle}>{title}</p>
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

export default FooterMenu;
