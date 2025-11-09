import React, { useState } from 'react';
import styles from './TabBar.module.scss';

interface TabBarProps {
  tabs: string[];
  onChange?: (active: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, onChange }) => {
  const [active, setActive] = useState(tabs[0]);

  const handleClick = (tab: string) => {
    setActive(tab);
    onChange?.(tab);
  };

  return (
    <div className={styles.wrapper}>
      {tabs.map(tab => (
        <button
          key={tab}
          className={`${styles.tab} ${active === tab ? styles.active : ''}`}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabBar;
