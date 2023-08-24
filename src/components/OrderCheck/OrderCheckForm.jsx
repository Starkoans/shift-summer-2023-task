import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from '../../atoms/Button.jsx';
import { sendDeliveryOrder } from '../../store/newDelivery/thunks/sendDeliveryOrder.js';

export default function OrderCheckForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newDelivery = useSelector(state => state.newDelivery);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendDeliveryOrder(newDelivery));
  };

  const handleBack = () => {
    navigate('/order');
  };
  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className="bg-purple-200 text-lg m-5 py-5 md:max-xl:p-5 rounded-md flex wrap flex-col"
    >
      <h3 className="text-2xl font-medium text-center mx-5">
        Проверка данных заказа
      </h3>
      <section className="md:max-2xl:grid grid-cols-2 gap-6 place-items-center p-5 md:max-md:mt-5">
        <section className=" p-5 bg-white rounded-lg h-full w-full mb-6 md:max-2xl:m-0">
          <label className="text-lg font-medium">Данные получателя</label>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">ФИО</p>
            <p>
              {newDelivery.receiver.lastname} {newDelivery.receiver.firstname}{' '}
              {newDelivery.receiver.middlename}
            </p>
          </section>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">Телефон</p>
            <p>{newDelivery.receiver.phone}</p>
          </section>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">Адресс</p>
            <p>
              {newDelivery.receiverAddress.street}
              {', '}
              дом {newDelivery.receiverAddress.house}
              {', '}
              кв. {newDelivery.receiverAddress.appartament}
            </p>
          </section>
        </section>

        <section className="p-5 bg-white rounded-lg h-full w-full">
          <label className="text-lg font-medium">Данные отправителя</label>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">ФИО</p>
            <p>
              {newDelivery.sender.lastname} {newDelivery.sender.firstname}{' '}
              {newDelivery.sender.middlename}
            </p>
          </section>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">Телефон</p>
            <p>{newDelivery.sender.phone}</p>
          </section>
          <section
            id="receiverName"
            className="mt-3 px-5 py-3 flex-col border-2 border-purple-300 rounded-xl"
          >
            <p className="text-gray-600 text-sm">Адресс</p>
            <p>
              {newDelivery.senderAddress.street}
              {', '}
              дом {newDelivery.senderAddress.house}
              {', '}
              кв. {newDelivery.senderAddress.appartament}
            </p>
          </section>
        </section>
      </section>
      <section className="m-5 px-10 bg-white rounded-xl p-5 justify-end">
        <div className="flex flex-col justify-self-end">
          <p className="text-gray-600 text-sm">Тариф:</p>
          <p> {newDelivery.option.name}</p>
          <p className="text-gray-600 text-sm">Срок доставки:</p>
          <p className="mb-5">
            {newDelivery.option.days}{' '}
            {newDelivery.option.days % 10 === 1 &&
            (newDelivery.option.days < 11 || newDelivery.option.days > 20)
              ? 'рабочий день'
              : newDelivery.option.days % 10 >= 2 &&
                newDelivery.option.days % 10 <= 4
              ? 'рабочих дня'
              : (newDelivery.option.days % 10 > 4 &&
                  newDelivery.option.days % 10 <= 9) ||
                newDelivery.option.days % 10 === 0 ||
                newDelivery.option.days >= 11 ||
                newDelivery.option.days <= 20
              ? 'рабочих дней'
              : null}
          </p>
          <hr className="border-purple-300 border-2" />
          <label className="text-xl mt-5">
            Итого: <b>{newDelivery.option.price} ₽</b>
          </label>
        </div>
      </section>

      <section className="m-auto grid sm:grid-cols-2 grid-rows-1 justify-center gap-6 w-fit ">
        <Button
          cn="secondary"
          type="button"
          child="Назад"
          handleClick={handleBack}
        />
        <Button cn="primary" type="submit" child="Отправить" />
      </section>
    </form>
  );
}
