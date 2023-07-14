import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getSession, setCode, signIn } from '../../store/user.slice.js';
import styles from '../Auth.module.css';

export default function AuthForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    dispatch(signIn({ phone: user.phone.phoneNum, code: data.code }));
    console.log(JSON.stringify(data));
    dispatch(setCode(data.code));
  };
  useEffect(() => {
    dispatch(getSession(user.token));
  }, [dispatch, user.token]);

  return (
    <form
      className="p-10 bg-white text-black  max-w-sm rounded-xl flex-col flex justify-center text-center m-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>Вход в кабинет</h2>
      <p>Пароль отправлен на номер </p>
      <p>{user.phone.phoneNum}</p>

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
      {user.otp.error && <p className={'text-red-500'}>{user.otp.error}</p>}
      <p className={'text-red-500'}>{errors.code?.message}</p>
      <Link to={'/auth/phone'}>Отправить ещё раз</Link>
      <button
        className={
          'bg-purple-800 text-white py-3 px-5 m-2  rounded-3xl' +
          'hover:bg-purple-500 text-white py-3 px-5 m-2  rounded-3xl'
        }
        type={'submit'}
      >
        Войти
      </button>
    </form>
  );
}
