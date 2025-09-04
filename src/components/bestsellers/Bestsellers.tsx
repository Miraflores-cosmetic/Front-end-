import React from "react";
import Slider from "react-slick";
import styles from "./Bestsellers.module.scss";
import krem from "@/assets/images/krem.png";

const products = [
  {
    id: 1,
    title: "Энзимный мусс для умывания",
    description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
    price: 3590,
    oldPrice: 4600,
    discount: 22,
    image: krem,
  },
  {
    id: 2,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    oldPrice: 4600,
    discount: 23,
    image: krem,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
  },
];

export default function Bestsellers() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section className={styles.bestsellers}>
      <h2 className={styles.title}>Бестселлеры</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <div>
                {product.discount && (
                  <span className={styles.discount}>-{product.discount}%</span>
                )}
                {product.label && (
                  <span className={styles.label}>{product.label}</span>
                )}
              </div>
              <img src={product.image} alt={product.title} />
              <div className={styles.sizeWrapper}>
                <button className={styles.size50}>50 мл</button>
                <button className={styles.size100}>100 мл</button>
              </div>
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
        ))}
      </Slider>
    </section>
  );
}
