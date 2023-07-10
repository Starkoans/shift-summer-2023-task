import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import useAuth from '../../hooks/useAuth.js';
import { setCode, signIn } from '../../store/otp.slice.js';
import styles from '../Auth.module.css';

export default function AuthForm() {
  const dispatch = useDispatch();
  const user = useAuth();
  console.log(user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    dispatch(signIn({ phone: user.phone, code: data.code }));
    console.log(JSON.stringify(data));
    dispatch(setCode(data.code));
  };
  const codeError = useSelector(state => state.otp.error);
  useEffect(() => {}, [codeError]);
  return (
    <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
      <h2>Вход в кабинет</h2>
      <p>Пароль отправлен на номер </p>
      <p>{user.phone}</p>

      <input
        placeholder="Пароль"
        type={'text'}
        {...register('code', {
          required: 'Поле обязательно к заполнению.',
          minLength: {
            value: 6,
            message: 'Неккоректный ввод.',
          },
          maxLength: {
            value: 12,
            message: 'Неккоректный ввод.',
          },
        })}
      />
      {codeError && <p className={'text-red-500'}>{codeError}</p>}
      <p className={'text-red-500'}>{errors.code?.message}</p>
      <Link to={'/auth/phone'}>Отправить ещё раз</Link>
      <button className={styles.button} type={'submit'}>
        Войти
      </button>
    </form>
  );
}
