import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { removeCode } from '../../store/user.slice.js';
import { sendPhone, setUserPhone } from '../../store/user.slice.js';
import styles from '../Auth.module.css';

export default function SendPhoneForm() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = data => {
    console.log(JSON.stringify(data));
    dispatch(removeCode());
    dispatch(setUserPhone(data.phone));
    dispatch(sendPhone(data.phone));
    navigate('/auth/otp');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Вход в кабинет</h2>
      <p>Введите номер телефона для входа в личный кабинет</p>
      <input
        className={'p-2 m-2'}
        placeholder="Номер телефона"
        type={'tel'}
        defaultValue={user.phone.phoneNum}
        {...register('phone', {
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
      <p className="text-red-500">{errors.phone?.message}</p>
      <button
        className={
          'bg-fuchsia-900 p-2 m-2 border-2 border-fuchsia-900 hover: bg-fuchsia-900'
        }
        type={'submit'}
      >
        Получить код
      </button>
    </form>
  );
}
