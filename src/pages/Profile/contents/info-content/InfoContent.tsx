import React from "react";
import styles from "./InfoContent.module.scss";
import DeliveryProfile from "@/components/delivary-profile/DeliveryProfile";

const InfoContent: React.FC = () => {
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

  return (
    <main className={styles.infoContent}>
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
          </article>
        ))}

        <div className={styles.changeBtn}>
          <p>Изменить</p>
        </div>
      </section>

      <section className={styles.infoAddressWrapper}>
        <article className={styles.address}>
          <p className={styles.addressTitle}>Адреса доставки</p>
        </article>
        <section>
          <DeliveryProfile showTitle={false} />
        </section>
      </section>
    </main>
  );
};

export default InfoContent;
