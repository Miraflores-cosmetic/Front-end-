import React from "react";
import styles from "./StepsBlock.module.scss";
import shablon1 from "@/assets/images/shablon1.webp";
import shablon2 from "@/assets/images/shablon2.webp";
import shablon3 from "@/assets/images/shablon3.webp";
import shablon4 from "@/assets/images/shablon4.webp";
import etap1 from "@/assets/images/etap1.webp";
import etap2 from "@/assets/images/etap2.webp";
import etap3 from "@/assets/images/etap3.webp";
import etap4 from "@/assets/images/etap4.webp";
import Step from "./step/Step";

const steps = [
  {
    id: 1,
    title: "Очищение",
    description:
      "Самое важное выбирать хороший составы для очищения. Наши продукты мягко удаляют загрязнения, не вызывая чувства стянутости.",
    image: shablon1,
    hoverImage: etap1,
  },
  {
    id: 2,
    title: "Энзимный мусс для умывания",
    description: "Энзимы риса + фруктовые энзимы и фруктовые кислоты",
    image: shablon2,
    hoverImage: etap2,
  },
  {
    id: 3,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    image: shablon3,
    hoverImage: etap3,
  },
  {
    id: 4,
    title: "Цветочный мист",
    description: "Мист для мягкой и сияющей кожи с экстрактом розы",
    image: shablon4,
    hoverImage: etap4,
  },
];

export default function StepsBlock() {
  return (
    <section className={styles.stepsContainer}>
      <div className={styles.stepsWrapper}>
        {steps.map((product, id) => (
          <Step
            etap={id + 1}
            key={product.id}
            image={product.image}
            hoverImage={product.hoverImage}
            title={product.title}
            description={product.description}
          />
        ))}
      </div>
    </section>
  );
}
