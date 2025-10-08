import React, { useState, useEffect } from "react";
import styles from "./EmailConfirmation.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

const EmailConfirmation: React.FC = () => {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate("/");
  const handleRequest = () => navigate("/reset-password");
  const handleChangeEmail = () => {};

  // countdown logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // format to M:SS (e.g., 2:58)
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
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
              Не пришел код? <span>Отправить еще раз</span>
            </p>
            <p className={styles.time}>{formatTime(timeLeft)}</p>
          </div>
          <Button text="Подтвердить" onClick={handleRequest} />
          <p className={styles.changeEmail} onClick={handleChangeEmail}>
            Сменить Email
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailConfirmation;
