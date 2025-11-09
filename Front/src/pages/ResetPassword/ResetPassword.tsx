import React, { useState } from 'react';
import styles from './ResetPassword.module.scss';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from "react-redux";
import logo from '@/assets/icons/Miraflores_logo.svg';

import { TextField } from '@/components/text-field/TextField';
import { Button } from '@/components/button/Button';

const ResetPassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repetedPassword, setRepetedPassword] = useState('');
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleNavigatetoHome = () => navigate('/');
  const handleRequest = () => {};

  return (
    <section className={styles.resetContainer}>
      <div className={styles.resetWrapper}>
        <div className={styles.imageWrapper}>
          <img src={logo} alt='logo' className={styles.logo} onClick={handleNavigatetoHome} />
        </div>
        <h2 className={styles.title}>Придумайте пароль</h2>

        <div className={styles.textFieldWrapper}>
          <TextField
            label='Новый пароль'
            type='password'
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
          />
          <TextField
            label='Повторите пароль'
            type='password'
            value={repetedPassword}
            onChange={e => setRepetedPassword(e.target.value)}
          />
        </div>
        <Button text='Далее' onClick={handleRequest} />
      </div>
    </section>
  );
};

export default ResetPassword;
