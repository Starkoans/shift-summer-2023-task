import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ReceiverAddressSection from './ReceiverAddressSection.jsx';
import ReceiverDataSection from './ReceiverDataSection.jsx';
import SelectDeliveryType from './SelectDeliveryType.jsx';
import SelectPayerSection from './SelectPayerSection.jsx';
import SenderAddressSection from './SenderAddressSection.jsx';
import SenderDataSection from './SenderDataSection.jsx';

function OrderOptionsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = () => {
    navigate('/check');
  };

  return (
    <form
      className="bg-gray-100 text-lg m-5 p-5 rounded-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-center font-bold">Оформить отправление</h2>
      <SelectDeliveryType />
      <ReceiverDataSection />
      <SenderDataSection />
      <ReceiverAddressSection />
      <SenderAddressSection />
      <SelectPayerSection />
      <button type={'submit'}>Оформить</button>
    </form>
  );
}
export default OrderOptionsForm;
