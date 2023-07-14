import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { sendDeliveryOrder } from '../../store/newDelivery.slice.js';

export default function OrderCheckForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const newDelivery = useSelector(state => state.newDelivery);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(sendDeliveryOrder(newDelivery));
  };
  return (
    <form
      onSubmit={e => handleSubmit(e)}
      className="bg-gray-100 m-5 rounded-xl p-5"
    >
      <h3 className="text-2xl font-medium text-center">
        Проверка данных заказа
      </h3>

      <section className="m-5 bg-white p-3 rounded-lg">
        <label className="text-lg">Данные получателя</label>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">ФИО</p>
          <p>
            {newDelivery.receiver.lastname} {newDelivery.receiver.firstname}{' '}
            {newDelivery.receiver.middlename}
          </p>
        </section>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">Телефон</p>
          <p>{newDelivery.receiver.phone}</p>
        </section>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">Адресс</p>
          <p>
            улица {newDelivery.receiverAddress.street}
            {', '}
            дом {newDelivery.receiverAddress.house}
            {', '}
            кв. {newDelivery.receiverAddress.appartament}
          </p>
        </section>
      </section>

      <section className="m-5 bg-white p-3 rounded-lg">
        <label className="text-lg">Данные отправителя</label>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">ФИО</p>
          <p>
            {newDelivery.sender.lastname} {newDelivery.sender.firstname}{' '}
            {newDelivery.sender.middlename}
          </p>
        </section>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">Телефон</p>
          <p>{newDelivery.sender.phone}</p>
        </section>
        <section id="receiverName" className="m-3 flex-col">
          <p className="text-gray-600 text-sm p-2">Адресс</p>
          <p>
            улица {newDelivery.senderAddress.street}
            {', '}
            дом {newDelivery.senderAddress.house}
            {', '}
            кв. {newDelivery.senderAddress.appartament}
          </p>
        </section>
      </section>

      <section className="m-5 px-10  justify-end">
        <div className="flex flex-col w-fit justify-self-end">
          <label className="text-lg">
            Итого: <b>{newDelivery.option.price} ₽</b>
          </label>
          <p>Тариф: {newDelivery.option.name}</p>
          <p>Срок доставки: {newDelivery.option.days} рабочих дней</p>
        </div>
      </section>

      <section className="flex-row flex justify-center">
        <button className="p-2 m-3" onClick={e => navigate('/order')}>
          Назад
        </button>
        <button type="submit" className="p-2 m-3">
          Отправить
        </button>
      </section>
    </form>
  );
}
