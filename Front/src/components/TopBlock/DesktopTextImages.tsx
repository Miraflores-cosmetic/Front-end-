import React from "react";
import styles from "./TopBlock.module.scss";
import txt1 from "@/assets/icons/Ботаническая1.svg";
import txt2 from "@/assets/icons/Ботаническая2.svg";

const DesktopTextImages: React.FC = () => (
  <div className={styles.imageWrapper}>
    <img src={txt2} alt="Ботаническая" />
    <img src={txt1} alt="Косметика" />
  </div>
);

export default DesktopTextImages;
