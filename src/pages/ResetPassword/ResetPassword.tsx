import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ResetPassword.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";

interface ResetPasswordFormData {
  newPassword: string;
  repeatedPassword: string;
}

const ResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
    watch,
  } = useForm<ResetPasswordFormData>();
  const [apiNewPasswordError, setApiNewPasswordError] = useState<string | null>(
    null
  );
  const [apiRepeatedPasswordError, setApiRepeatedPasswordError] = useState<
    string | null
  >(null);
  const navigate = useNavigate();

  const newPassword = watch("newPassword");

  const handleNavigatetoHome = () => navigate("/");

  const onSubmit = async (data: ResetPasswordFormData) => {
    // Clear API errors
    setApiNewPasswordError(null);
    setApiRepeatedPasswordError(null);

    try {
      // TODO: Implement reset password API call
      // await authApi.resetPassword({
      //   newPassword: data.newPassword,
      //   repeatedPassword: data.repeatedPassword
      // });
      console.log("Reset password:", data.newPassword);
      // Navigate to success page or sign in
      navigate("/sign-in");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        "Ошибка при сбросе пароля. Попробуйте снова.";

      const errorData = error.response?.data;
      if (
        errorData?.field === "newPassword" ||
        errorMessage.toLowerCase().includes("новый пароль") ||
        errorMessage.toLowerCase().includes("password")
      ) {
        setApiNewPasswordError(errorMessage);
        setFormError("newPassword", { message: errorMessage });
      } else if (
        errorData?.field === "repeatedPassword" ||
        errorMessage.toLowerCase().includes("повторите") ||
        errorMessage.toLowerCase().includes("repeat")
      ) {
        setApiRepeatedPasswordError(errorMessage);
        setFormError("repeatedPassword", { message: errorMessage });
      } else {
        setApiNewPasswordError(errorMessage);
        setFormError("newPassword", { message: errorMessage });
      }
    }
  };

  return (
    <section className={styles.resetContainer}>
      <div className={styles.resetWrapper}>
        <div className={styles.imageWrapper}>
          <img
            src={logo}
            alt="logo"
            className={styles.logo}
            onClick={handleNavigatetoHome}
          />
        </div>
        <h2 className={styles.title}>Придумайте пароль</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.textFieldWrapper}>
            <div className={styles.newPasswordWrapper}>
              <TextField
                label="Новый пароль"
                type="password"
                {...register("newPassword", {
                  required: "Пожалуйста, введите новый пароль",
                  minLength: {
                    value: 6,
                    message: "Пароль должен содержать минимум 6 символов",
                  },
                  onChange: () => {
                    setApiNewPasswordError(null);
                  },
                })}
              />
              {(errors.newPassword || apiNewPasswordError) && (
                <div className={styles.errorMessage}>
                  {errors.newPassword?.message || apiNewPasswordError}
                </div>
              )}
            </div>
            <div className={styles.repeatedPasswordWrapper}>
              <TextField
                label="Повторите пароль"
                type="password"
                {...register("repeatedPassword", {
                  required: "Пожалуйста, повторите пароль",
                  validate: (value) =>
                    value === newPassword || "Пароли не совпадают",
                  onChange: () => {
                    setApiRepeatedPasswordError(null);
                  },
                })}
              />
              {(errors.repeatedPassword || apiRepeatedPasswordError) && (
                <div className={styles.errorMessage}>
                  {errors.repeatedPassword?.message || apiRepeatedPasswordError}
                </div>
              )}
            </div>
          </div>
          <Button text="Далее" type="submit" />
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
