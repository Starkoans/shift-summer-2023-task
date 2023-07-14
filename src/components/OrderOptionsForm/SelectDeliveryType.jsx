import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDeliveryOption } from '../../store/newDelivery.slice.js';

function SelectDeliveryType() {
  const dispatch = useDispatch();
  const newDelivery = useSelector(state => state.newDelivery);
  const [selectedType, setSelectedType] = useState('DEFAULT');
  const handleSelect = option => {
    setSelectedType(option.type);
    dispatch(
      setDeliveryOption({
        id: option.id,
        price: option.price,
        days: option.days,
        name: option.name,
        type: option.type,
      })
    );
  };

  return (
    <section className="flex flex-row">
      {newDelivery.calc.options.map((option, index) => {
        return (
          <div
            onClick={e => handleSelect(option)}
            className={
              selectedType === option.type
                ? 'bg-purple-800 text-white m-3 p-5 border-2 rounded-2xl w-1/2 '
                : 'm-3 p-5 border-2 rounded-2xl w-1/2 hover:bg-gray-200'
            }
            key={index}
          >
            {option.type === 'DEFAULT' ? (
              <p> Обычная доставка </p>
            ) : (
              <p>Экспресс доставка</p>
            )}
            <p className="font-black text-2xl">{option.price} Р</p>
            <p>{option.days} рабочих дней</p>
          </div>
        );
      })}
    </section>
  );
}
export default SelectDeliveryType;
