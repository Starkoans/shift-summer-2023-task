import { useSelector } from 'react-redux';

function SelectDeliveryType() {
  const newDelivery = useSelector(state => state.newDelivery);
  return (
    <section className="flex flex-row">
      {newDelivery.calc.options.map((o, key) => {
        return (
          <div className="m-3 p-5 border-2 rounded-md w-1/2" key={key}>
            {o.type === 'DEFAULT' ? (
              <p> Обычная доставка до двери </p>
            ) : (
              <p>Экспресс доставка</p>
            )}
            <p className="font-black">{o.price} Р</p>
            <p>{o.days} рабочих дней</p>
          </div>
        );
      })}
    </section>
  );
}
export default SelectDeliveryType;
