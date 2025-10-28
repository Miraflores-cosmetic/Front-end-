import React from "react";
import styles from "./Home.module.scss";
import TopBlock from "@/components/TopBlock/TopBlock";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import AboutBlock from "@/components/AboutBlock";
import StepsBlock from "@/components/steps-block/StepsBlock";
import { InfoTest } from "@/components/take-test/InfoTestBlock";
import { Sets } from "@/components/sets/Sets";
import { Reviews } from "@/components/take-test/reviews/Reviews";
import { GratitudeProgram } from "@/components/gratitude-program/GratitudeProgram";
import { Awards } from "@/components/awards/Awards";
import krem from "@/assets/images/krem.webp";
import girlwithsmile from "@/assets/images/girlsmile.webp";
import footerImage from "@/assets/images/footerImage.webp";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const Home: React.FC = () => {
  const isMobile = useScreenMatch(450);

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
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 5,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 6,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 7,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      label: "Новинка",
      image: krem,
      hoverImage: girlwithsmile,
    },
  ];

  return (
    <div className={styles.preHeaderContent}>
      {!isMobile && (
        <p className={styles.preHeaderTxt}>
          Черная пятница здесь: 15% на весь ассортимент
        </p>
      )}
      <main className={styles.homeContainer}>
        <Header />
        <TopBlock />
        <Bestsellers products={products} />
        <AboutBlock />
        <StepsBlock />
        <InfoTest />
        <Sets />
        <Reviews />
        <GratitudeProgram />
        <Awards />
        <Footer footerImage={footerImage} />
      </main>
    </div>
  );
};

export default Home;
