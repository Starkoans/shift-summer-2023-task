import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../atoms/Button.jsx';
import Loader from '../../atoms/Loader.jsx';
import ValidatedInput from '../../atoms/ValidatedInput.jsx';
import {
  setReceiver,
  setReceiverAddress,
  setSender,
  setSenderAddress,
} from '../../store/newDelivery/newDelivery.slice.js';
import SelectDeliveryType from './SelectDeliveryType.jsx';
import SelectPayerSection from './SelectPayerSection.jsx';

function OrderOptionsForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = () => {
    const data = getValues();
    dispatch(
      setSender({
        firstname: data.senderName,
        lastname: data.senderLastname,
        middlename: data.senderMiddlename,
        phone: data.senderPhone,
      })
    );
    dispatch(
      setReceiver({
        firstname: data.receiverName,
        lastname: data.receiverLastname,
        middlename: data.receiverMiddlename,
        phone: data.receiverPhone,
      })
    );
    dispatch(
      setSenderAddress({
        street: data.senderStreet,
        house: data.senderHouse,
        appartament: data.senderAppartament,
        comment: data.senderComment,
      })
    );
    dispatch(
      setReceiverAddress({
        street: data.receiverStreet,
        house: data.receiverHouse,
        appartament: data.receiverAppartament,
        comment: data.receiverComment,
      })
    );
    navigate('/order/check');
  };
  const newDelivery = useSelector(state => state.newDelivery);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-purple-200 text-lg m-5 p-5  rounded-md flex wrap flex-col"
    >
      {newDelivery.calc.status === 'loading' ? (
        <div className="p-10">
          <Loader />
        </div>
      ) : (
        <>
          <h2 className="text-center font-medium text-3xl">
            Оформить отправление
          </h2>
          <SelectDeliveryType />
          <section className="md:max-2xl:grid grid-cols-2 gap-6 place-items-center m-3">
            <section className="md:max-2xl:w-full h-full p-7  rounded-2xl  bg-stone-50 m-3">
              <label htmlFor="receiverData">Данные получателя</label>
              <section id="receiverData" className="mt-5">
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
                  type="text"
                  defaultValue={newDelivery.receiver.lastname}
                  register={register}
                  errors={errors}
                  label="Фамилия"
                  name="receiverLastname"
                  required={true}
                  minLength={2}
                  maxLength={50}
                  pattern={/[a-zA-Zа-яА-Я]/}
                />
                <ValidatedInput
                  type="text"
                  defaultValue={newDelivery.receiver.middlename}
                  register={register}
                  errors={errors}
                  label="Отчество"
                  name="receiverMiddlename"
                  required={false}
                  minLength={2}
                  maxLength={50}
                  pattern={/[a-zA-Zа-яА-Я]/}
                />

                <ValidatedInput
                  type="text"
                  defaultValue={newDelivery.receiver.phone}
                  register={register}
                  errors={errors}
                  label="Номер телефона"
                  name="receiverPhone"
                  required={true}
                  minLength={7}
                  maxLength={12}
                  pattern={/^[0-9]+$/}
                />
              </section>
            </section>
            <section className="md:max-2xl:w-full h-full p-7 rounded-2xl bg-stone-50 m-3">
              <label htmlFor="receiverAddress">Адрес получателя</label>
              <section id="receiverAddress" className="mt-5">
                <ValidatedInput
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="textarea"
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
            <section className="md:max-2xl:w-full h-full  p-7 rounded-2xl bg-stone-50 m-3">
              <label htmlFor="senderData">Данные отправителя</label>
              <section id="senderData" className="mt-5">
                <ValidatedInput
                  type="text"
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
                  type="text"
                  defaultValue={newDelivery.sender.lastname}
                  register={register}
                  errors={errors}
                  label="Фамилия"
                  name="senderLastname"
                  required={true}
                  minLength={2}
                  maxLength={50}
                  pattern={/[a-zA-Zа-яА-Я]/}
                />
                <ValidatedInput
                  type="text"
                  defaultValue={newDelivery.sender.middlename}
                  register={register}
                  errors={errors}
                  label="Отчество"
                  name="senderMiddlename"
                  required={false}
                  minLength={2}
                  maxLength={50}
                  pattern={/[a-zA-Zа-яА-Я]/}
                />
                <ValidatedInput
                  type="text"
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
            <section className="md:max-2xl:w-full h-full p-7 rounded-2xl bg-stone-50 m-3">
              <label htmlFor="senderAddress">Адрес отправителя</label>
              <section id="senderAddress" className="mt-5">
                <ValidatedInput
                  type="text"
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
                  type="text"
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
                  type="text"
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
                  type="textarea"
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
          </section>

          <SelectPayerSection />
          <Button child="Оформить" cn="secondary" />
        </>
      )}
    </form>
  );
}
export default OrderOptionsForm;
