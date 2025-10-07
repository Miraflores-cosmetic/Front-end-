import React, { useState } from "react";
import styles from "./Order.module.scss";
import Input from "@/components/text-field/input/Input";
import goBack from "@/assets/icons/go-back.svg";
import Karta from "@/assets/icons/Karta.svg";
import SberPay from "@/assets/icons/SberPay.svg";
import SBP from "@/assets/icons/SBP.svg";
import CustomCheckbox from "@/components/custom-checkBox/CustomCheckbox";
import CustomButton from "@/components/custom-button/CustomButton";

const Order: React.FC = () => {
  const [name, setName] = useState("Фёдор Ники́форович Плевако́");
  const [emal, setEmail] = useState("f.plevako@gmail.com");
  const [phone, setPhone] = useState("+7(913) 910 30-70");
  const [checked, setChecked] = useState(true);

  const paymentImages = [
    { src: SBP, alt: "goSBPBack" },
    { src: Karta, alt: "Karta" },
    { src: SberPay, alt: "SberPay" },
  ];
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
        <section className={styles.phoneWrapper}>
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="number"
            placeholder="Phone"
          />
        </section>
        <section className={styles.checkWrapper}>
          <CustomCheckbox
            checked={checked}
            onChange={setChecked}
            // borderRadius={8}
          />
          <label>Пишите мне о распродажах, скидках и новых поступлениях</label>
        </section>
        <section className={styles.paymentWrapper}>
          <p className={styles.paymentTitle}>Оплата</p>{" "}
          <article className={styles.payments}>
            {paymentImages.map((item, index) => (
              <img
                key={index}
                src={item.src}
                alt={item.alt}
                className={styles.paymentImage}
              />
            ))}
          </article>
        </section>
        <section className={styles.orderButtonWrapper}>
          <figure className={styles.orderButton}>
            <CustomButton label="Оплатить" onClick={() => alert("ok")} />
          </figure>
          <p className={styles.agreement}>
            Нажимая на кнопку «Оформить заказ», я соглашаюсь с условиями{" "}
            <span>Публичной оферты</span> и выражаю своё согласие на обработку
            моих персональных данных в соответствии с{" "}
            <span>Политикой конфиденциальности</span>
          </p>
        </section>
      </section>
      <section className={styles.right}></section>
    </main>
  );
};

export default Order;
