import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function ReceiverDataSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newDelivery = useSelector(state => state.newDelivery);

  return (
    <form>
      <label htmlFor="receiverData">Данные получателя</label>
      <section id="receiverData">
        <input
          placeholder="Имя"
          type={'text'}
          defaultValue={newDelivery.receiver.firstname}
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
        <p className={'text-red-500'}>{errors.receiverName?.message}</p>
        <input
          placeholder="Фамилия"
          type={'text'}
          defaultValue={newDelivery.receiver.lastname}
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
        <p className={'text-red-500'}>{errors.receiverLastName?.message}</p>
        <input
          placeholder="Отчество"
          type={'text'}
          defaultValue={newDelivery.receiver.middlename}
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
        <p className={'text-red-500'}>{errors.receiverMidName?.message}</p>
        <input
          placeholder="Номер телефона"
          type={'tel'}
          defaultValue={newDelivery.receiver.phone}
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
export default ReceiverDataSection;
