import React from "react";
import styles from "./InfoMobileContent.module.scss";
import DeliveryProfile from "@/components/delivary-profile/DeliveryProfile";
// import DeliveryProfile from "@/components/delivary-profile/DeliveryProfile";
// import { openDrawer } from "@/store/slices/drawerSlice";
// import telegram from "@/assets/icons/telegram.svg";
// import { useDispatch } from "react-redux";
// import Bestsellers from "@/components/bestsellers/Bestsellers";
// import krem from "@/assets/images/krem.webp";
// import girlwithsmile from "@/assets/images/girlsmile.webp";

const InfoMobileContent: React.FC = () => {
  //   const dispatch = useDispatch();
  //   // 🔹 Данные о пользователе
  //   const userInfo = [
  //     [
  //       { name: "ФИО", value: "Фёдор Ники́форович Плевако́" },
  //       { name: "Телефон", value: "+7(913) 910 30-70" },
  //     ],
  //     [
  //       { name: "Email", value: "f.plevako@gmail.com" },
  //       { name: "Пароль", value: "....." },
  //     ],
  //     [
  //       { name: "Дата рождения", value: "23 декабря" },
  //       { name: "Получать поздравления?", value: "Да" },
  //     ],
  //   ];

  // const products = [
  //   {
  //     id: 1,
  //     title: "Энзимный мусс для умывания",
  //     description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 22,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  //   {
  //     id: 2,
  //     title: "Энзимный мусс для умывания",
  //     description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 22,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  //   {
  //     id: 3,
  //     title: "Цветочный мист",
  //     description: "Мист для мягкой и сияющей кожи с экстрактом розы",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 23,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  //   {
  //     id: 4,
  //     title: "Цветочный мист",
  //     description: "Мист для мягкой и сияющей кожи с экстрактом розы",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 23,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  //   {
  //     id: 5,
  //     title: "Цветочный мист",
  //     description: "Мист для мягкой и сияющей кожи с экстрактом розы",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 23,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  //   {
  //     id: 6,
  //     title: "Цветочный мист",
  //     description: "Мист для мягкой и сияющей кожи с экстрактом розы",
  //     price: 3590,
  //     oldPrice: 4600,
  //     discount: 23,
  //     image: krem,
  //     hoverImage: girlwithsmile,
  //   },
  // ];

  // const handleChange = () => {
  //   dispatch(openDrawer("about"));
  // };

  return (
    <article className={styles.infoMobileContent}>
      <p className={styles.title}>Общая информация</p>
      <article className={styles.infoWrapper}>
        <section className={styles.info}>
          <p className={styles.category}>ФИО</p>
          <p className={styles.value}>Фёдор Ники́форович Плевако́</p>
        </section>
        <section className={styles.info}>
          <p className={styles.category}>Телефон</p>
          <p className={styles.value}>+7(913) 910 30-70</p>
        </section>
        <section className={styles.infoPass}>
          <p className={styles.category}>Пароль</p>
          <article className={styles.dotsWrapper}>
            {" "}
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={styles.dot} />
            ))}
          </article>
        </section>
        <section className={styles.info}>
          <p className={styles.category}>Дата рождения</p>
          <p className={styles.value}>23 декабря</p>
        </section>
        <section className={styles.info}>
          <p className={styles.category}>Получать поздравления?</p>
          <p className={styles.value}>Да</p>
        </section>
        <p className={styles.change}>Изменить</p>
      </article>
      <DeliveryProfile />
    </article>
  );
};

export default InfoMobileContent;
