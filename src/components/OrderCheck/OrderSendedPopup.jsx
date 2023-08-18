import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import CloseIcon from '../../../public/img/CloseIcon.svg';
import ErrorIcon from '../../../public/img/ErrorIcon.svg';
import SuccesIcon from '../../../public/img/SuccesIcon.svg';
import Button from '../../atoms/Button.jsx';
import { setOrderStatusClosed } from '../../store/newDelivery/newDelivery.slice.js';

export default function OrderSendedPopup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const order = useSelector(state => state.newDelivery.order);
  const handleClose = () => {
    dispatch(setOrderStatusClosed());
  };

  const handleClick = () => {
    navigate('/account/history');
  };

  return (
    <form
      onSubmit={handleClick}
      className="fixed bg-black bg-opacity-50  right-0 top-0 w-full h-full backdrop-blur-sm"
    >
      <div className="flex justify-center content-center mt-20 mx-5">
        <div className="flex flex-col text-center p-5 max-w-md bg-white bg-opacity-100 rounded-lg">
          <a onClick={handleClose} className="self-end">
            <img
              className="cursor-pointer"
              width={'30px'}
              height={'30px'}
              src={CloseIcon}
              alt="Close"
            />
          </a>

          {order.status === 'resolved' && (
            <>
              <h3 className="text-2xl font-medium mt-5">Заявка отправлена</h3>
              <img
                className="self-center m-5 animate-pulse"
                width={'150px'}
                height={'150px'}
                src={SuccesIcon}
                alt="Succes Order"
              />
              <p className="font-light">
                Вы можете оплатить ваш заказ в любое удобное время в разделе
                &quot;Личный кабинет&quot;.
              </p>
              <div className="pt-5">
                <Button
                  type="subbmit"
                  child="Посмотреть статус"
                  cn="secondary"
                />
              </div>
            </>
          )}
          {order.status === 'error' && (
            <>
              <img
                className="self-center m-5"
                width={'150px'}
                height={'150px'}
                src={ErrorIcon}
                alt="Error Order"
              />
              <h3 className="text-lg font-medium ">Ошибка</h3>
              <p> {order.error}</p>
            </>
          )}
        </div>
      </div>
    </form>
  );
}
