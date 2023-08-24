import ContactsCard from './ContactsCard.jsx';

export default function HistoryItem({ order, index }) {
  return (
    <div className="grid-rows-1 content-center place-items-center bg-white border-2 border-gray-300 rounded-xl my-5 p-4">
      <div className="px-3 grid grid-cols-2 py-3">
        <div>
          <p> Заказ №{index + 1}</p>
        </div>
        <div className="w-fit flex justify-self-end">
          {order.status === 3 ? (
            <p className="bg-green-400 rounded-2xl px-3 py-1 text-green-900">
              Доставлено
            </p>
          ):
            order.status === 2 ? (
              <p className="bg-amber-400 rounded-2xl px-3 py-1 text-amber-900">
                Заказ в пути
              </p>
            ):
            order.status === 0 ? (
            <p className="bg-amber-400 rounded-2xl px-3 py-1 text-amber-900">
              На рассмотрении
            </p>
          ) : (
            <p className="bg-pink-400 rounded-2xl px-3 py-1 text-pink-900">
              Отменено
            </p>
          )}
        </div>
      </div>
      <div className="grid gap-5 m-3 sm:grid-cols-2 grid-rows-1">
        <div className="border-2 rounded-2xl border-purple-800">
          <ContactsCard
            contacts={order.sender}
            point={order.senderPoint}
            address={order.senderAddress}
            name="Отправитель"
          />
        </div>
        <div className="border-2 rounded-2xl border-purple-800">
          <ContactsCard
            contacts={order.receiver}
            point={order.receiverPoint}
            address={order.receiverAddress}
            name="Получатель"
          />
        </div>
      </div>
    </div>
  );
}
