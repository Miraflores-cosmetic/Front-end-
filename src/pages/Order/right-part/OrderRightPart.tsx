import React, { useState } from "react";
import styles from "./OrderRightPart.module.scss";

import Miraflores_logo from "@/assets/icons/Miraflores_logo.svg";
import krem from "@/assets/images/krem.webp";

import { useScreenMatch } from "@/hooks/useScreenMatch";
import CardList from "../order-components/CardList";
import Sertificate from "../order-components/Sertificate";
import SumDiscount from "../order-components/SumDiscount";
import InfoContent from "../order-components/Info";
import { CardItem } from "../types";

const OrderRightPart: React.FC = () => {
  const isTablet = useScreenMatch(956);
  const [isPromoOpen, setIsPromoOpen] = useState(true); // 👈 состояние для аккордеона

  const handleTogglePromo = () => {
    setIsPromoOpen((prev) => !prev);
  };

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
      id: 3,
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
      id: 4,
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
    <>
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

          {/* Передаём колбэк для клика */}
          <Sertificate isOpen={isPromoOpen} onToggle={handleTogglePromo} />

          {/* Аккордеонная часть */}
          {isPromoOpen && (
            <>
              <section className={styles.discountPromo}>
                <p>
                  Скидка по промо-кодам НЕ РАСПРОСТРАНЯЕТСЯ на товары уже со
                  скидками, наборы, товары не нашего производства и электронные
                  продукты.
                </p>
              </section>
              <SumDiscount />
              <InfoContent />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default OrderRightPart;
