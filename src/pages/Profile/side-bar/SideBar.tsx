import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import { useScreenMatch } from "@/hooks/useScreenMatch";

export type TabId = "info" | "orders" | "favorites" | "bonus" | "logout";

interface MenuItem {
  id: TabId;
  label: string;
  content?: React.ReactNode; // контент, который откроется в аккордеоне на мобилке
}

interface SidebarProps {
  userName: string;
  menuItems: MenuItem[];
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName,
  menuItems,
  activeTab,
  setActiveTab,
}) => {
  const isMobile = useScreenMatch(756);
  const [openAccordion, setOpenAccordion] = useState<TabId | null>(null);

  const handleClick = (id: TabId) => {
    if (isMobile) {
      // при мобилке: открываем/закрываем аккордеон
      setOpenAccordion((prev) => (prev === id ? null : id));
      setActiveTab(id);
    } else {
      // при десктопе: просто активируем вкладку
      setActiveTab(id);
    }
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.nameMenuWrapper}>
        <h1 className={styles.userName}>{userName}</h1>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <div key={item.id} className={styles.menuItemWrapper}>
              <li
                className={`${styles.menuItem} ${
                  activeTab === item.id ? styles.active : ""
                }`}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
                <div
                  className={
                    activeTab === item.id
                      ? styles.activeDot
                      : styles.notActiveDot
                  }
                />
              </li>

              {/* Мобильный аккордеон */}
              {isMobile && openAccordion === item.id && item.content && (
                <div className={styles.accordionContent}>{item.content}</div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className={styles.support}>
        <p>Нужна помощь?</p>
        <a href="#">Свяжитесь с нами</a>
      </div>
    </aside>
  );
};

export default Sidebar;
