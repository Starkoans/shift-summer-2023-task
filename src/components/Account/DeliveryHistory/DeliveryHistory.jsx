import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getToken } from '../../../Auth.js';
import Loader from '../../../atoms/Loader.jsx';
import { getDeliveryHistory } from '../../../store/user/thunks/getDeliveryHistory.js';
import { setUserLocation } from '../../../store/user/user.slice.js';
import HistoryItem from './HistoryItem.jsx';

function DeliveryHistory() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const tkn = getToken();
  useEffect(() => {
    dispatch(setUserLocation('history'));
    dispatch(getDeliveryHistory(tkn.value));
  }, []);

  return (
    <>
      {user.deliveryHistory.status === 'resolved' ? (
        !user.deliveryHistory.history ||
        user.deliveryHistory.history === 'empty' ? (
          <div className="p-5">
            <p>Заказов пока нет.</p>
          </div>
        ) : (
          <div className="m-5 text-gray-700 ">
            {user.deliveryHistory.history.map((order, index) => (
              <HistoryItem order={order} index={index} key={order._id} />
            ))}
          </div>
        )
      ) : user.deliveryHistory.status === 'loading' ? (
        <div className="p-10">
          <Loader />
        </div>
      ) : (
        <div className="m-5">
          <h3 className="text-lg font-bold text-center">Ошибка.</h3>
          <p> {user.deliveryHistory.error}</p>
        </div>
      )}
    </>
  );
}
export default DeliveryHistory;
