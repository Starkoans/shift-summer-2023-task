import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function SenderDataSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newDelivery = useSelector(state => state.newDelivery);

  return (
    <form>
      <label htmlFor="receiverData">Данные отправителя</label>
      <section id="receiverData">
        <input
          placeholder="Имя"
          type={'text'}
          defaultValue={newDelivery.sender.firstname}
          {...register('senderMidName', {
            max: {
              value: 50,
              message: 'Слишком много символов.',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Некорректный ввод.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.senderName?.message}</p>
        <input
          placeholder="Фамилия"
          type={'text'}
          defaultValue={newDelivery.sender.lastname}
          {...register('receiverLastName', {
            required: 'Поле обязательно к заполнению.',
            max: {
              value: 50,
              message: 'Слишком много символов.',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Некорректный ввод.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.senderLastName?.message}</p>
        <input
          placeholder="Отчество"
          type={'text'}
          defaultValue={newDelivery.sender.middlename}
          {...register('receiverMidName', {
            max: {
              value: 50,
              message: 'Слишком много символов.',
            },
            pattern: {
              value: /^[0-9]+$/,
              message: 'Некорректный ввод.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.senderMidName?.message}</p>
        <input
          placeholder="Номер телефона"
          type={'tel'}
          defaultValue={newDelivery.sender.phone}
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
            pattern: {
              value: /^[0-9]+$/,
              message: 'Некорректный ввод.',
            },
          })}
        />
        <p className="text-red-500">{errors.phone?.message}</p>
      </section>
    </form>
  );
}
export default SenderDataSection;
