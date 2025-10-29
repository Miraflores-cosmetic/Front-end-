import React from "react";
import styles from "./ArticleDetail.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import footerImage from "@/assets/images/footerImage.webp";
import userImage from "@/assets/images/userImage.webp";
import back from "@/assets/icons/go-back.svg";
import { useSelector } from "react-redux";
import krem from "@/assets/images/krem.webp";
import girlwithsmile from "@/assets/images/girlsmile.webp";
import { RootState } from "@/store/store";
import Bestsellers from "@/components/bestsellers/Bestsellers";

const ArticleDetail: React.FC = () => {
  const article = useSelector((state: RootState) => state.articleSlice.article);

  console.log(article, "article");
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
    <article className={styles.articlesDetails}>
      <Header />
      <section className={styles.titleContainer}>
        <div className={styles.goBackWrapper}>
          <img className={styles.back} src={back} alt="go back" />
          <p className={styles.goBackText}>Вернуться в блог</p>
        </div>
        <p className={styles.title}>{article?.title}</p>
        <div className={styles.userWrapper}>
          <img className={styles.userImage} src={userImage} alt="user image" />
          <div className={styles.userInfo}>
            <p className={styles.userName}>{article?.author}</p>
            <p className={styles.userRole}>CEO</p>
          </div>
        </div>
      </section>
      <section className={styles.imageWrapper}>
        <img
          className={styles.userImage}
          src={article?.image}
          alt="user image"
        />
      </section>
      <section className={styles.descContainer}>
        <p className={styles.titleTxt}>{article?.title}</p>
        <p className={styles.descTxt}>{article?.description}</p>
      </section>
      <section className={styles.bottomPart}>
        <div className={styles.bestSellerWrapper}>
          <Bestsellers products={products} />
        </div>
        <Footer footerImage={footerImage} />
      </section>
    </article>
  );
};

export default ArticleDetail;
