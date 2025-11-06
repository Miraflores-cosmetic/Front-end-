import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SignUp.module.scss";
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

interface SignUpFormData {
  email: string;
  agreed: boolean;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    watch,
  } = useForm<SignUpFormData>({
    defaultValues: {
      agreed: false,
    },
  });
  const [apiEmailError, setApiEmailError] = useState<string | null>(null);
  const agreed = watch("agreed");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate("/");
  const handleSignIn = () => navigate("/sign-in");

  const onSubmit = async (data: SignUpFormData) => {
    // Clear API errors
    setApiEmailError(null);

    if (!data.agreed) {
      return; // Just prevent submission, no error message
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await authApi.signUp({ email: data.email });
      dispatch(
        setAuth({
          user: response.user,
          token: response.token,
          refreshToken: response.refreshToken,
        })
      );
      navigate("/profile");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Ошибка при регистрации. Попробуйте снова.";

      // Try to determine which field has the error from API response
      const errorData = error.response?.data;
      if (
        errorData?.field === "email" ||
        errorMessage.toLowerCase().includes("email")
      ) {
        setApiEmailError(errorMessage);
        setFormError("email", { message: errorMessage });
      } else {
        // If can't determine, show on email field (common case)
        setApiEmailError(errorMessage);
        setFormError("email", { message: errorMessage });
      }
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  };

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
        <p className={styles.login}>
          Уже есть аккаунт? <span onClick={handleSignIn}>Войти</span>
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
          </div>
          <div className={styles.agrrementWrapper}>
            <input
              type="checkbox"
              className={styles.checkbox}
              {...register("agreed")}
            />
            <p className={styles.agreementTxt}>
              Нажимая на кнопку «Далее», я соглашаюсь с условиями{" "}
              <span>Публичной оферты</span>и выражаю своё согласие на обработку
              моих персональных данных в соответствии с{" "}
              <span>Политикой конфиденциальности</span>
            </p>
          </div>
          <Button text="Далее" type="submit" disabled={!agreed} />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
