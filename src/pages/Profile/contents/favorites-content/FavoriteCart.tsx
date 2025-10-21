import React, { useState } from "react";
import styles from "./FavoritesContent.module.scss";
import gift from "@/assets/icons/gift.svg";
import whiteGift from "@/assets/icons/whiteGift.webp";

interface FavoriteCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  hoverImage: string;
}

const FavoriteCard: React.FC<FavoriteCardProps> = ({
  title,
  description,
  price,
  oldPrice,
  image,
  hoverImage,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredGift, setIsHoveredGift] = useState(false);

  return (
    <article className={styles.wrapper}>
      <div
        className={styles.cart}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          backgroundImage: `url(${isHovered ? hoverImage : image})`,
        }}
      >
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
      </div>

      <div className={styles.info}>
        <div className={styles.txtWrapper}>
          <h3 className={styles.name}>{title}</h3>
          <p className={styles.desc}>{description}</p>
        </div>
        <div className={styles.priceWrapper}>
          {/* {oldPrice && <span className={styles.oldPrice}>{oldPrice}₽</span>} */}
          <span className={styles.price}>{price}₽</span>
        </div>
      </div>
    </article>
  );
};

export default FavoriteCard;
