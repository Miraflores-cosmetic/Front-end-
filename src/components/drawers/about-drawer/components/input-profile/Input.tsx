import React from "react";
import styles from "./Input.module.scss";

interface CustomInputProps {
  label?: string;
  value: string;
  type?: string;
  placeholder?: string;
  imageSrc?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<CustomInputProps> = ({
  label,
  value,
  type = "text",
  placeholder,
  imageSrc,
  buttonText,
  onButtonClick,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      {imageSrc && <img src={imageSrc} alt="icon" className={styles.icon} />}
      {label && <label className={styles.label}>{label}</label>}
      <div className={styles.inputRow}>
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
        />

        {buttonText && (
          <button className={styles.button} onClick={onButtonClick}>
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};
