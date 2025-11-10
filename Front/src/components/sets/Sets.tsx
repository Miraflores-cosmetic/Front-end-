import React from 'react';
import styles from './Sets.module.scss';
import arrowToRight from '@/assets/icons/ArrowToRight.svg';
import etap4 from '@/assets/images/etap4.webp';
import krem from '@/assets/images/krem.webp';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import { Link } from 'react-router-dom';

interface SetData {
  title: string;
  price: string;
  description: string;
  image: string;
}

const setData: SetData = {
  title: 'Набор большой и важный',
  price: '30590₽',
  description: 'Мист для влажной, глянцевой кожи с экстрактом розы',
  image: etap4
};

const LeftBlock: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <div className={styles.left}>
    <p className={styles.leftTitle}>
      С 2007 года мы разрабатываем и производим безопасные и эффективные средства ухода. У нас
      полностью своё производство, включая выпуск собственных растительных ингредиентов: меристемных
      экстрактов, мацератов и гидролатов.
    </p>

    {isMobile && (
      <div className={styles.rightWrapper}>
        <img src={krem} alt='Крем' />
      </div>
    )}

    <div className={styles.moreWrapper}>
      <Link to='/'>
        <p>Больше наборов</p>
        <img src={arrowToRight} alt='Показать больше наборов' />
      </Link>
    </div>
  </div>
);

const CenterBlock: React.FC<{ data: SetData; isMobile: boolean }> = ({ data, isMobile }) => {
  if (isMobile) return null;

  return (
    <div className={styles.center}>
      <Link to='/'>
        <img src={data.image} alt={data.title} className={styles.image} />
        <div className={styles.centerWrapper}>
          <div className={styles.centerTitleWrapper}>
            <p className={styles.centerTitle}>{data.title}</p>
            <p className={styles.centerPrice}>{data.price}</p>
          </div>
          <p className={styles.centerDesc}>{data.description}</p>
        </div>
      </Link>
    </div>
  );
};

const RightBlock: React.FC<{ isMobile: boolean }> = ({ isMobile }) =>
  isMobile ? null : (
    <div className={styles.right}>
      <div className={styles.rightWrapper}>
        <img src={krem} alt='Крем' />
      </div>
    </div>
  );

export const Sets: React.FC = () => {
  const isMobile = useScreenMatch(680);

  return (
    <section className={styles.setsContainer}>
      <h2 className={styles.title}>Наборы</h2>
      <div className={styles.setsWrapper}>
        <LeftBlock isMobile={isMobile} />
        <CenterBlock data={setData} isMobile={isMobile} />
        <RightBlock isMobile={isMobile} />
      </div>
    </section>
  );
};
