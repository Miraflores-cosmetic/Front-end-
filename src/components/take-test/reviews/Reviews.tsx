import React from "react";
import styles from "./Reviews.module.scss";
import img1 from "@/assets/images/etap3.webp";
import img2 from "@/assets/images/etap2.webp";
import ArrowToRight from "@/assets/icons/ArrowToRight.svg";

import { useScreenMatch } from "@/hooks/useScreenMatch";
import { Review } from "./review/Review";

// Типизация для одного отзыва
interface ReviewData {
  images: string[];
  title: string;
  subtitle: string;
  text: string;
  rating: number;
  date: string;
}

export const Reviews: React.FC = () => {
  const isMobile = useScreenMatch(680);

  // 🔹 массив с данными
  const reviews: ReviewData[] = [
    {
      images: [img1, img2],
      title: "НАБОР БОЛЬШОЙ И ВАЖНЫЙ",
      subtitle: "Мист для важной, гениальной кожи с экстрактом розы",
      text: "Текстура патчей очень лёгкая, невесомая. Аромат — отдельная сказка...",
      rating: 5,
      date: "02.12.2025",
    },

    {
      images: [],
      title: "НАБОР БОЛЬШОЙ И ВАЖНЫЙ",
      subtitle: "Мист для важной, гениальной кожи с экстрактом розы",
      text: "Текстура патчей очень лёгкая, невесомая. Аромат — отдельная сказка...",
      rating: 5,
      date: "02.12.2025",
    },
    {
      images: [img1],
      title: "НАБОР БОЛЬШОЙ И ВАЖНЫЙ",
      subtitle: "Мист для важной, гениальной кожи с экстрактом розы",
      text: "Текстура патчей очень лёгкая, невесомая. Аромат — отдельная сказка...",
      rating: 4,
      date: "03.12.2025",
    },
  ];

  return (
    <section className={styles.reviewsContainer}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Отзывы</p>
        <p className={styles.setReview}>оставить отзыв</p>
      </div>

      <div className={styles.reviewsWrapper}>
        <div>
          {reviews.map((review, index) => (
            <Review key={index} {...review} />
          ))}
        </div>
      </div>

      <div className={styles.allWrapper}>
        <p>все отзывы</p>
        <img src={ArrowToRight} alt="" />
      </div>
    </section>
  );
};
