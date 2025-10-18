import React, { useState } from "react";
import styles from "./OrdersContent.module.scss";
import { AllOrders } from "./components/AllOrders";
import { ActiveOrders } from "./components/ActiveOrders";
import { Tabs } from "./components/Tabs";

export interface ActiveOrder {
  id: string;
  date: string;
  amount: string;
  status: string;
}

export interface AllOrdersStats {
  totalOrders: number;
  totalAmount: string;
}

export type TabType = "active" | "all";

const OrdersContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("active");

  const activeOrder: ActiveOrder = {
    id: "№5698LB",
    date: "08.09.2025",
    amount: "18.100₽",
    status: "В пути",
  };

  const allOrders: AllOrdersStats = {
    totalOrders: 16,
    totalAmount: "156.590₽",
  };

  return (
    <article className={styles.ourOrdersContent}>
      <header className={styles.ordersTitleWrapper}>
        <p className={styles.ordersTitle}>Ваши заказы</p>
      </header>

      <section className={styles.tabsContainer}>
        <div className={styles.ordersContainer}>
          <Tabs activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "active" ? (
            <ActiveOrders order={activeOrder} />
          ) : (
            <AllOrders stats={allOrders} />
          )}
        </div>
      </section>
    </article>
  );
};

export default OrdersContent;
