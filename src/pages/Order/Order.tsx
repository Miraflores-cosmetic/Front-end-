import React from "react";
import styles from "./Order.module.scss";
import OrderLeftPart from "./left-part/OrderLeftPart";
import OrderRightPart from "./right-part/OrderRightPart";

const Order: React.FC = () => {
  return (
    <main className={styles.orderContainer}>
      <OrderLeftPart />
      <OrderRightPart />
    </main>
  );
};

export default Order;
