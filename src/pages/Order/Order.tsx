import React, { useState } from "react";
import styles from "./Order.module.scss";
import Input from "@/components/text-field/input/Input";
import goBack from "@/assets/icons/go-back.svg";
import Karta from "@/assets/icons/Karta.svg";
import SberPay from "@/assets/icons/SberPay.svg";
import SBP from "@/assets/icons/SBP.svg";
import Miraflores_logo from "@/assets/icons/Miraflores_logo.svg";
import promocode from "@/assets/icons/promocode.svg";
import minus from "@/assets/icons/minus.svg";
import krem from "@/assets/images/krem.webp";
import CustomCheckbox from "@/components/custom-checkBox/CustomCheckbox";
import CustomButton from "@/components/custom-button/CustomButton";
import Delivery from "@/components/delivery/Delivery";
import CardList from "./CardList";
import PaymentsList from "./PaymentsList";
import { CardItem } from "./types";
import { useScreenMatch } from "@/hooks/useScreenMatch";

const Order: React.FC = () => {
  const [name, setName] = useState("Фёдор Ники́форович Плевако́");
  const [emal, setEmail] = useState("f.plevako@gmail.com");
  const [phone, setPhone] = useState("+7(913) 910 30-70");
  const [checked, setChecked] = useState(true);
  const isTablet = useScreenMatch(956);

  const paymentImages = [
    { src: SBP, alt: "goSBPBack" },
    { src: Karta, alt: "Karta" },
    { src: SberPay, alt: "SberPay" },
  ];

  const cartData: CardItem[] = [
    {
      id: 1,
      image: krem,
      alt: "krem",
      name: "Цветочный мист с экстрактами розы",
      size: "50 мл",
      discount: "-23%",
      count: "1 шт.",
      priceOld: "4800₽",
      priceNew: "3590₽",
      isGift: false,
    },
    {
      id: 2,
      image: krem,
      alt: "tonic",
      name: "Тоник для лица с розой",
      size: "100 мл",
      discount: "",
      count: "1 шт.",
      isGift: true,
    },
  ];
  return (
    <main className={styles.orderContainer}>
      <section className={styles.left}>
        <img src={goBack} alt="goBack" className={styles.goBack} />
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
        <section className={styles.checkWrapper}>
          <CustomCheckbox checked={checked} onChange={setChecked} />
          <label>Пишите мне о распродажах, скидках и новых поступлениях</label>
        </section>
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
      {!isTablet && (
        <section className={styles.right}>
          <article className={styles.listWrapper}>
            <img
              src={Miraflores_logo}
              alt={"Miraflores_logo"}
              className={styles.Miraflores_logo}
            />
            <CardList cartData={cartData} />
          </article>
          <section className={styles.sertificatWrapper}>
            <div className={styles.promoWrapper}>
              <div className={styles.promoWrapperLeft}>
                <img
                  src={promocode}
                  alt={"promocode"}
                  className={styles.promocode}
                />
                <p className={styles.promoTxt}>
                  Добавить промокод или сертификат
                </p>
              </div>
              <img src={minus} alt={"minus"} className={styles.minus} />
            </div>
            <p className={styles.SALE}>SALE2025</p>
          </section>
          <section className={styles.discountPromo}>
            <p>
              Скидка по промо-кодам НЕ РАСПРОСТРАНЯЕТСЯ на товары уже со
              скидками, наборы, товары не нашего производства и электронные
              продукты.
            </p>
          </section>
          <section className={styles.sectionSumDiscount}>
            <div className={styles.sumWrapper}>
              <p className={styles.sum}>Сумма • {3} товара </p>
              <div className={styles.price}>
                <p className={styles.priceNew}>7 180₽ </p>
                <p className={styles.priceOld}>8 980₽</p>
              </div>
            </div>
            <div className={styles.discountWrapper}>
              <p className={styles.name}>Скидка</p>
              <p className={styles.value}>-800₽ </p>
            </div>
            <div className={styles.promocodeWrapper}>
              <p className={styles.name}>Промокод</p>
              <p className={styles.value}>-1 000₽ </p>
            </div>
          </section>
          <section className={styles.infoWrapper}></section>
        </section>
      )}
    </main>
  );
};

export default Order;
