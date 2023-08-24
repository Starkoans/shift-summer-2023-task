import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setPackage,
  setReceiverPoint,
  setSenderPoint,
} from '../../store/newDelivery/newDelivery.slice.js';
import { calcNewDelivery } from '../../store/newDelivery/thunks/calcNewDelirery.js';
import { getPackageTypes } from '../../store/newDelivery/thunks/getPackageTypes.js';
import { getPoints } from '../../store/newDelivery/thunks/getPoints.js';

export default function useCalculateDelivery(watch) {
  const newDelivery = useSelector(state => state.newDelivery);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmit = data => {
    const receiverPoint = newDelivery.points.points.find(
      p => p.name === watch('receiverPoint')
    );
    dispatch(setReceiverPoint(receiverPoint));
    const senderPoint = newDelivery.points.points.find(
      p => p.name === watch('senderPoint')
    );
    dispatch(setSenderPoint(senderPoint));

    if (data.accurasy === 'accurately') {
      dispatch(setPackage(data));
      const pack = {
        length: data.length,
        height: data.height,
        weight: data.weight,
        width: data.width,
      };
      dispatch(calcNewDelivery({ pack, receiverPoint, senderPoint }));
    } else if (data.accurasy === 'approximately') {
      const pack = newDelivery.packageTypes.packages.find(
        p => p.name === watch('package')
      );
      dispatch(setPackage(pack));
      dispatch(calcNewDelivery({ pack, receiverPoint, senderPoint }));
    }
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
    dispatch(getPoints());
    dispatch(getPackageTypes());
  }, []);
  return {
    onSubmit,
    optionsAccurasy,
    accurasy,
  };
}
