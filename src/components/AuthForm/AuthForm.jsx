import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button.jsx';
import ValidatedInput from '../../atoms/ValidatedInput.jsx';
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

      <ValidatedInput
        type="text"
        register={register}
        errors={errors}
        label="Код"
        name="code"
        required={true}
        minLength={6}
        maxLength={12}
        pattern={/[0-9]+$/}
      />

      <Link to={'/auth/phone'} className="text-purple-900">
        Отправить ещё раз
      </Link>
      <Button type="submit" text="Войти" />
    </form>
  );
}
