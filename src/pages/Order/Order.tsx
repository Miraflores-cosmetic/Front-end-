import React, { useState } from "react";
import styles from "./Order.module.scss";
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

interface CartItem {
  id: number;
  image: string;
  alt: string;
  name: string;
  size: string;
  discount: string;
  count: string;
  priceOld?: string;
  priceNew?: string;
  isGift?: boolean;
}

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

  const cartData: CartItem[] = [
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
      <section className={styles.right}>
        <article className={styles.listWrapper}>
          <img
            src={Miraflores_logo}
            alt={"Miraflores_logo"}
            className={styles.Miraflores_logo}
          />
          {cartData.map((item) => (
            <div className={styles.orderCart} key={item.id}>
              <figure className={styles.cartImageWrapper}>
                <img
                  src={item.image}
                  alt={item.alt}
                  className={styles.kremImage}
                />
              </figure>
              <div className={styles.infoWrapper}>
                <div className={styles.top}>
                  <div className={styles.texts}>
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.size}>{item.size}</p>
                  </div>
                  {item.discount && (
                    <div className={styles.discount}>{item.discount}</div>
                  )}
                </div>

                <div className={styles.bottom}>
                  <p className={styles.count}>{item.count}</p>

                  {item.isGift ? (
                    <div className={styles.surprise}>Подарок</div>
                  ) : (
                    <div className={styles.price}>
                      <p className={styles.priceOld}>{item.priceOld}</p>
                      <p className={styles.priceNew}>{item.priceNew}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </article>
      </section>
    </main>
  );
};

export default Order;
