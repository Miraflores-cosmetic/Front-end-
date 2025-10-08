import React, { useState } from "react";
import styles from "../Order.module.scss";
import Input from "@/components/text-field/input/Input";
import goBack from "@/assets/icons/go-back.svg";
import Karta from "@/assets/icons/Karta.svg";
import SberPay from "@/assets/icons/SberPay.svg";
import SBP from "@/assets/icons/SBP.svg";
import Miraflores_logo from "@/assets/icons/Miraflores_logo.svg";
import krem from "@/assets/images/krem.webp";

import CustomCheckbox from "@/components/custom-checkBox/CustomCheckbox";
import CustomButton from "@/components/custom-button/CustomButton";
import Delivery from "@/components/delivery/Delivery";
import PaymentsList from "../order-components/PaymentsList";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import TotalAccordion from "../total-accardion/TotalAccardion";

const OrderLeftPart: React.FC = () => {
  const [name, setName] = useState("Фёдор Ники́форович Плевако́");
  const [emal, setEmail] = useState("f.plevako@gmail.com");
  const [phone, setPhone] = useState("+7(913) 910 30-70");
  const [checked, setChecked] = useState(true);
  const isMobile = useScreenMatch(500);

  const paymentImages = [
    { src: SBP, alt: "goSBPBack" },
    { src: Karta, alt: "Karta" },
    { src: SberPay, alt: "SberPay" },
  ];

  const products = [
    {
      id: 1,
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      price: 3590,
      oldPrice: 4800,
      discount: "-23%",
      image: krem,
    },
    {
      id: 2,
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      price: 3590,
      oldPrice: 4800,
      discount: "-23%",
      image: krem,
    },
    {
      id: 3,
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      price: 0,
      image: krem,
      isGift: true,
    },
  ];

  return (
    <section className={styles.left}>
      {!isMobile && <img src={goBack} alt="goBack" className={styles.goBack} />}
      {isMobile && (
        <section className={styles.mobileHeaderContainer}>
          <div className={styles.mobileHeader}>
            <img src={goBack} alt="goBack" className={styles.goBackMobile} />
            <div className={styles.logoWrapper}>
              <img
                src={Miraflores_logo}
                alt="Miraflores_logo"
                className={styles.Miraflores_logo}
              />
            </div>
          </div>
        </section>
      )}

      {isMobile && (
        <section>
          {" "}
          <TotalAccordion
            total={13590}
            totalOld={24800}
            products={products}
            discount={800}
            promo={1000}
          />
        </section>
      )}
      <section className={styles.inputWrapper}>
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
      </section>
      <section>
        <Delivery />
      </section>
      <section className={styles.phoneWrapper}>
        <Input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="Phone"
        />
      </section>
      {!isMobile && (
        <section className={styles.checkWrapper}>
          <CustomCheckbox checked={checked} onChange={setChecked} />
          <label>Пишите мне о распродажах, скидках и новых поступлениях</label>
        </section>
      )}
      <section className={styles.paymentWrapper}>
        <p className={styles.paymentTitle}>Оплата</p>{" "}
        <article className={styles.payments}>
          <PaymentsList paymentImages={paymentImages} />
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
  );
};

export default OrderLeftPart;
