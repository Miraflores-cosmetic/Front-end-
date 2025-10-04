import React from "react";
import styles from "./ArticleDetail.module.scss";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import footerImage from "@/assets/images/footerImage.webp";
import userImage from "@/assets/images/userImage.png";
import back from "@/assets/icons/go-back.svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// import linkedin from "@/assets/icons/linkedin.svg";
// import iqs from "@/assets/icons/iqs.svg";
// import facebook from "@/assets/icons/facebook.svg";
// import insta from "@/assets/icons/insta.svg";
// import art1 from "@/assets/images/art1.webp";
import art2 from "@/assets/images/art2.webp";
// import art3 from "@/assets/images/art3.webp";
// import { useDispatch } from "react-redux";
// import { clearArticle } from "@/store/slices/articleSlice";

const ArticleDetail: React.FC = () => {
  const article = useSelector((state: RootState) => state.articleSlice.article);

  console.log(article, "article");

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
      <Footer footerImage={footerImage} />
    </article>
  );
};

export default ArticleDetail;
