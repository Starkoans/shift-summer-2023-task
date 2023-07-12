import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function SenderAddressSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const newDelivery = useSelector(state => state.newDelivery);
  return (
    <>
      <label htmlFor="receiverAdressData">Адрес для приезда курьера</label>
      <section id="receiverData">
        <input
          placeholder="Улица"
          type={'text'}
          defaultValue={newDelivery.senderAddress.street}
          {...register('street', {
            max: {
              value: 50,
              message: 'Слишком много символов.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.street?.message}</p>
        <input
          placeholder="Дом"
          type={'text'}
          defaultValue={newDelivery.senderAddress.street}
          {...register('house', {
            max: {
              value: 3,
              message: 'Слишком много символов.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.house?.message}</p>
        <input
          placeholder="Квартира"
          type={'text'}
          defaultValue={newDelivery.senderAddress.appartament}
          {...register('appartament', {
            max: {
              value: 3,
              message: 'Слишком много символов.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.appartament?.message}</p>
        <textarea
          placeholder="Комментарий для курьера"
          defaultValue={newDelivery.senderAddress.comment}
          {...register('comment', {
            max: {
              value: 200,
              message: 'Слишком много символов.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.comment?.message}</p>
      </section>
    </>
  );
}
export default SenderAddressSection;
