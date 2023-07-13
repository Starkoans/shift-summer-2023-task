import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SelectDeliveryType from './SelectDeliveryType.jsx';
import SelectPayerSection from './SelectPayerSection.jsx';
import ValidatedInput from './ValidatedInput.jsx';

function OrderOptionsForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = data => {
    console.log(data);
    // navigate('/check');
  };
  const newDelivery = useSelector(state => state.newDelivery);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 text-lg m-5 p-5 rounded-md"
    >
      <h2 className="text-center font-medium text-2xl">Оформить отправление</h2>
      <SelectDeliveryType />
      <section>
        <label htmlFor="receiverData">Данные получателя</label>
        <section id="receiverData">
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiver.firstname}
            register={register}
            errors={errors}
            label="Имя"
            name="receiverName"
            required={true}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiver.lastname}
            register={register}
            errors={errors}
            label="Фамилия"
            name="receiverLastName"
            required={true}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiver.middlename}
            register={register}
            errors={errors}
            label="Отчество"
            name="receiverLastName"
            required={false}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />

          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiver.phone}
            register={register}
            errors={errors}
            label="Номер телефона"
            name="receiverPhone"
            required={true}
            minLength={7}
            maxLength={12}
            pattern={/^\+[0-9]+$/}
          />
        </section>
      </section>
      <section>
        <label htmlFor="senderData">Данные отправителя</label>
        <section id="senderData">
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.sender.firstname}
            register={register}
            errors={errors}
            label="Имя"
            name="senderName"
            required={true}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.sender.lastname}
            register={register}
            errors={errors}
            label="Фамилия"
            name="senderLastName"
            required={true}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.sender.middlename}
            register={register}
            errors={errors}
            label="Отчество"
            name="senderLastName"
            required={false}
            minLength={2}
            maxLength={50}
            pattern={/[a-zA-Zа-яА-Я]/}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.sender.phone}
            register={register}
            errors={errors}
            label="Номер телефона"
            name="senderPhone"
            required={true}
            minLength={7}
            maxLength={12}
            pattern={/^[0-9]+$/}
          />
        </section>
      </section>
      <section>
        <label htmlFor="senderAddress">Адрес отправителя</label>
        <section id="senderAddress">
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.senderAddress.street}
            register={register}
            errors={errors}
            label="Улица"
            name="senderStreet"
            required={true}
            minLength={2}
            maxLength={50}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.senderAddress.house}
            register={register}
            errors={errors}
            label="Дом"
            name="senderHouse"
            required={true}
            minLength={1}
            maxLength={3}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.senderAddress.appartament}
            register={register}
            errors={errors}
            label="Квартира"
            name="senderAppartament"
            required={false}
            maxLength={4}
            pattern={/^[0-9]+$/}
          />
          <ValidatedInput
            type={'textarea'}
            defaultValue={newDelivery.senderAddress.comment}
            register={register}
            errors={errors}
            label="Комментарий для курьера"
            name="senderComment"
            required={false}
            maxLength={200}
          />
        </section>
      </section>

      <section>
        <label htmlFor="receiverAddress">Адрес получателя</label>
        <section id="receiverAddress">
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiverAddress.street}
            register={register}
            errors={errors}
            label="Улица"
            name="receiverStreet"
            required={true}
            minLength={2}
            maxLength={50}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiverAddress.house}
            register={register}
            errors={errors}
            label="Дом"
            name="receiverHouse"
            required={true}
            minLength={1}
            maxLength={3}
          />
          <ValidatedInput
            type={'text'}
            defaultValue={newDelivery.receiverAddress.appartament}
            register={register}
            errors={errors}
            label="Квартира"
            name="receiverAppartament"
            required={false}
            maxLength={4}
            pattern={/^[0-9]+$/}
          />
          <ValidatedInput
            type={'textarea'}
            defaultValue={newDelivery.receiverAddress.comment}
            register={register}
            errors={errors}
            label="Комментарий для курьера"
            name="receiverComment"
            required={false}
            maxLength={200}
          />
        </section>
      </section>
      <SelectPayerSection />
      <button type="submit">Оформить</button>
    </form>
  );
}
export default OrderOptionsForm;
