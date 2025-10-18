import React, { useState } from "react";
import styles from "./OrdersContent.module.scss";
import { AllOrders } from "./components/AllOrders";
import { ActiveOrders } from "./components/ActiveOrders";
import { Tabs } from "./components/Tabs";
import CardList from "./components/card-list/CardList";
import krem from "@/assets/images/krem.webp";
import {
  ActiveOrder,
  AllOrdersStats,
  ProfileCardItem,
  TabType,
} from "../../types";

const OrdersContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("active");
  const cartData: ProfileCardItem[] = [
    {
      id: 1,
      image: krem,
      alt: "krem",
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      count: "1 шт.",
      isGift: false,
    },
    {
      id: 2,
      image: krem,
      alt: "krem",
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      count: "1 шт.",
      isGift: false,
    },
    {
      id: 3,
      image: krem,
      alt: "krem",
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      count: "1 шт.",
      isGift: true,
    },
    {
      id: 4,
      image: krem,
      alt: "tonic",
      name: "Тоник для лица с розой",
      size: "100 мл",
      count: "1 шт.",
      isGift: true,
    },
  ];

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
      <article className={styles.listContainer}>
        {activeTab === "active" ? (
          <p className={styles.activeText}>2 товара</p>
        ) : (
          <div className={styles.allText}>
            <p>Заказ №5698LB </p>
            <p>20 декабря 2025</p>
          </div>
        )}{" "}
        <CardList cartData={cartData} />
      </article>
    </article>
  );
};

export default OrdersContent;
