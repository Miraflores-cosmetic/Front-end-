import React, { useState } from "react";
import styles from "./EmailConfirmation.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";
import { useCountdown } from "@/hooks/useCountdown";

const EmailConfirmation: React.FC = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  // используем хук обратного отсчёта (3 минуты = 180 секунд)
  const { timeLeft, reset, isFinished, formatTime } = useCountdown(180);

  const handleNavigatetoHome = () => navigate("/");
  const handleRequest = () => navigate("/reset-password");
  const handleChangeEmail = () => {};
  const handleResendCode = () => {
    // логика повторной отправки кода
    reset(); // сброс таймера после повторной отправки
  };

  return (
    <section className={styles.confirmationContainer}>
      <div className={styles.confirmationWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={handleNavigatetoHome}
          />
        </div>

        <h2 className={styles.title}>Подтверждение почты</h2>
        <p className={styles.desc}>
          Мы отправили 'Одноразовый код доступа' на указанный вами бизнес-адрес
          электронной почты.
        </p>

        <div className={styles.textFieldWrapper}>
          <TextField
            label="Код"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className={styles.countDownWrapper}>
          <div className={styles.top}>
            <p className={styles.topTxt}>
              Не пришел код?{" "}
              <span onClick={handleResendCode}>Отправить еще раз</span>
            </p>
            <p className={styles.time}>{formatTime(timeLeft)}</p>
          </div>
          <Button text="Подтвердить" onClick={handleRequest} />
          <p className={styles.changeEmail} onClick={handleChangeEmail}>
            Сменить Email
          </p>
          {isFinished && <p className={styles.expired}>Код истёк</p>}
        </div>
      </div>
    </section>
  );
};

export default EmailConfirmation;
