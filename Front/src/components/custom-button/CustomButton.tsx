import React from "react";
import styles from "./CustomButton.module.scss";

interface CustomButtonProps {
  label: string;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onClick,
  type = "button",
}) => {
  return (
    <button onClick={onClick} type={type} className={styles.mainBtn}>
      {label}
    </button>
  );
};

export default CustomButton;
