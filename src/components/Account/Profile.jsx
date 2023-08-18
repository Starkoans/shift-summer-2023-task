import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button.jsx';
import ValidatedInput from '../../atoms/ValidatedInput.jsx';
import { removeUser, setUserLocation } from '../../store/user/user.slice.js';

function Profile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  useEffect(() => {
    dispatch(setUserLocation('profile'));
  }, []);
  const onSubmit = () => {};
  return (
    <div className="p-5 flex flex-col m-5">
      <h2 className="font-bold text-lg self-center">Личная информация</h2>
      <form className="m-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Имя</label>
        <ValidatedInput
          type={'text'}
          defaultValue={user.userInfo.firstname}
          register={register}
          errors={errors}
          label="Имя"
          name="name"
          required={true}
          minLength={2}
          maxLength={100}
          pattern={/[a-zA-Zа-яА-Я]/}
        />
        <label>Фамилия</label>
        <ValidatedInput
          type={'text'}
          defaultValue={user.userInfo.lastname}
          register={register}
          errors={errors}
          label="Фамилия"
          name="lastname"
          required={true}
          minLength={2}
          maxLength={100}
          pattern={/[a-zA-Zа-яА-Я]/}
        />
        <label>Отчетсво</label>
        <ValidatedInput
          type={'text'}
          defaultValue={user.userInfo.middlename}
          register={register}
          errors={errors}
          label="Отчество"
          name="middlename"
          required={false}
          minLength={2}
          maxLength={100}
          pattern={/[a-zA-Zа-яА-Я]/}
        />
        <label>Телефон</label>
        <ValidatedInput
          type={'tel'}
          defaultValue={user.phone.phoneNum}
          register={register}
          errors={errors}
          label="Номер телефона"
          name="phone"
          required={true}
          minLength={6}
          maxLength={12}
          pattern={/^[0-9]+$/}
        />
        <label>E-mail</label>
        <ValidatedInput
          type={'text'}
          defaultValue={user.userInfo.email}
          register={register}
          errors={errors}
          label="E-mail"
          name="email"
          required={true}
          minLength={6}
          pattern={
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          }
        />
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 m-5 justify-center">
          <div className="flex justify-center">
            <Button
              type="submit"
              cn="secondary"
              child="Обновить личные данные"
            />
          </div>
          <div className="flex justify-center">
            <Button
              cn="alert"
              child={
                <div className="flex align-middle items-center">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6 fill-current mr-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <Link onClick={() => dispatch(removeUser())} to="/">
                    Выйти из аккаунта
                  </Link>
                </div>
              }
            ></Button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Profile;
