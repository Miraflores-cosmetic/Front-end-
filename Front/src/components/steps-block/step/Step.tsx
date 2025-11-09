import React from 'react';
import styles from './Step.module.scss';

interface StepProps {
  image: string;
  title: string;
  description: string;
  etap: number;
}

const Step: React.FC<StepProps> = ({ image, title, description, etap }) => {
  return (
    <div className={styles.step}>
      <div className={styles.stepWrapper}>
        <p className={styles.stepEtap}>Этап {etap}</p>
        <img src={image} alt={title} className={styles.stepImage} />
      </div>

      <div className={styles.textContent}>
        <h3 className={styles.textTitle}>{title}</h3>
        <p className={styles.textDesc}>{description}</p>
      </div>
    </div>
  );
};

export default Step;
