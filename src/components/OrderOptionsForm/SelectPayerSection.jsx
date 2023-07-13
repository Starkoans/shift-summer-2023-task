import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPayer } from '../../store/newDelivery.slice.js';

function SelectPayerSection() {
  const payer = useSelector(state => state.newDelivery.payer);
  const dispatch = useDispatch();
  const [checkedPayer, setCheckedPayer] = useState(payer);

  useEffect(() => {}, [checkedPayer]);
  const handleChange = e => {
    setCheckedPayer(payer);
    dispatch(setPayer(e.target.value));
  };

  return (
    <section>
      <label>Кто оплачивает доставку:</label>
      <section>
        <label className="p-2" htmlFor="sender">
          <input
            checked={payer === 'SENDER'}
            onChange={handleChange}
            type="radio"
            value="SENDER"
            id="sender"
            className="mr-3"
          />
          Отправитель
        </label>
        <label htmlFor="receiver">
          <input
            checked={payer === 'RECEIVER'}
            onChange={handleChange}
            type="radio"
            value="RECEIVER"
            id="receiver"
            className="mr-3"
          />
          Получатель
        </label>
      </section>
    </section>
  );
}
export default SelectPayerSection;
