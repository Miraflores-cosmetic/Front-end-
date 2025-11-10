import React, { useState, useEffect } from 'react';
import styles from './SizeTabs.module.scss';

export type Option = {
  id: string;
  label: string;
  price: number;
  oldPrice?: number;
  discount?: number;
};

interface ProductTabsProps {
  options: Option[];
  onChange?: (option: Option) => void;
}

const SizeTabs: React.FC<ProductTabsProps> = ({ options, onChange }) => {
  const [activeId, setActiveId] = useState(options[0].id);
  const activeOption = options.find(o => o.id === activeId)!;

  useEffect(() => {
    if (onChange) onChange(activeOption)
  }, [activeId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        {options.map(opt => (
          <button
            key={opt.id}
            className={`${styles.tab} ${opt.id === activeId ? styles.active : ''}`}
            onClick={() => setActiveId(opt.id)}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className={styles.info}>
        <span className={styles.price}>{activeOption.price}₽</span>
        {activeOption.oldPrice && <span className={styles.oldPrice}>{activeOption.oldPrice}₽</span>}
        {activeOption.discount && (
          <span className={styles.discount}>-{activeOption.discount}%</span>
        )}
      </div>
    </div>
  );
};

export default SizeTabs;
