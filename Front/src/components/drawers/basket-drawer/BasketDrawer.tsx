import React, { useEffect } from 'react';
import styles from './BasketDrawer.module.scss';
import basketKrem from '@/assets/images/krem.webp';

import blackBasketTrash from '@/assets/icons/blackBasketTrash.svg';
import BasketCard from './basket-card/BascetCard';
import { useDispatch } from 'react-redux';
import { closeDrawer } from '@/store/slices/drawerSlice';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/helpers/helpers';

const BasketDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalFromPrice, setTotalFromPrice] = React.useState(0);
  const [totalToPrice, setTotalToPrice] = React.useState(0);

  const items = [
    {
      image: basketKrem,
      name: 'Цветочный мист с экстрактами розы',
      size: '50 мл',
      count: 1,
      discount: '-23%',
      fromPrice: '4800₽',
      toPrice: '3900₽'
    },
    {
      image: basketKrem,
      name: 'Мист с экстрактом лаванды',
      size: '100 мл',
      count: 2,
      discount: '-15%',
      fromPrice: '5600₽',
      toPrice: '4760₽'
    },
    {
      image: basketKrem,
      name: 'Увлажняющий мист для лица',
      size: '75 мл',
      count: 1,
      discount: '-10%',
      fromPrice: '4200₽',
      toPrice: '3780₽'
    }
  ];

  useEffect(() => {
    let totalFrom = 0;
    let totalTo = 0;

    items.forEach(item => {
      const fromPriceNumber = parseInt(item.fromPrice.replace('₽', ''));
      const toPriceNumber = parseInt(item.toPrice.replace('₽', ''));

      totalFrom += fromPriceNumber * item.count;
      totalTo += toPriceNumber * item.count;
    });

    setTotalFromPrice(totalFrom);
    setTotalToPrice(totalTo);
  }, [items]);

  const handleOrder = () => {
    dispatch(closeDrawer());
    navigate('/order');
  };
  return (
    <div className={`${styles.drawer}`}>
      <div className={styles.contentWrapper}>
        <div className={styles.header}>
          <p className={styles.title}>Корзина</p>
          <button onClick={() => dispatch(closeDrawer())} className={styles.closeTxt}>
            Закрыть
          </button>
        </div>
        <div className={styles.progresContainer}>
          <div className={styles.progresContent}>
            <p className={styles.txt1}>15 780₽ до</p>
            <p className={styles.txt2}> бесплатной доставки</p>
          </div>
        </div>

        <div className={styles.basketList}>
          {items.map((item, idx) => (
            <BasketCard key={idx} {...item} />
          ))}
        </div>
      </div>
      <div className={styles.orderButtonContainer}>
        <div className={styles.txtWrapper}>
          <p className={styles.sum}>Сумма • {items.length} товара </p>
          <div className={styles.price}>
            <p className={styles.priceOld}>
              {formatCurrency(totalFromPrice)}
              <span className={styles.priceCurrency1}>₽</span>
            </p>
            <p className={styles.priceNew}>
              {formatCurrency(totalToPrice)}
              <span className={styles.priceCurrency2}>₽</span>
            </p>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          <button className={styles.orderButtonLeft} onClick={handleOrder}>
            Оформить заказ
          </button>
          <img src={blackBasketTrash} alt={`blackBasketTrash`} />
        </div>
      </div>
    </div>
  );
};

export default BasketDrawer;
