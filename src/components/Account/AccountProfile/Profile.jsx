import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import styles from './Profile.module.css';

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const user = useSelector(state => state.user);
  const onSubmit = () => {};
  return (
    <div className={styles.profile}>
      <h2>Личная информация</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.profileForm}>
        <section>
          <label htmlFor="username">ФИО</label>
          <input
            placeholder="Укажите ФИО"
            defaultValue={user.username}
            type={'text'}
            {...register('name', {
              required: 'Поле обязательно к заполнению.',
              min: {
                value: 23,
                message: 'Слишком маленькая длина.',
              },
              max: {
                value: 100,
                message: 'Слишком большая длина.',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Некорректный ввод.',
              },
            })}
          />
          <p className={'text-red-500'}>{errors.username?.message}</p>
        </section>
        <section>
          <label htmlFor="phone">Номер телефона</label>
          <input
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
        </section>
        <section>
          <label htmlFor="email">E-mail</label>
          <input
            placeholder="Укажите e-mail"
            defaultValue={user.username}
            type={'text'}
            {...register('email', {
              required: 'Поле обязательно к заполнению.',
              min: {
                value: 23,
                message: 'Слишком маленькая длина.',
              },
              max: {
                value: 100,
                message: 'Слишком большая длина.',
              },
              pattern: {
                value: /^[0-9]+$/,
                message: 'Некорректный ввод.',
              },
            })}
          />
          <p className={'text-red-500'}>{errors.email?.message}</p>
        </section>
        <button type={'submit'}>Обновить</button>
      </form>
    </div>
  );
}
export default Profile;
