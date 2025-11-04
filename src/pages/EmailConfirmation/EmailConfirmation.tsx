import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./EmailConfirmation.module.scss";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/icons/Miraflores_logo.svg";

import { TextField } from "@/components/text-field/TextField";
import { Button } from "@/components/button/Button";
import { useCountdown } from "@/hooks/useCountdown";

interface EmailConfirmationFormData {
  code: string;
}

const EmailConfirmation: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<EmailConfirmationFormData>();
  const [apiCodeError, setApiCodeError] = useState<string | null>(null);
  const navigate = useNavigate();

  // используем хук обратного отсчёта (3 минуты = 180 секунд)
  const { timeLeft, reset, isFinished, formatTime } = useCountdown(180);

  const handleNavigatetoHome = () => navigate("/");
  const handleChangeEmail = () => {};
  const handleResendCode = () => {
    // логика повторной отправки кода
    reset(); // сброс таймера после повторной отправки
  };

  const onSubmit = async (data: EmailConfirmationFormData) => {
    // Clear API errors
    setApiCodeError(null);

    if (isFinished) {
      setFormError("code", { message: "Код истёк. Запросите новый код." });
      return;
    }

    try {
      // TODO: Implement email confirmation API call
      // await authApi.confirmEmail({ code: data.code });
      console.log("Email confirmation code:", data.code);
      navigate("/reset-password");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Неверный код. Попробуйте снова.";

      const errorData = error.response?.data;
      if (
        errorData?.field === "code" ||
        errorMessage.toLowerCase().includes("код") ||
        errorMessage.toLowerCase().includes("code")
      ) {
        setApiCodeError(errorMessage);
        setFormError("code", { message: errorMessage });
      } else {
        setApiCodeError(errorMessage);
        setFormError("code", { message: errorMessage });
      }
    }
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.textFieldWrapper}>
            <div className={styles.codeWrapper}>
              <TextField
                label="Код"
                {...register("code", {
                  required: "Пожалуйста, введите код",
                  minLength: {
                    value: 4,
                    message: "Код должен содержать минимум 4 символа",
                  },
                  maxLength: {
                    value: 10,
                    message: "Код не должен превышать 10 символов",
                  },
                  onChange: () => {
                    setApiCodeError(null);
                  },
                })}
              />
              {(errors.code || apiCodeError) && (
                <div className={styles.errorMessage}>
                  {errors.code?.message || apiCodeError}
                </div>
              )}
            </div>
          </div>

          <div className={styles.countDownWrapper}>
            <div className={styles.top}>
              <p className={styles.topTxt}>
                Не пришел код?{" "}
                <span onClick={handleResendCode}>Отправить еще раз</span>
              </p>
              <p className={styles.time}>{formatTime(timeLeft)}</p>
            </div>
            <Button text="Подтвердить" type="submit" disabled={isFinished} />
            <p className={styles.changeEmail} onClick={handleChangeEmail}>
              Сменить Email
            </p>
            {isFinished && <p className={styles.expired}>Код истёк</p>}
          </div>
        </form>
      </div>
    </section>
  );
};

export default EmailConfirmation;
