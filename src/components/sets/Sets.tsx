import React from "react";
import styles from "./Sets.module.scss";
import arrowToRight from "@/assets/icons/ArrowToRight.svg";
import krem from "@/assets/images/krem.webp";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import etap4 from "@/assets/images/etap4.webp";
import girlsmile from "@/assets/images/girlsmile.webp";
import { ProductCard } from "../bestsellers/product-card/ProductCard";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  label?: string;
  image: string;
  hoverImage: string;
}

const productData: Product = {
  id: 1,
  title: "Набор большой и важный",
  description: "Мист для влажной, глянцевой кожи с экстрактом розы",
  price: 30590,
  oldPrice: 35990,
  discount: 15,
  label: "Новинка",
  image: etap4,
  hoverImage: girlsmile,
};

const LeftBlock: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <div className={styles.left}>
    <p className={styles.leftTitle}>
      С 2007 года мы разрабатываем и производим безопасные и эффективные
      средства ухода. У нас полностью своё производство, включая выпуск
      собственных растительных ингредиентов: меристемных экстрактов, мацератов и
      гидролатов.
    </p>

    {isMobile && (
      <div className={styles.rightWrapper}>
        <img src={krem} alt="Крем" />
      </div>
    )}

    <div className={styles.moreWrapper}>
      <p>Больше наборов</p>
      <img src={arrowToRight} alt="Показать больше наборов" />
    </div>
  </div>
);

const CenterBlock: React.FC<{ product: Product; isMobile: boolean }> = ({
  product,
  isMobile,
}) =>
  isMobile ? null : (
    <div className={styles.setsCart}>
      <ProductCard product={product} />
    </div>
  );

const RightBlock: React.FC<{ isMobile: boolean }> = ({ isMobile }) =>
  isMobile ? null : (
    <div className={styles.right}>
      <div className={styles.rightWrapper}>
        <img src={krem} alt="Крем" />
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
        <CenterBlock product={productData} isMobile={isMobile} />
        <RightBlock isMobile={isMobile} />
      </div>
    </section>
  );
};
