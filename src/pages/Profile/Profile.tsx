import React, { useState } from "react";
import styles from "./Profile.module.scss";
import Header from "@/components/Header/Header";
import Sidebar, { TabId } from "./side-bar/SideBar";
import ProfileContent from "./content-wrapper/ProfileContent";

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>("info");

  const menuItems = [
    { id: "info" as TabId, label: "Общая информация" },
    { id: "orders" as TabId, label: "Заказы" },
    { id: "favorites" as TabId, label: "Избранное" },
    { id: "bonus" as TabId, label: "Бонусный счёт" },
    { id: "logout" as TabId, label: "Выйти" },
  ];
  const renderContent = () => {
    switch (activeTab) {
      case "info":
        return (
          <section className={styles.infoSection}>
            <h3>Информация о вас</h3>
            <div className={styles.infoGrid}>
              <div>
                <p>
                  <strong>ФИО:</strong> Фёдор Никифорович Плевако
                </p>
                <p>
                  <strong>Email:</strong> f.plevako@gmail.com
                </p>
                <p>
                  <strong>Дата рождения:</strong> 23 декабря
                </p>
              </div>
              <div>
                <p>
                  <strong>Телефон:</strong> +7 (913) 910-30-70
                </p>
                <p>
                  <strong>Пароль:</strong> ************
                </p>
                <p>
                  <strong>Получать поздравления?</strong> Да
                </p>
              </div>
            </div>
            <a href="#" className={styles.editLink}>
              Изменить
            </a>

            <div className={styles.addressSection}>
              <div className={styles.addressHeader}>
                <h3>Адреса доставки</h3>
                <a href="#" className={styles.addAddress}>
                  + Новый адрес
                </a>
              </div>

              <div className={styles.addressList}>
                <label className={styles.addressItem}>
                  <input type="radio" name="address" defaultChecked />
                  <div>
                    <p>
                      <strong>Пункт СДЭК</strong>
                    </p>
                    <p>г. Суздаль, ул. Ленина, 138/2</p>
                    <span className={styles.default}>адрес по умолчанию</span>
                  </div>
                </label>

                <label className={styles.addressItem}>
                  <input type="radio" name="address" />
                  <div>
                    <p>
                      <strong>Пункт Почта России</strong>
                    </p>
                    <p>г. Москва, ул. Тверская, 162 к.5</p>
                  </div>
                </label>

                <label className={styles.addressItem}>
                  <input type="radio" name="address" />
                  <div>
                    <p>
                      <strong>Курьером по адресу:</strong>
                    </p>
                    <p>г. Суздаль, ул. Тверская, 10 кв. 15</p>
                    <p className={styles.comment}>
                      Комментарий: Осторожно, злая собака!
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </section>
        );
      case "orders":
        return (
          <div className={styles.tabContent}>
            <h3>Ваши заказы</h3>
            <p>Вы ещё не сделали ни одного заказа.</p>
          </div>
        );
      case "favorites":
        return (
          <div className={styles.tabContent}>
            <h3>Избранное</h3>
            <p>У вас пока нет избранных товаров.</p>
          </div>
        );
      case "bonus":
        return (
          <div className={styles.tabContent}>
            <h3>Бонусный счёт</h3>
            <p>
              Ваш баланс: <strong>120 бонусов</strong>
            </p>
          </div>
        );
    }
  };
  return (
    <main className={styles.profileContainer}>
      <Header />
      <section className={styles.contentWrapper}>
        <div className={styles.profile}>
          {/* ЛЕВАЯ КОЛОНКА */}
          <Sidebar
            userName="ФЕДОР П."
            menuItems={menuItems}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* ПРАВАЯ ЧАСТЬ */}
          <ProfileContent activeTab={activeTab} renderContent={renderContent} />
        </div>
      </section>
    </main>
  );
};

export default ProfilePage;
