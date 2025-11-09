import React from 'react';
import styles from './Footer.module.scss';
import footerLogo from '@/assets/icons/footerLogo.svg';
import lineTo from '@/assets/icons/lineTofooter.svg';
import lineToMobile from '@/assets/icons/lineToMobile.svg';
import { useScreenMatch } from '@/hooks/useScreenMatch';
import FooterMenu from './footer-menu/FooterMenu';
import { getHeaderStyle } from '@/helpers/helpers';

interface FooterProps {
  /** URL or imported image for the left side background */
  footerImage: string;
}

const menuData = {
  navigation: {
    title: 'навигация',
    items: [
      { label: 'Каталог', href: '/' },
      { label: 'Наша история', href: '/about' },
      { label: 'Полезные статьи', href: '/contacts' },
      { label: 'Программа благодарности', href: '/contacts' },
      { label: 'Подарочные сертификаты', href: '/contacts' }
    ]
  },
  info: {
    title: 'Информация',
    items: [
      { label: 'Условия пользования', href: '/' },
      { label: 'Политика конфеденциальности ', href: '/about' },
      { label: 'Оплата и доставка', href: '/contacts' },
      { label: 'FAQ', href: '/contacts' },
      { label: 'Контакты', href: '/contacts' },
      { label: 'Реквизиты', href: '/contacts' }
    ]
  },
  support: {
    title: 'Поддержка',
    items: [
      { label: 'Статус заказа', href: '/' },
      { label: 'info@miraflores.ru', href: '/about' },
      { label: '+7 (800) 890 78 99', href: '/contacts' },
      { label: 'Телеграм →', href: '/contacts' }
    ]
  }
};

const socialLinks = ['Телеграмм канал', 'Pinterest', '© Miraflores 2025'];

const Footer: React.FC<FooterProps> = ({ footerImage }) => {
  const isTablet = useScreenMatch(1024);
  const isMobile = useScreenMatch(657);
  const isSmallMobile = useScreenMatch(450);

  return (
    <footer className={styles.footer} style={getHeaderStyle(location.pathname, isSmallMobile)}>
      {!isTablet && (
        <div className={styles.footerLeft}>
          <img src={footerImage} alt='footer' />
          <img src={footerLogo} alt='logo' />
        </div>
      )}

      {!isMobile ? (
        <div className={styles.footerRightWrapper}>
          <div className={styles.footerRight}>
            <FooterMenu {...menuData.navigation} />
            <FooterMenu {...menuData.info} />
            <FooterMenu {...menuData.support} />
          </div>

          <div className={styles.footerBottom}>
            {socialLinks.map(text => (
              <p key={text} className={styles.fotterBottmotxt}>
                {text}
              </p>
            ))}
            <p className={styles.bimoTxt}>тут промокоды</p>
            <img src={lineTo} className={styles.lineTo} alt='line' />
          </div>
        </div>
      ) : (
        <div className={styles.footerMobile}>
          <div className={styles.mobileContainer}>
            <div className={styles.mobileLeft}>
              <FooterMenu {...menuData.navigation} />
              <p className={styles.bimoTxtMobile}>тут промокоды</p>
              <img src={lineToMobile} className={styles.lineToMobile} alt='line' />
            </div>

            <div className={styles.mobileRight}>
              <FooterMenu {...menuData.info} />
              <FooterMenu {...menuData.support} />
            </div>
          </div>

          <div className={styles.footerBottomMobile}>
            {socialLinks.map(text => (
              <p key={text} className={styles.fotterBottmotxt}>
                {text}
              </p>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
