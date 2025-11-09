import React from 'react';
import styles from './Review.module.scss';
import star from '@/assets/icons/star.svg';

interface ReviewProps {
  images: string[];
  title: string;
  subtitle: string;
  text: string;
  rating: number;
  date: string;
}

export const Review: React.FC<ReviewProps> = ({ images, title, subtitle, text, rating, date }) => {
  return (
    <div className={styles.review}>
      <div className={styles.images}>
        {images.map((img, i) => (
          <img key={i} src={img} alt={title} />
        ))}
      </div>

      <div className={styles.rating}>
        <div>
          {Array(rating)
            .fill(null)
            .map((_, i) => (
              <img key={i} src={star} alt={`${title} ${i + 1}`} />
            ))}
        </div>
        <p>{rating}.0</p>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.subtitle}>{subtitle}</p>
        <p className={styles.text}>{text}</p>
        <p className={styles.date}>{date}</p>
      </div>
    </div>
  );
};
