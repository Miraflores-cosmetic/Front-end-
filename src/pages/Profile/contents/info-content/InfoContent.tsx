import React from "react";
import styles from "./InfoContent.module.scss";
import DeliveryProfile from "@/components/delivary-profile/DeliveryProfile";
import { openDrawer } from "@/store/slices/drawerSlice";
import telegram from "@/assets/icons/telegram.svg";
import { useDispatch } from "react-redux";
import Bestsellers from "@/components/bestsellers/Bestsellers";
import krem from "@/assets/images/krem.webp";
import girlwithsmile from "@/assets/images/girlsmile.webp";

const InfoContent: React.FC = () => {
  const dispatch = useDispatch();
  // 🔹 Данные о пользователе
  const userInfo = [
    [
      { name: "ФИО", value: "Фёдор Ники́форович Плевако́" },
      { name: "Телефон", value: "+7(913) 910 30-70" },
    ],
    [
      { name: "Email", value: "f.plevako@gmail.com" },
      { name: "Пароль", value: "....." },
    ],
    [
      { name: "Дата рождения", value: "23 декабря" },
      { name: "Получать поздравления?", value: "Да" },
    ],
  ];

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
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 5,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
    {
      id: 6,
      title: "Цветочный мист",
      description: "Мист для мягкой и сияющей кожи с экстрактом розы",
      price: 3590,
      oldPrice: 4600,
      discount: 23,
      image: krem,
      hoverImage: girlwithsmile,
    },
  ];

  const handleChange = () => {
    dispatch(openDrawer("about"));
  };

  return (
    <article className={styles.infoContent}>
      <section className={styles.infoTitleWrapper}>
        <p className={styles.infoTitle}>Здравствуйте, Федор</p>
      </section>

      <section className={styles.infoAboutWrapper}>
        <article className={styles.about}>
          <p className={styles.aboutTitle}>Информация о вас</p>
        </article>

        {userInfo.map((group, groupIndex) => (
          <article key={groupIndex} className={styles.aboutWrapper}>
            {group.map((item, itemIndex) => (
              <div key={itemIndex} className={styles.wrapper}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.value}>{item.value}</p>
              </div>
            ))}
            {groupIndex === 0 && (
              <div className={styles.changeBtn} onClick={handleChange}>
                <p>Изменить</p>
              </div>
            )}
          </article>
        ))}
      </section>
      <section className={styles.infoAddressWrapper}>
        <section>
          <DeliveryProfile />
        </section>
      </section>
      <section className={styles.infoBotWrapper}>
        <section className={styles.telegramBot}>
          <img src={telegram} alt={telegram} className={styles.telegramIcon} />
          <p className={styles.telegramBotText}>Наш бот в Телеграме</p>
        </section>
        <p className={styles.telegramBotTextSuccess}>
          Вы успешно авторизованы!
        </p>
      </section>
      <section className={styles.infoSliderWrapper}>
        <Bestsellers products={products} />
      </section>
    </article>
  );
};

export default InfoContent;
