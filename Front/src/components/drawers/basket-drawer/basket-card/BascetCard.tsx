import React from 'react';
import styles from './BasketCard.module.scss';

import trash from '@/assets/icons/trash.svg';
import add from '@/assets/icons/add.svg';
import { useScreenMatch } from '@/hooks/useScreenMatch';

interface BasketCardProps {
  image: string;
  name: string;
  size: string;
  count: number;
  discount: string;
  fromPrice: string;
  toPrice: string;
  onAdd?: () => void;
  onRemove?: () => void;
}

const BasketCard: React.FC<BasketCardProps> = ({
  image,
  name,
  size,
  count,
  discount,
  fromPrice,
  toPrice,
  onAdd,
  onRemove
}) => {
  const isMobile = useScreenMatch(664);

  return (
    <div className={styles.basketCardWrapper}>
      <div className={styles.basketCard}>
        <div className={styles.basketImage}>
          <img src={image} alt={name} className={styles.kremImage} />
        </div>
        <div className={styles.basketInfo}>
          <div className={styles.topInfo}>
            <div>
              <p className={styles.productName}>{name}</p>
              <p className={styles.productSize}>{size}</p>
              {isMobile && (
                <div className={styles.mobileBottomWrapper}>
                  <div className={styles.addProduct}>
                    <div className={styles.addProductInner}>
                      <img
                        src={trash}
                        alt='trash'
                        className={styles.trashImage}
                        onClick={onRemove}
                      />
                      <p className={styles.trashCount}>{count}</p>
                      <img src={add} alt='add' className={styles.addImage} onClick={onAdd} />
                    </div>
                  </div>
                  <div className={styles.fromToMobile}>
                    <p className={styles.fromMobile}>{fromPrice}</p>
                    <p className={styles.toMobile}>{toPrice}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.bottomInfo}>
            <img src={trash} alt='trash' className={styles.trashImage} onClick={onRemove} />
            <p className={styles.trashCount}>{count}</p>
            <img src={add} alt='add' className={styles.addImage} onClick={onAdd} />
          </div>
        </div>
        <div className={styles.baskePrice}>
          <p className={styles.discount}>{discount}</p>
          <div className={styles.fromTo}>
            <p className={styles.from}>{fromPrice}</p>
            <p className={styles.to}>{toPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketCard;
