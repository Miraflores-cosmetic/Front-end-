import React from "react";
import styles from "./TextField.module.scss";

interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rightLinkText?: string;
  onRightLinkClick?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  rightLinkText,
  onRightLinkClick,
  ...rest
}) => (
  <div className={styles.wrapper}>
    <div className={styles.labelRow}>
      {label && <label>{label}</label>}
      {rightLinkText && (
        <p className={styles.link} onClick={onRightLinkClick}>
          {rightLinkText}
        </p>
      )}
    </div>
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  </div>
);
