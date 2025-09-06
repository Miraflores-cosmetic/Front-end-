import React, { useState } from "react";
import styles from "../Bestsellers.module.scss";
import gift from "@/assets/icons/gift.svg";
import whiteGift from "@/assets/icons/whiteGift.png";

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

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredGift, setIsHoveredGift] = useState(false);

  return (
    <div
      className={styles.card}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={styles.imageWrapper}
        style={{
          backgroundImage: `url(${
            isHovered ? product.hoverImage : product.image
          })`,
        }}
      >
        <div>
          {product.discount && (
            <span className={styles.discount}>-{product.discount}%</span>
          )}
          {product.label && (
            <span className={styles.label}>{product.label}</span>
          )}
        </div>

        {isHovered && (
          <div className={styles.addToCardWrapper}>
            <button className={styles.addToCart}>Добавить в корзину</button>
            <div
              className={styles.gift}
              onMouseEnter={() => setIsHoveredGift(true)}
              onMouseLeave={() => setIsHoveredGift(false)}
            >
              <img src={isHoveredGift ? whiteGift : gift} alt="gift" />
            </div>
          </div>
        )}
        {!isHovered && (
          <div className={styles.sizeWrapper}>
            <button className={styles.size50}>50 мл</button>
            <button className={styles.size100}>100 мл</button>
          </div>
        )}
      </div>

      <div className={styles.info}>
        <div className={styles.txtWrapper}>
          <h3 className={styles.name}>{product.title}</h3>
          <p className={styles.desc}>{product.description}</p>
        </div>
        <div className={styles.priceWrapper}>
          {product.oldPrice && (
            <span className={styles.oldPrice}>{product.oldPrice}₽</span>
          )}
          <span className={styles.price}>{product.price}₽</span>
        </div>
      </div>
    </div>
  );
};
