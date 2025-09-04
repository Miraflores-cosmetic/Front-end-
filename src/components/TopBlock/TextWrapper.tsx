import React from "react";
import styles from "./TopBlock.module.scss";

interface TextWrapperProps {
  title: string;
  items: string[];
}

const TextWrapper: React.FC<TextWrapperProps> = ({ title, items }) => (
  <div className={styles.textWrapper}>
    <p className={styles.textWrapperTitle}>{title}</p>
    {items.map((item, index) => (
      <p key={index} className={styles.textWrappertxt}>
        {item}
      </p>
    ))}
  </div>
);

export default TextWrapper;
