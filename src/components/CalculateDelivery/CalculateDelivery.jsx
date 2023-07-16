import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Button from '../../atoms/Button.jsx';
import ValidatedInput from '../../atoms/ValidatedInput.jsx';
import styles from './CalculateDelivery.module.css';
import useCalculateDelivery from './useCalculateDelivery.js';

export default function CalculateDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const newDelivery = useSelector(state => state.newDelivery);
  const { onSubmit, optionsAccurasy, accurasy } = useCalculateDelivery(watch);
  return (
    <>
      {newDelivery.points.status === 'resolved' &&
        newDelivery.packageTypes.status === 'resolved' && (
          <div className={styles.calcShipDiv}>
            <h2 className="text-center">Рассчитать доставку</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="senderPoint">Город отправки:</label>
              <select
                className={styles.calcShipSelect}
                {...register('senderPoint', { required: true })}
              >
                {newDelivery.points.points.map(value => (
                  <option key={value.id} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>

              <label htmlFor="receiverPoint">Город доставки:</label>
              <select
                className={styles.calcShipSelect}
                {...register('receiverPoint', { required: true })}
              >
                {newDelivery.points.points.map(value => (
                  <option key={value.id} value={value.name}>
                    {value.name}
                  </option>
                ))}
              </select>

              <label htmlFor="accurasy">Размер посылки:</label>
              <select
                className={styles.calcShipSelect}
                {...register('accurasy', { required: true })}
              >
                {optionsAccurasy.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.text}
                  </option>
                ))}
              </select>

              {accurasy === 'approximately' ? (
                <div className={styles.approximatelySizes}>
                  <select
                    className={styles.calcShipSelect}
                    {...register('package', { required: true })}
                  >
                    {newDelivery.packageTypes.packages.map(value => (
                      <option key={value.id} value={value.name}>
                        {value.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className={styles.approximatelySizes}>
                  <label htmlFor="length">Длина</label>
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

                  <label htmlFor="width">Ширина</label>
                  <ValidatedInput
                    type="text"
                    defaultValue={newDelivery.package.length}
                    register={register}
                    errors={errors}
                    label="см"
                    name="width"
                    required={true}
                    min={19}
                    max={100}
                    pattern={/[0-9]+$/}
                  />

                  <label htmlFor="height">Высота</label>
                  <ValidatedInput
                    type="text"
                    defaultValue={newDelivery.package.length}
                    register={register}
                    errors={errors}
                    label="см"
                    name="height"
                    required={true}
                    min={5}
                    max={50}
                    pattern={/[0-9]+$/}
                  />

                  <label htmlFor="weight">Вес</label>
                  <ValidatedInput
                    type="text"
                    defaultValue={newDelivery.package.length}
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
              )}

              <Button type="submit" text="Рассчитать" />
            </form>
          </div>
        )}
    </>
  );
}
