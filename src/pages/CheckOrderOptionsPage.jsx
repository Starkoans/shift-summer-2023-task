import { useSelector } from 'react-redux';

import OrderCheckForm from '../components/OrderCheck/OrderCheckForm.jsx';
import OrderSendedPopup from '../components/OrderCheck/OrderSendedPopup.jsx';

export default function CheckOrderOptionsPage() {
  const order = useSelector(state => state.newDelivery.order);
  return (
    <div className="p-5">
      <OrderCheckForm />
      {(order.status === 'resolved' || order.status === 'error') && (
        <OrderSendedPopup />
      )}
    </div>
  );
}
