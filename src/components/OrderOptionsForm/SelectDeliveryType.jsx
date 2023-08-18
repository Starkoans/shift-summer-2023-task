import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setDeliveryOption } from '../../store/newDelivery/newDelivery.slice.js';

function SelectDeliveryType() {
  const dispatch = useDispatch();
  const newDelivery = useSelector(state => state.newDelivery);
  const [selectedType, setSelectedType] = useState(
    newDelivery.calc.options[0].type
  );

  useEffect(() => {
    dispatch(setDeliveryOption(newDelivery.calc.options[0]));
  }, []);

  const handleSelect = option => {
    console.log(option.type);
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
    <section className="flex md:md:flex-row flex-col py-5">
      <>
        {newDelivery.calc.options.map((option, index) => {
          return (
            <div
              onClick={() => handleSelect(option)}
              className={
                selectedType === option.type
                  ? 'bg-purple-600 drop-shadow-lg border-indigo-950 text-white m-3 p-5 rounded-2xl md:max-xl:w-1/2 md:max-2xl:w-1/2 transition ease-in-out duration-300 hover:bg-purple-700'
                  : 'm-3 p-5 bg-purple-300 drop-shadow-md  rounded-2xl md:max-xl:w-1/2 md:max-xl:w-1/2 md:max-2xl:w-1/2 transition ease-in-out duration-300 hover:bg-purple-400 '
              }
              key={index}
            >
              {option.type === 'DEFAULT' ? (
                <p> Обычная доставка </p>
              ) : (
                <p>Экспресс доставка</p>
              )}
              <p className="font-black text-2xl">{option.price} ₽</p>
              <p className="font-light mt-2">
                {option.days}{' '}
                {option.days % 10 === 1 &&
                (option.days < 11 || option.days > 20)
                  ? 'рабочий день'
                  : option.days % 10 >= 2 && option.days % 10 <= 4
                  ? 'рабочих дня'
                  : (option.days % 10 > 4 && option.days % 10 <= 9) ||
                    option.days % 10 === 0 ||
                    option.days >= 11 ||
                    option.days <= 20
                  ? 'рабочих дней'
                  : null}
              </p>
            </div>
          );
        })}
      </>
    </section>
  );
}
export default SelectDeliveryType;
