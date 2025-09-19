import React, { useState } from "react";
import styles from "./SignIn.module.scss";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import logo from "@/assets/icons/Miraflores_logo.svg";
import google from "@/assets/icons/google.svg";
import telegram from "@/assets/icons/telegram.svg";
import { SocialButton } from "@/components/social-button/SocialButton";
import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const handleNavigatetoHome = () => {};
  const handleSignUp = () => {};
  const handleLogin = () => {};

  return (
    <section className={styles.signInContainer}>
      <div className={styles.signInWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={handleNavigatetoHome}
          />
        </div>
        <h2 className={styles.title}>Вход в аккаунт</h2>
        <p className={styles.login} onClick={handleSignUp}>
          Впервые у нас? <span>Зарегистрироваться</span>{" "}
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
          <TextField
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            rightLinkText="Забыли?"
            onRightLinkClick={() => console.log("Forgot password")}
          />
        </div>
        <Button text="Войти" onClick={handleLogin} />
      </div>
    </section>
  );
};

export default SignIn;
