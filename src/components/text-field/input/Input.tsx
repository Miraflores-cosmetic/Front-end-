import React, { InputHTMLAttributes } from "react";
import styles from "./Input.module.scss";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string; // allow value from props
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // handle change
}

const Input: React.FC<CustomInputProps> = ({
  label,
  value,
  onChange,
  ...props
}) => {
  return (
    <div className={styles.inputWrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
};

export default Input;
