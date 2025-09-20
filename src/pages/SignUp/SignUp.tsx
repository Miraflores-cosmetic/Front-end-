import React, { useState } from "react";
import styles from "./SignUp.module.scss";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import logo from "@/assets/icons/Miraflores_logo.svg";
import google from "@/assets/icons/google.svg";
import telegram from "@/assets/icons/telegram.svg";
import { SocialButton } from "@/components/social-button/SocialButton";
import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigatetoHome = () => {};
  const handleSignUp = () => {};
  const handleLogin = () => {};

  return (
    <section className={styles.signUpContainer}>
      <div className={styles.signUpWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={handleNavigatetoHome}
          />
        </div>
        <h2 className={styles.title}>Регистрация </h2>
        <p className={styles.login} onClick={handleSignUp}>
          Уже есть аккаунт?{" "}
          <span onClick={() => navigate("/sign-in")}>Войти</span>
        </p>
        <div className={styles.socialButtonsWrapper}>
          <SocialButton
            icon={google}
            text="Продолжить с Google"
            onClick={() => console.log("Google click")}
          />
          <SocialButton
            icon={telegram}
            text="Продолжить с Telegram"
            onClick={() => console.log("Telegram click")}
          />
        </div>
        <div className={styles.textFieldWrapper}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.agrrementWrapper}>
          <input type="checkbox" className={styles.checkbox} />
          <p className={styles.agreementTxt}>
            Нажимая на кнопку «Далее», я соглашаюсь с условиями{" "}
            <span>Публичной оферты</span>и выражаю своё согласие на обработку
            моих персональных данных в соответствии с{" "}
            <span>Политикой конфиденциальности</span>
          </p>
        </div>
        <Button text="Далее" onClick={handleLogin} />
      </div>
    </section>
  );
};

export default SignUp;
