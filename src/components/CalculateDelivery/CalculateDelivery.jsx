import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  calcNewDelivery,
  setPackage,
  setReceiverPoint,
  setSenderPoint,
} from '../../store/newDelivery.slice.js';
import styles from './CalculateDelivery.module.css';

export default function CalculateDelivery() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [packageTypes, setPackageTypes] = useState([]);
  const [points, setPoints] = useState([]);

  const dispatch = useDispatch();
  const newDelivery = useSelector(state => state.newDelivery);
  const navigate = useNavigate();
  const onSubmit = data => {
    const receiverPoint = points.find(p => p.name === watch('receiverPoint'));
    dispatch(setReceiverPoint(receiverPoint));
    const senderPoint = points.find(p => p.name === watch('senderPoint'));
    dispatch(setSenderPoint(senderPoint));
    const pack = packageTypes.find(p => p.name === watch('package'));

    console.log(JSON.stringify(data));
    if (data.accurasy === 'accurately') {
      dispatch(setPackage(data));
    } else if (data.accurasy === 'approximately') {
      dispatch(setPackage(pack));
    }
    dispatch(calcNewDelivery({ pack, receiverPoint, senderPoint }));
    navigate('/order');
  };

  const [accurasy, setAccurasy] = useState(watch('select-accurasy'));
  const optionsAccurasy = [
    { value: 'approximately', text: 'Примерно' },
    { value: 'accurately', text: 'Точно' },
  ];

  useEffect(() => {
    setAccurasy(watch('accurasy'));
  }, [watch('accurasy')]);

  useEffect(() => {
    const packageTypesFetch = async () => {
      await fetch('https://shift-backend.onrender.com/delivery/package/types')
        .then(response => {
          return response.json();
        })
        .then(result => {
          setPackageTypes(result.packages);
        });
    };
    packageTypesFetch();
  }, []);

  useEffect(() => {
    const pointsFetch = async () => {
      await fetch('https://shift-backend.onrender.com/delivery/points')
        .then(response => {
          return response.json();
        })
        .then(result => {
          setPoints(result.points);
        });
    };
    pointsFetch();
  }, []);

  return (
    <div className={styles.calcShipDiv}>
      <h2 className={'text-center'}>Рассчитать доставку</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="senderPoint">Город отправки:</label>
        <select
          className={styles.calcShipSelect}
          {...register('senderPoint', { required: true })}
        >
          {points.map(value => (
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
          {points.map(value => (
            <option key={value.id} value={value.name}>
              {value.name}
            </option>
          ))}
          <option value="Moscow">Москва</option>
          <option value="Novosibirsk">Новосибирск</option>
          <option value="Tomsk">Томск</option>
          <option value="St. Peretrburg">Санкт-Петербург</option>
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
              {packageTypes.map(value => (
                <option key={value.id} value={value.name}>
                  {value.name}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={styles.approximatelySizes}>
            <label htmlFor="length">Длина</label>
            <input
              placeholder="см"
              type={'text'}
              {...register('length', {
                required: 'Поле обязательно к заполнению.',
                min: {
                  value: 23,
                  message: 'Слишком маленькая длина.',
                },
                max: {
                  value: 100,
                  message: 'Слишком большая длина.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Некорректный ввод.',
                },
              })}
            />
            <p className={'text-red-500'}>{errors.length?.message}</p>

            <label htmlFor="width">Ширина</label>
            <input
              placeholder="см"
              type={'text'}
              {...register('width', {
                required: 'Поле обязательно к заполнению.',
                min: {
                  value: 19,
                  message: 'Слишком маленькая ширина.',
                },
                max: {
                  value: 100,
                  message: 'Слишком большая ширина.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Некорректный ввод.',
                },
              })}
            />
            <p className={'text-red-500'}>{errors.width?.message}</p>

            <label htmlFor="height">Высота</label>
            <input
              placeholder="см"
              type={'text'}
              {...register('height', {
                required: 'Поле обязательно к заполнению.',
                min: {
                  value: 5,
                  message: 'Слишком маленькая высота.',
                },
                max: {
                  value: 50,
                  message: 'Слишком большая высота.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Некорректный ввод.',
                },
              })}
            />
            <p className={'text-red-500'}>{errors.height?.message}</p>

            <label htmlFor="weight">Вес</label>
            <input
              placeholder="см"
              type={'text'}
              {...register('weight', {
                required: 'Поле обязательно к заполнению.',
                min: {
                  value: 2,
                  message: 'Слишком маленький вес.',
                },
                max: {
                  value: 50,
                  message: 'Слишком большой вес.',
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Некорректный ввод.',
                },
              })}
            />
            <p className={'text-red-500'}>{errors.weight?.message}</p>
          </div>
        )}
        <button className={styles.button}>Рассчитать</button>
      </form>
    </div>
  );
}
