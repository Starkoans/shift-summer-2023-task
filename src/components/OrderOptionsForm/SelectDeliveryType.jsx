import { useState } from 'react';
import { useSelector } from 'react-redux';

function SelectDeliveryType() {
  const newDelivery = useSelector(state => state.newDelivery);
  const [selectedType, setSelectedType] = useState('DEFAULT');
  return (
    <section className="flex flex-row">
      {newDelivery.calc.options.map((o, key) => {
        return (
          <div
            onClick={e => setSelectedType(o.type)}
            className={
              selectedType === o.type
                ? 'bg-purple-800 text-white m-3 p-5 border-2 rounded-2xl w-1/2 '
                : 'm-3 p-5 border-2 rounded-2xl w-1/2 hover:bg-gray-200'
            }
            key={key}
          >
            {o.type === 'DEFAULT' ? (
              <p> Обычная доставка </p>
            ) : (
              <p>Экспресс доставка</p>
            )}
            <p className="font-black text-2xl">{o.price} Р</p>
            <p>{o.days} рабочих дней</p>
          </div>
        );
      })}
    </section>
  );
}
export default SelectDeliveryType;
