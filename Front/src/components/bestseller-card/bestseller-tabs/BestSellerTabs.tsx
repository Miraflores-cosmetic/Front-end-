import React, { useState } from "react";
import styles from "./BestSellerTabs.module.scss";
import { useScreenMatch } from "@/hooks/useScreenMatch";

type Option = {
  id: string;
  label: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  Content: React.FC;
};

interface ProductTabsProps {
  options: Option[];
}

const BestSellerTabs: React.FC<ProductTabsProps> = ({ options }) => {
  const [activeId, setActiveId] = useState(options[0].id);
  const activeOption = options.find((o) => o.id === activeId)!;
  const isMobile = useScreenMatch(450);

  const ActiveContent = activeOption.Content;

  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <p className={`${styles.tabMobile}`}>Описание</p>
      ) : (
        <div className={styles.tabs}>
          {options.map((opt) => (
            <button
              key={opt.id}
              className={`${styles.tab} ${
                opt.id === activeId ? styles.active : ""
              }`}
              onClick={() => setActiveId(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      <div className={styles.info}>
        <ActiveContent />
      </div>
    </div>
  );
};

export default BestSellerTabs;
