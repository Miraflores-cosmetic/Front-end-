import React from "react";
import styles from "./TopBlock.module.scss";

interface TextWrapperProps {
  title: string;
  items: string[];
  titleStyle?: React.CSSProperties;
  textStyle?: React.CSSProperties;
}

const TextWrapper: React.FC<TextWrapperProps> = ({
  title,
  items,
  titleStyle,
  textStyle,
}) => (
  <div className={styles.textWrapper}>
    <p className={styles.textWrapperTitle} style={titleStyle}>
      {title}
    </p>
    {items.map((item, index) => (
      <p key={index} className={styles.textWrappertxt} style={textStyle}>
        {item}
      </p>
    ))}
  </div>
);

export default TextWrapper;
