import React, { useState } from 'react';
import styles from './Profile.module.scss';
import Header from '@/components/Header/Header';
import Sidebar, { TabId } from './side-bar/SideBar';
import ProfileContent from './content-wrapper/ProfileContent';
import InfoContent from './contents/info-content/InfoContent';
import OrdersContent from './contents/orders-content/OrdersContent';
import BonusContent from './contents/bonuses-content/BonusContent';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import InfoMobileContent from './contents/info-content/mobile-content/InfoMobileContent';
import FavoritesContent from './contents/favorites-content/FavoritesContent';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('info');
  const [openAccordion, setOpenAccordion] = useState<TabId | null>(null);

  const isMobile = useScreenMatch(756);

  const menuMobileItems = [
    {
      id: 'info' as TabId,
      label: 'Общая информация',
      content: <InfoMobileContent setOpenAccordion={() => setOpenAccordion(null)} />
    },
    {
      id: 'orders' as TabId,
      label: 'Заказы',
      content: <OrdersContent setOpenAccordion={() => setOpenAccordion(null)} />
    },
    {
      id: 'favorites' as TabId,
      label: 'Избранноеr',
      content: <FavoritesContent setOpenAccordion={() => setOpenAccordion(null)} />
    },
    {
      id: 'bonus' as TabId,
      label: 'Бонусный счёт',
      content: <div>Контент избранного44</div>
    },
    {
      id: 'logout' as TabId,
      label: 'Выйти',
      content: <div>Контент избранного55</div>
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'info':
        return <InfoContent />;
      case 'orders':
        return <OrdersContent />;
      case 'favorites':
        return <FavoritesContent setOpenAccordion={() => setOpenAccordion(null)} />;
      case 'bonus':
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
            userName='ФЕДОР П.'
            menuItems={menuMobileItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            openAccordion={openAccordion}
            setOpenAccordion={setOpenAccordion}
          />
          {/* ПРАВАЯ ЧАСТЬ */}
          {!isMobile && <ProfileContent activeTab={activeTab} renderContent={renderContent} />}
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
