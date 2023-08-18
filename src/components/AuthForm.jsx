import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { getToken, isExpired } from '../Auth.js';
import Button from '../atoms/Button.jsx';
import ValidatedInput from '../atoms/ValidatedInput.jsx';
import { getSession } from '../store/user/thunks/getSession.js';
import { signIn } from '../store/user/thunks/signIn.js';
import { setCode } from '../store/user/user.slice.js';

export default function AuthForm() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigate = useNavigate();
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
  const tkn = getToken();
  useEffect(() => {
    dispatch(getSession(tkn));
    if (tkn && !isExpired(tkn.timeStamp)) {
      navigate('/account/profile');
    }
  }, [dispatch, navigate, tkn]);

  return (
    <form
      className="p-10 bg-white text-black  max-w-sm rounded-xl flex-col flex justify-center text-center m-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="font-bold text-xl mb-4">Вход в кабинет</h2>
      <p>Код отправлен на номер </p>
      <p className="mb-4">{user.phone.phoneNum}</p>
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
      <Link to={'/auth/phone'} className="text-purple-900 mb-4 hover:underline">
        Отправить ещё раз
      </Link>
      <Button type="secondary" cn="secondary" child="Войти" />
    </form>
  );
}
