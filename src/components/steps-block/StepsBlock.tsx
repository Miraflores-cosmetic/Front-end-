import React from "react";
import styles from "./StepsBlock.module.scss";
import girlwithsmile from "@/assets/images/girlsmile.webp";
import Step from "./step/Step";

const steps = [
  {
    id: 1,
    title: "Энзимный мусс для умывания",
    description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
    price: 3590,
    oldPrice: 4600,
    discount: 22,
    image: girlwithsmile,
  },
  {
    id: 2,
    title: "Энзимный мусс для умывания",
    description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
    price: 3590,
    oldPrice: 4600,
    discount: 22,
    image: girlwithsmile,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    oldPrice: 4600,
    discount: 23,
    image: girlwithsmile,
  },
  {
    id: 4,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    price: 3590,
    oldPrice: 4600,
    discount: 23,
    image: girlwithsmile,
  },
];

export default function StepsBlock() {
  return (
    <section className={styles.stepsContainer}>
      <div className={styles.titleWrapper}>
        <p className={styles.title}>каждый шаг усиливает</p>
        <p className={styles.title}>предыдущий</p>
      </div>

      <div className={styles.descWrapper}>
        <p className={styles.desc}>
          Знали ли вы, что даже самое эффективное средство не сработает, если
          кожа неправильно очищена.
        </p>
        <p className={styles.desc}>
          Агрессивное умывание всего за минуту может нарушить защитный барьер и
          сделать кожу уязвимой
        </p>
      </div>
      <div className={styles.stepsWrapper}>
        {steps.map((product) => (
          <Step
            key={product.id}
            image={product.image}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
}
