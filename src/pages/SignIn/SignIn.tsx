import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignIn.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAuth, setLoading, setError } from "@/store/slices/authSlice";
import { authApi } from "@/api/authApi";
import logo from "@/assets/icons/Miraflores_logo.svg";
import google from "@/assets/icons/google.svg";
import telegram from "@/assets/icons/telegram.svg";
import { SocialButton } from "@/components/social-button/SocialButton";
import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<SignInFormData>();
  const [apiEmailError, setApiEmailError] = useState<string | null>(null);
  const [apiPasswordError, setApiPasswordError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate("/");
  const handleSignUp = () => navigate("/sign-up");
  const handleForgotPassword = () => navigate("/forgot-password");

  const onSubmit = async (data: SignInFormData) => {
    // Clear API errors
    setApiEmailError(null);
    setApiPasswordError(null);

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await authApi.signIn({
        email: data.email,
        password: data.password,
      });
      dispatch(
        setAuth({
          user: response.user,
          token: response.token,
          refreshToken: response.refreshToken,
        })
      );
      navigate("/");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Ошибка при входе. Попробуйте снова.";

      // Try to determine which field has the error from API response
      const errorData = error.response?.data;
      if (
        errorData?.field === "email" ||
        errorMessage.toLowerCase().includes("email")
      ) {
        setApiEmailError(errorMessage);
        setFormError("email", { message: errorMessage });
      } else if (
        errorData?.field === "password" ||
        errorMessage.toLowerCase().includes("пароль") ||
        errorMessage.toLowerCase().includes("password")
      ) {
        setApiPasswordError(errorMessage);
        setFormError("password", { message: errorMessage });
      } else {
        // If can't determine, show on password (common case)
        setApiPasswordError(errorMessage);
        setFormError("password", { message: errorMessage });
      }
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
        <p className={styles.login}>
          Впервые у нас? <span onClick={handleSignUp}>Зарегистрироваться</span>
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.textFieldWrapper}>
            <div className={styles.emailWrapper}>
              <TextField
                label="Email"
                {...register("email", {
                  required: "Пожалуйста, введите email",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Введите корректный email адрес",
                  },
                  onChange: () => {
                    setApiEmailError(null);
                  },
                })}
              />
              {(errors.email || apiEmailError) && (
                <div className={styles.errorMessage}>
                  {errors.email?.message || apiEmailError}
                </div>
              )}
            </div>
            <div className={styles.passwordWrapper}>
              <TextField
                label="Пароль"
                type="password"
                {...register("password", {
                  required: "Пожалуйста, введите пароль",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать минимум 6 символов",
                  },
                  onChange: () => {
                    setApiPasswordError(null);
                  },
                })}
                rightLinkText="Забыли?"
                onRightLinkClick={handleForgotPassword}
              />
              {(errors.password || apiPasswordError) && (
                <div className={styles.errorMessage}>
                  {errors.password?.message || apiPasswordError}
                </div>
              )}
            </div>
          </div>
          <Button text="Войти" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default SignIn;
