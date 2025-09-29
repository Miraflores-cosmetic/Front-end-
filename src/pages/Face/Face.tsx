import React from "react";
import styles from "./Face.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import footerImage from "@/assets/images/footerImage.webp";
import TabBar from "@/components/tab-bar/TabBar";

import krem from "@/assets/images/krem.webp";
import kosmetika from "@/assets/images/kosmetika.png";

import girlwithsmile from "@/assets/images/girlsmile.webp";
import { FaceCard } from "./face-card/FaceCard";

const FacePage: React.FC = () => {
  // const isMobile = useScreenMatch(756);
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
      type: "sun",
    },
    {
      id: 2,
      title: "Энзимный мусс для умывания",
      description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: kosmetika,
      hoverImage: girlwithsmile,
      type: "moon",
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
      type: "sun",
    },
    {
      id: 4,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: kosmetika,
      hoverImage: girlwithsmile,
      type: "moon",
    },
    {
      id: 5,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
      type: "sun",
    },
    {
      id: 6,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
      type: "sun",
    },
  ];
  return (
    <article className={styles.faceContainer}>
      <Header />
      <p className={styles.title}>Лицо</p>
      <TabBar
        tabs={["КРЕМ", "МАСЛО", "ТОНИК-ЭССЕНЦИЯ"]}
        onChange={(tab) => console.log("Выбран:", tab)}
      />
      <section className={styles.wrapper}>
        {products.map((product) => (
          <FaceCard key={product.id} product={product} />
        ))}
      </section>
      <Footer footerImage={footerImage} />
    </article>
  );
};

export default FacePage;
