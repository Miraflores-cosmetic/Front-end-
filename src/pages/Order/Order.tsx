import React, { useState } from "react";
import styles from "./Order.module.scss";
import Input from "@/components/text-field/input/Input";
import goBack from "@/assets/icons/go-back.svg";

const Order: React.FC = () => {
  const [name, setName] = useState("Фёдор Ники́форович Плевако́");
  const [emal, setEmail] = useState("f.plevako@gmail.com");

  return (
    <main className={styles.orderContainer}>
      <section className={styles.left}>
        <img src={goBack} alt="goBack" className={styles.goBack} />
        <div className={styles.inputWrapper}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
          />
          <Input
            value={emal}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
          />
        </div>
      </section>
      <section className={styles.right}></section>
    </main>
  );
};

export default Order;
