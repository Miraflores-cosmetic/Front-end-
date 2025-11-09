import React from 'react';
import styles from './SideBar.module.scss';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import krem from '@/assets/images/krem.webp';
import girlwithsmile from '@/assets/images/girlsmile.webp';
import Bestsellers from '@/components/bestsellers/Bestsellers';

export type TabId = 'info' | 'orders' | 'favorites' | 'bonus' | 'logout';

export interface MenuItem {
  id: TabId;
  label: string;
  content?: React.ReactNode; // контент, который откроется в аккордеоне на мобилке
}

export interface SidebarProps {
  userName: string;
  menuItems: MenuItem[];
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  openAccordion: TabId | null; // 🔹 new prop
  setOpenAccordion: React.Dispatch<React.SetStateAction<TabId | null>>; // ✅ correct typing
}

const Sidebar: React.FC<SidebarProps> = ({
  userName,
  menuItems,
  activeTab,
  setActiveTab,
  openAccordion,
  setOpenAccordion
}) => {
  const isMobile = useScreenMatch(756);

  const handleClick = (id: TabId) => {
    if (isMobile) {
      // при мобилке: открываем/закрываем аккордеон
      setOpenAccordion(prev => (prev === id ? null : id));
      setActiveTab(id);
    } else {
      // при десктопе: просто активируем вкладку
      setActiveTab(id);
    }
  };

  const products = [
    {
      id: 1,
      title: 'Энзимный мусс для умывания',
      description: 'Энзимы риса + фруктовые энзимы и фруктовые кислоты',
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 2,
      title: 'Энзимный мусс для умывания',
      description: 'Энзимы риса + фруктовые энзимы и фруктовые кислоты',
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 3,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 4,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 5,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile
    },
    {
      id: 6,
      title: 'Цветочный мист',
      description: 'Мист для мягкой и сияющей кожи с экстрактом розы',
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile
    }
  ];

  return (
    <aside className={styles.sidebar}>
      <div className={styles.nameMenuWrapper}>
        <h1 className={styles.userName}>{userName}</h1>

        <nav className={styles.menu}>
          {menuItems.map(item => (
            <div key={item.id} className={styles.menuItemWrapper}>
              <li
                className={`${styles.menuItem} ${activeTab === item.id ? styles.active : ''}`}
                onClick={() => handleClick(item.id)}
              >
                {item.label}
                <div className={activeTab === item.id ? styles.activeDot : styles.notActiveDot} />
              </li>

              {/* Мобильный аккордеон */}
              {isMobile && openAccordion === item.id && item.content && (
                <div className={styles.accordionContent}>{item.content}</div>
              )}
            </div>
          ))}
        </nav>
      </div>
      {isMobile && <Bestsellers products={products} />}

      {!isMobile && (
        <div className={styles.support}>
          <p>Нужна помощь?</p>
          <a href='#'>Свяжитесь с нами</a>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
