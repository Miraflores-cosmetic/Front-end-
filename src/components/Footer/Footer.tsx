import React from "react";
import styles from "./Footer.module.scss";
import footerImage from "@/assets/images/footerImage.webp";
import footerLogo from "@/assets/icons/footerLogo.svg";
import lineTo from "@/assets/icons/lineTofooter.svg";
import { useScreenMatch } from "@/hooks/useScreenMatch";
import FooterMenu from "./footer-menu/FooterMenu";

const Footer = () => {
  const isMobile = useScreenMatch(1024);

  return (
    <footer className={styles.footer}>
      {!isMobile && (
        <div className={styles.footerLeft}>
          <img src={footerImage} alt="footerImage" />
          <img src={footerLogo} alt="footerImage" />
        </div>
      )}
      <div className={styles.footerRightWrapper}>
        <div className={styles.footerRight}>
          <FooterMenu
            title="навигация"
            items={[
              { label: "Каталог", href: "/" },
              { label: "Наша история", href: "/about" },
              { label: "Полезные статьи", href: "/contacts" },
              { label: "Программа благодарности", href: "/contacts" },
              { label: "Подарочные сертификаты", href: "/contacts" },
            ]}
          />
          <FooterMenu
            title="Информация"
            items={[
              { label: "Условия пользования", href: "/" },
              { label: "Политика конфеденциальности ", href: "/about" },
              { label: "Оплата и доставка", href: "/contacts" },
              { label: "FAQ", href: "/contacts" },
              { label: "Контакты", href: "/contacts" },
              { label: "Реквизиты", href: "/contacts" },
            ]}
          />

          <FooterMenu
            title="Поддержка"
            items={[
              { label: "Статус заказа", href: "/" },
              { label: "info@miraflores.ru", href: "/about" },
              { label: "+7 (800) 890 78 99", href: "/contacts" },
              { label: "Телеграм →", href: "/contacts" },
            ]}
          />
        </div>
        <div className={styles.footerBottom}>
          <p className={styles.fotterBottmotxt}>Телеграмм канал</p>
          <p className={styles.fotterBottmotxt}>Pinterest</p>
          <p className={styles.fotterBottmotxt}>© Miraflores 2025</p>
          <p className={styles.bimoTxt}>тут промокоды</p>
          <img src={lineTo} className={styles.lineTo} alt="footerImage" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
