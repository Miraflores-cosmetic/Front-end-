import React from "react";
import styles from "./BestSeller.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import footerImage from "@/assets/images/footerImage.webp";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import StarRating from "@/components/rating/StarRating";
import SizeTabs from "@/components/size-tabs/SizeTabs";
import check from "@/assets/icons/tick-circle.svg";
import Etaps, { Etap } from "@/components/etpas/Etaps";

const BestSeller: React.FC = () => {
  const { bestSeller } = useSelector((state: RootState) => state.bestSeller);
  console.log(bestSeller, "bestSeller");

  const productOptions = [
    { id: "50", label: "50 мл", price: 3590, oldPrice: 4800, discount: 20 },
    { id: "140", label: "140 мл", price: 7990, oldPrice: 4800, discount: 20 },
    {
      id: "sample",
      label: "Пробник",
      price: 500,
      oldPrice: 4800,
      discount: 20,
    },
  ];

  const etapsData: Etap[] = [
    { id: 1, title: "Этап 1", name: "Очищение", icon: check },
    { id: 2, title: "Подходит для", name: "Всех типов кожи", icon: check },
    { id: 3, title: "Подходит для", name: "Всех типов кожи", icon: check },
  ];
  return (
    <article className={styles.bestSellerContainer}>
      <Header />
      <main>
        <section className={styles.bestSellerInfo}>
          <article className={styles.imagePart}>
            <img src={bestSeller?.hoverImage} alt="bestSeller image" />
          </article>
          <article className={styles.infoPart}>
            <div className={styles.infoWrapper}>
              <p className={styles.title}>Цветочный мист с экстрактами розы</p>
              <StarRating rating={4} text={"20 отзывов"} />
              <p className={styles.desc}>
                Мист для влажной, глянцевой кожи. Легкий, быстро впитывающийся
                гелевый мист, котораый заметно увлажняет и поддерживает здоровый
                барьер кожи
              </p>
              <SizeTabs options={productOptions} />
            </div>
            <Etaps items={etapsData} />
            <button>dsdsds</button>
          </article>
        </section>
        <section className={styles.bestSellerTabs}></section>
        <section className={styles.bestSellerEtaps}></section>
      </main>
      <Footer footerImage={footerImage} />
    </article>
  );
};

export default BestSeller;
