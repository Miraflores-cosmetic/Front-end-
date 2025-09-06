import React from "react";
import Slider from "react-slick";
import styles from "./Bestsellers.module.scss";
import krem from "@/assets/images/krem.png";
import girlwithsmile from "@/assets/images/girlsmile.webp";
import { ProductCard } from "./product-card/ProductCard";

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
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    oldPrice: 4600,
    discount: 23,
    image: krem,
    hoverImage: girlwithsmile,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
    hoverImage: girlwithsmile,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
    hoverImage: girlwithsmile,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
    hoverImage: girlwithsmile,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    label: "Новинка",
    image: krem,
    hoverImage: girlwithsmile,
  },
];

export default function Bestsellers() {
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1750,
        settings: {
          slidesToShow: 3.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 3.2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3.1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2.3,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
          arrows: false,
          centerMode: false,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false,
        },
      },

      {
        breakpoint: 567,
        settings: {
          slidesToShow: 1.3,

          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1.2,

          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false,
        },
      },

      {
        breakpoint: 450,
        settings: {
          slidesToShow: 1.2,

          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1.1,

          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className={styles.bestsellers}>
      <h2 className={styles.title}>Бестселлеры</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Slider>
    </section>
  );
}
