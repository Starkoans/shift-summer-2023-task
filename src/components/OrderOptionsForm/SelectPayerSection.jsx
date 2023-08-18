import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setPayer } from '../../store/newDelivery/newDelivery.slice.js';

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
    <section className="m-3 p-3 pl-7 bg-white rounded-xl mb-6 ">
      <label>
        Кто оплачивает доставку:
        <section className="mx-5 py-3 flex flex-col sm:flex-row">
          <label className="pr-5 py-3 font-light" htmlFor="sender">
            <input
              checked={payer === 'SENDER'}
              onChange={handleChange}
              type="radio"
              value="SENDER"
              id="sender"
              className="mr-3 w-5 h-5 accent-purple-700"
            />
            Отправитель
          </label>
          <label htmlFor="receiver" className="pr-5 py-3 font-light">
            <input
              checked={payer === 'RECEIVER'}
              onChange={handleChange}
              type="radio"
              value="RECEIVER"
              id="receiver"
              className="mr-3 w-5 h-5 accent-purple-700"
            />
            Получатель
          </label>
        </section>
      </label>
    </section>
  );
}
export default SelectPayerSection;
