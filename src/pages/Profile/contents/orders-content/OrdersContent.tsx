import React from "react";
import styles from "./OrdersContent.module.scss";
import Bestsellers from "@/components/bestsellers/Bestsellers";

const OrdersContent: React.FC = () => {
  return (
    <article className={styles.ordersContent}>
      <section className={styles.ordersTitleWrapper}>
        <p className={styles.ordersTitle}>Ваши заказы</p>
      </section>

      <section className={styles.ordersWrapper}>
        <p>ddddddddd</p>
      </section>
    </article>
  );
};

export default OrdersContent;
