import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ForgotPassword.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<ForgotPasswordFormData>();
  const [apiEmailError, setApiEmailError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate("/");

  const onSubmit = async (data: ForgotPasswordFormData) => {
    // Clear API errors
    setApiEmailError(null);

    try {
      // TODO: Implement forgot password API call
      // await authApi.forgotPassword({ email: data.email });
      console.log("Forgot password request for:", data.email);
      // Navigate to confirmation page or show success message
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Ошибка при отправке запроса. Попробуйте снова.";

      const errorData = error.response?.data;
      if (
        errorData?.field === "email" ||
        errorMessage.toLowerCase().includes("email")
      ) {
        setApiEmailError(errorMessage);
        setFormError("email", { message: errorMessage });
      } else {
        setApiEmailError(errorMessage);
        setFormError("email", { message: errorMessage });
      }
    }
  };

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
          <Button text="Выслать инструкцию" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
