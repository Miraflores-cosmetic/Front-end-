import React, { useState } from "react";
import styles from "./Step.module.scss";

interface StepProps {
  image: string;
  hoverImage: string;
  title: string;
  description: string;
  etap: number;
}

const Step: React.FC<StepProps> = ({
  image,
  hoverImage,
  title,
  description,
  etap,
}) => {
  const [isHovered, setIsHover] = useState(false);

  return (
    <div
      className={styles.step}
      // onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHovered ? (
        <div className={styles.stepWrapper}>
          <p>Этап{etap}</p>
          <img src={hoverImage} alt={title} className={styles.stepImage} />
        </div>
      ) : (
        <div className={styles.stepWrapper}>
          <p>Этап{etap}</p>
          <img src={image} alt={title} className={styles.stepImage} />
        </div>
      )}
      <div className={styles.textContent}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Step;
