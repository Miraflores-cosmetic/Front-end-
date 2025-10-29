import React from "react";
import styles from "./Catalog.module.scss";

import { useScreenMatch } from "@/hooks/useScreenMatch";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import krem from "@/assets/images/krem.webp";
import krem2 from "@/assets/images/krem2.webp";
import Ellipse from "@/assets/images/Ellipse.webp";
import footerImageCatalog from "@/assets/images/footerImageCatalog.webp";
import kremgroup from "@/assets/images/kremGroupElipse.webp";
import girlwithsmile from "@/assets/images/girlsmile.webp";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import CatalogList from "@/components/catalog-list/CatalogList";

const Catalog: React.FC = () => {
  const isMobile = useScreenMatch(768);
  const products = [
    {
      id: 1,
      title: "Цветочный мист с экстрактами розы",
      description: "Мист для влажной, глянцевой кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 1,
      title: "Цветочный мист",
      description: "Мист для влажной, глянцевой кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 22,
      image: krem2,
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

  return (
    <main className={styles.catalogContainer}>
      <Header />
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Каталог</p>
      </div>
      {isMobile && (
        <div className={styles.elipseWrapper}>
          <img src={Ellipse} alt="Ellipse" className={styles.elipsImage} />
          <img src={kremgroup} alt="kremgroup" className={styles.kremgroup} />
          <p className={styles.name}>Наборы</p>
        </div>
      )}
      <div className={styles.catalogsWrapper}>
        <CatalogList />
      </div>
      <div className={styles.bestsellerWrapper}>
        <Bestsellers products={products} />
      </div>
      <div className={styles.footerWrapper}>
        {" "}
        <Footer footerImage={footerImageCatalog} />
      </div>{" "}
    </main>
  );
};

export default Catalog;
