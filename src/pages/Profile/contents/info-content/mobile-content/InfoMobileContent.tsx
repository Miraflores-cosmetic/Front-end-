import React from "react";
import styles from "./InfoMobileContent.module.scss";
import DeliveryProfile from "@/components/delivary-profile/DeliveryProfile";
import { openDrawer } from "@/store/slices/drawerSlice";
import { useDispatch } from "react-redux";

const InfoMobileContent: React.FC = () => {
  const dispatch = useDispatch();

  const handleChange = () => {
    dispatch(openDrawer("about"));
  };

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
        <p className={styles.change} onClick={handleChange}>
          Изменить
        </p>
      </article>
      <DeliveryProfile />
    </article>
  );
};

export default InfoMobileContent;
