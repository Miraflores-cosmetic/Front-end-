import React from "react";
import styles from "./Sets.module.scss";

import { useScreenMatch } from "@/hooks/useScreenMatch";

export const Reviews: React.FC = () => {
  const isMobile = useScreenMatch(680);

  return (
    <section className={styles.reviewsContainer}>
      <h2 className={styles.title}>Reviews</h2>
      <div className={styles.setsWrapper}>ddd</div>
    </section>
  );
};
