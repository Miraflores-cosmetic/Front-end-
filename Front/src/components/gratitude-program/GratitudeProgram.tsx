import React from "react";
import styles from "./GratitudeProgram.module.scss";
import krem from "@/assets/images/krem.webp";
import gratitudeLine from "@/assets/icons/gratitudeLine.svg";

const gratitudeAmounts = ["от 5000₽", "от 10.000₽", "от 15.000₽", "от 20.000₽"];
const gratitudeImages = [krem, krem, krem, krem];

export const GratitudeProgram: React.FC = () => {
  return (
    <section className={styles.gratitudeContainer}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>Программа благодарности</p>
        <div className={styles.descWrapper}>
          <p className={styles.desc}>
            Знали ли вы, что даже самое эффективное средство не сработает, если
            кожа неправильно очищена.
          </p>
          <p className={styles.desc}>
            Агрессивное умывание всего за минуту может нарушить защитный барьер
            и сделать кожу уязвимой
          </p>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.gratitudeImageWrapper}>
          <div className={styles.gratitudeWrapper}>
            {gratitudeAmounts.map((amount, index) => (
              <p key={index} className={styles.gratitude}>
                {amount}
              </p>
            ))}
          </div>
          <img
            src={gratitudeLine}
            alt="gratitude line"
            className={styles.gratitudeLine}
          />
        </div>

        <div className={styles.gratitudeImages}>
          {gratitudeImages.map((imageSrc, index) => (
            <div key={index} className={styles.imageBlock}>
              <img
                src={imageSrc}
                alt={`product ${index + 1}`}
                className={styles.kremImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
