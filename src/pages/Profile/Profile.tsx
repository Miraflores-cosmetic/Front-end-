import React, { useState } from "react";
import styles from "./Profile.module.scss";
import Header from "@/components/Header/Header";
import Sidebar, { TabId } from "./side-bar/SideBar";
import ProfileContent from "./content-wrapper/ProfileContent";
import InfoContent from "./contents/info-content/InfoContent";
import OrdersContent from "./contents/orders-content/OrdersContent";
import FavoritesContent from "./contents/favorites-content/FavoritesContent";
import BonusContent from "./contents/bonuses-content/BonusContent";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("info");
  const isMobile = useScreenMatch(756);

  const menuItems = [
    { id: "info" as TabId, label: "Общая информация" },
    { id: "orders" as TabId, label: "Заказы" },
    { id: "favorites" as TabId, label: "Избранное" },
    { id: "bonus" as TabId, label: "Бонусный счёт" },
    { id: "logout" as TabId, label: "Выйти" },
  ];
  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return <InfoContent />;
      case "orders":
        return <OrdersContent />;
      case "favorites":
        return <FavoritesContent />;
      case "bonus":
        return <BonusContent />;
    }
  };
  return (
    <main className={styles.profileContainer}>
      <Header />
      <section className={styles.contentWrapper}>
        <div className={styles.profile}>
          {/* ЛЕВАЯ КОЛОНКА */}
          <Sidebar
            userName="ФЕДОР П."
            menuItems={menuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* ПРАВАЯ ЧАСТЬ */}
          {!isMobile && (
            <ProfileContent
              activeTab={activeTab}
              renderContent={renderContent}
            />
          )}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
