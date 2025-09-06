import React from "react";
import styles from "./Step.module.scss";

interface StepProps {
  image: string;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ image, title, description }) => {
  return (
    <div className={styles.step}>
      <img src={image} alt={title} className={styles.stepImage} />
      <div className={styles.textContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Step;
