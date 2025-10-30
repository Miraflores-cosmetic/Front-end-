import React from "react";
import styles from "./Step.module.scss";

interface StepProps {
  image: string;
  hoverImage: string;
  title: string;
  description: string;
  etap: number;
  isActive: boolean;
}

const Step: React.FC<StepProps> = ({
  image,
  hoverImage,
  title,
  description,
  etap,
  isActive,
}) => {
  return (
    <div
      className={`${styles.step} ${isActive ? styles.active : styles.inactive}`}
    >
      <div className={styles.stepWrapper}>
        <p className={styles.stepEtap}>Этап{etap}</p>
        <img
          src={isActive ? hoverImage : image}
          alt={title}
          className={styles.stepImage}
        />
      </div>
      {isActive && (
        <div className={styles.textContent}>
          <h3 className={styles.textTitle}>{title}</h3>
          <p className={styles.textDesc}>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Step;
