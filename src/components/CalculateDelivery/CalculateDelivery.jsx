import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Button from '../../atoms/Button.jsx';
import ValidatedInput from '../../atoms/ValidatedInput.jsx';
import useCalculateDelivery from './useCalculateDelivery.js';

export default function CalculateDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: 'onChange' });
  const newDelivery = useSelector(state => state.newDelivery);
  const { onSubmit, optionsAccurasy, accurasy } = useCalculateDelivery(watch);
  return (
    <>
      {newDelivery.points.status === 'resolved' &&
        newDelivery.packageTypes.status === 'resolved' && (
          <div className="p-7 bg-white text-black  max-w-sm min-w-max rounded-xl flex-col flex justify-center">
            <h2 className="text-center font-bold mb-4 text-lg">
              Рассчитать доставку
            </h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="pb-3">
                <label htmlFor="senderPoint" className="pr-3 text-sm">
                  Город отправки:
                </label>
                <div className="flex flex-row  bg-purple-200 rounded-md focus:border-purple-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="purple"
                    className="w-7 h-7 self-center ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <select
                    className="p-2 bg-purple-200 rounded-md w-full "
                    {...register('senderPoint', { required: true })}
                  >
                    {newDelivery.points.points.map(value => (
                      <option className="p-2" key={value.id} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="pb-3">
                <label htmlFor="receiverPoint" className="pr-3 text-sm">
                  Город назначения:
                </label>
                <div className="flex flex-row  bg-purple-200 rounded-md focus:border-purple-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="purple"
                    className="w-7 h-7 self-center ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                    />
                  </svg>

                  <select
                    className="p-2 bg-purple-200 rounded-md w-full"
                    {...register('receiverPoint', { required: true })}
                  >
                    {newDelivery.points.points.map(value => (
                      <option key={value.id} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label htmlFor="accurasy" className="pr-3 text-sm">
                Размер посылки:
              </label>
              <div className="bg-purple-200 rounded-xl mb-5 ">
                <div className="flex flex-col p-2 sm:grid sm:grid-cols-2 sm:gap-4 sm:p-3 sm:place-items-center">
                  {optionsAccurasy.map(option => (
                    <label
                      key={option.value}
                      // htmlFor={option.value}
                      onClick={e => setValue('accuracy', e.target.value)}
                      className={
                        watch('accurasy') === option.value
                          ? 'm-2 py-2 sm:px-4 sm:w-full bg-purple-500 rounded-full text-center text-white  transition ease-in-out duration-300 hover:bg-purple-400'
                          : 'm-2 py-2 sm:px-4 sm:w-full bg-purple-300 rounded-full text-center transition ease-in-out duration-300 hover:bg-purple-400'
                      }
                    >
                      <input
                        {...register('accurasy', { required: true })}
                        className="hidden"
                        type="radio"
                        value={option.value}
                      />
                      {option.text}
                    </label>
                  ))}
                </div>

                {accurasy === 'approximately' ? (
                  <div className="p-4">
                    <select
                      className="p-2 w-full bg-purple-white rounded-md "
                      {...register('package', { required: true })}
                    >
                      {newDelivery.packageTypes.packages.map(value => (
                        <option key={value.id} value={value.name}>
                          {value.name}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : accurasy === 'accurately' ? (
                  <div className="p-4">
                    <label htmlFor="length" className="text-sm">
                      Длина
                    </label>
                    <ValidatedInput
                      type="text"
                      defaultValue={newDelivery.package.length}
                      register={register}
                      errors={errors}
                      label="см"
                      name="length"
                      required={true}
                      min={23}
                      max={100}
                      pattern={/[0-9]+$/}
                    />

                    <label htmlFor="width" className="text-sm">
                      Ширина
                    </label>
                    <ValidatedInput
                      type="text"
                      defaultValue={newDelivery.package.width}
                      register={register}
                      errors={errors}
                      label="см"
                      name="width"
                      required={true}
                      min={19}
                      max={100}
                      pattern={/[0-9]+$/}
                    />

                    <label htmlFor="height" className="text-sm">
                      Высота
                    </label>
                    <ValidatedInput
                      type="text"
                      defaultValue={newDelivery.package.height}
                      register={register}
                      errors={errors}
                      label="см"
                      name="height"
                      required={true}
                      min={5}
                      max={50}
                      pattern={/[0-9]+$/}
                    />

                    <label htmlFor="weight" className="text-sm">
                      Вес
                    </label>
                    <ValidatedInput
                      type="text"
                      defaultValue={newDelivery.package.weight}
                      register={register}
                      errors={errors}
                      label="см"
                      name="weight"
                      required={true}
                      min={2}
                      max={50}
                      pattern={/[0-9]+$/}
                    />
                  </div>
                ) : null}
              </div>
              <div className="flex justify-center">
                <Button type="secondary" cn="secondary" child="Рассчитать" />
              </div>
            </form>
          </div>
        )}
    </>
  );
}
