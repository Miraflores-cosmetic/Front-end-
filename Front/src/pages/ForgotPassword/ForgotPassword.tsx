import React, { useState } from "react";
import styles from "./ForgotPassword.module.scss";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate("/");
  const handleRequest = () => {};

  return (
    <section className={styles.forgotContainer}>
      <div className={styles.forgotWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={handleNavigatetoHome}
          />
        </div>
        <h2 className={styles.title}>Забыли пароль</h2>
        <p className={styles.desc}>
          Мы отправили 'Одноразовый код доступа' на указанный вами бизнес-адрес
          электронной почты.
        </p>

        <div className={styles.textFieldWrapper}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button text="Выслать инструкцию" onClick={handleRequest} />
      </div>
    </section>
  );
};

export default ForgotPassword;
