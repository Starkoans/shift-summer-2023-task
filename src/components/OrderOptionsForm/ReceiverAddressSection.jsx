import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function ReceiverAddressSection() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    mode: "onChange",
  } = useForm();

  const newDelivery = useSelector(state => state.newDelivery);
  return (
    <form>
      <label htmlFor="receiverAdressData">Адрес доставки</label>
      <section id="receiverData">
        <input
          placeholder="Улица"
          type={'text'}
          defaultValue={newDelivery.receiverAddress.street}
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
          defaultValue={newDelivery.receiverAddress.street}
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
          defaultValue={newDelivery.receiverAddress.appartament}
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
          defaultValue={newDelivery.receiverAddress.comment}
          {...register('comment', {
            max: {
              value: 200,
              message: 'Слишком много символов.',
            },
          })}
        />
        <p className={'text-red-500'}>{errors.comment?.message}</p>
      </section>
    </form>
  );
}
export default ReceiverAddressSection;
