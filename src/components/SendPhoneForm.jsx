import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../atoms/Button.jsx';
import ValidatedInput from '../atoms/ValidatedInput.jsx';
import { sendPhone } from '../store/user/thunks/sendPhone.js';
import { removeCode } from '../store/user/user.slice.js';
import { setUserPhone } from '../store/user/user.slice.js';

export default function SendPhoneForm() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: 'onChange' });
  const onSubmit = data => {
    dispatch(removeCode());
    dispatch(setUserPhone(data.phone));
    dispatch(sendPhone(data.phone));
    navigate('/auth/otp');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-10 bg-white text-black  max-w-sm rounded-xl flex-col flex justify-center text-center m-10"
    >
      <h2 className="font-bold text-xl mb-4">Вход в кабинет</h2>
      <p className="mb-4">Введите номер телефона для входа в личный кабинет</p>
      <div className="w-2/3 self-center mb-4">
        <ValidatedInput
          type="tel"
          defaultValue={user.phone.phoneNum}
          register={register}
          errors={errors}
          label="Номер телефона"
          name="phone"
          required={true}
          minLength={6}
          maxLength={11}
          pattern="tel"
          setValue={setValue}
        />
      </div>
      <div className="mx-4">
        <Button type="submit" cn="secondary" child="Получить код" />
      </div>
    </form>
  );
}
