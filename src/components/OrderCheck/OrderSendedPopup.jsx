import { useDispatch, useSelector } from 'react-redux';

import { setOrderStatusClosed } from '../../store/newDelivery.slice.js';

export default function OrderSendedPopup() {
  const dispatch = useDispatch();
  const order = useSelector(state => state.newDelivery.order);
  const handleClose = () => {
    dispatch(setOrderStatusClosed());
  };
  return (
    <div
      style={{ height: '130%' }}
      className="bg-black bg-opacity-50 absolute right-0 top-0 w-full "
    >
      <div className="flex justify-center content-center h-full">
        <div className=" flex flex-col self-center p-2 w-1/2 bg-white bg-opacity-100 rounded-lg text-center ">
          <button className="flex justify-end" onClick={handleClose}>
            X
          </button>
          {order.status === 'resolved' && (
            <>
              <h3 className="text-lg font-medium ">Заявка отправлена</h3>
              <p>
                Вы можете оплатить ваш заказ в любое удобное время в разделе
                "Личный кабинет".
              </p>
              <button>Посмотреть статус</button>
            </>
          )}
          {order.status === 'error' && (
            <>
              <h3 className="text-lg font-medium ">Ошибка</h3>
              <p> {order.error}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
