import React, { useState } from "react";
import styles from "./AboutDrawer.module.scss";

import { useDispatch } from "react-redux";
import { closeDrawer } from "@/store/slices/drawerSlice";
import { Input } from "./components/input-profile/Input";

const AboutDrawer: React.FC = () => {
  const [name, setName] = useState("Фёдор Ники́форович Плевако́ ");
  const [email, setEmail] = useState("f.plevako@gmail.com");
  const [phone, setPhone] = useState("+7(913) 910 30-70 ");
  const [password, setPassword] = useState("***********");
  const dispatch = useDispatch();

  const handleOrder = () => {
    dispatch(closeDrawer());
  };

  return (
    <div className={styles.drawer}>
      <div className={styles.contentWrapper}>
        <header className={styles.headerWrapper}>
          <p className={styles.aboutUs}>Информация о вас</p>
          <p className={styles.close} onClick={handleOrder}>
            Закрыть
          </p>
        </header>
        <article className={styles.infoWrapper}>
          <Input
            label=""
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label=""
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            label=""
            type="password"
            value={password}
            buttonText="Сменить пароль"
            onButtonClick={() => alert("Change password")}
            onChange={(e) => setPassword(e.target.value)}
          />
        </article>
      </div>
      <div className={styles.buttonContainer}></div>
    </div>
  );
};

export default AboutDrawer;
