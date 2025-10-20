import React from "react";
import styles from "./FavoritesContent.module.scss";
import { TabId } from "@/pages/Profile/side-bar/SideBar";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import krem from "@/assets/images/krem.webp";

import girlwithsmile from "@/assets/images/girlsmile.webp";
import FavoriteCard from "./FavoriteCart";

interface InfoMobileContentProps {
  setOpenAccordion: React.Dispatch<React.SetStateAction<TabId | null>>;
}

const FavoritesContent: React.FC<InfoMobileContentProps> = ({
  setOpenAccordion,
}) => {
  const isMobile = useScreenMatch(450);

  const handleCloseAccordion = () => {
    setOpenAccordion(null);
  };

  const products = [
    {
      id: 1,
      title: "Энзимный мусс для умывания",
      description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 2,
      title: "Энзимный мусс для умывания",
      description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 3,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 4,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 5,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 6,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
  ];

  return (
    <article className={styles.favoritesContent}>
      <p className={styles.title}>Избранное</p>

      <article className={styles.container}>
        {products.map((product) => (
          <FavoriteCard key={product.id} {...product} />
        ))}
      </article>

      {isMobile && (
        <p className={styles.closeBtn} onClick={handleCloseAccordion}>
          Закрыть
        </p>
      )}
    </article>
  );
};

export default FavoritesContent;
