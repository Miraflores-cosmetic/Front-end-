import React from "react";
import styles from "./SideBar.module.scss";

export type TabId = "info" | "orders" | "favorites" | "bonus" | "logout";

interface MenuItem {
  id: TabId;
  label: string;
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
  return (
    <aside className={styles.sidebar}>
      <div className={styles.nameMenuWrapper}>
        <h1 className={styles.userName}>{userName}</h1>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`${styles.menuItem} ${
                activeTab === item.id ? styles.active : ""
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.label}
              <div
                className={
                  activeTab === item.id ? styles.activeDot : styles.notActiveDot
                }
              />
            </button>
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
