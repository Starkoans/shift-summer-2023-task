import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const sendDeliveryOrder = createAsyncThunk(
  'newDelivery/order',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/delivery/order`, {
        method: 'POST',
        body: JSON.stringify({
          senderPoint: {
            id: data.senderPoint.id,
            name: data.senderPoint.name,
            latitude: data.senderPoint.latitude,
            longitude: data.senderPoint.longitude,
          },
          senderAddress: {
            street: data.senderAddress.street,
            house: data.senderAddress.house,
            appartament: data.senderAddress.appartament,
            comment: data.senderAddress.comment,
          },
          sender: {
            firstname: data.sender.firstname,
            lastname: data.sender.lastname,
            middlename: data.sender.middlename,
            phone: data.sender.phone,
          },
          receiverPoint: {
            id: data.receiverPoint.id,
            name: data.receiverPoint.name,
            latitude: data.receiverPoint.latitude,
            longitude: data.receiverPoint.longitude,
          },
          receiverAddress: {
            street: data.receiverAddress.street,
            house: data.receiverAddress.house,
            appartament: data.receiverAddress.appartament,
            comment: data.receiverAddress.comment,
          },
          receiver: {
            firstname: data.receiver.firstname,
            lastname: data.receiver.lastname,
            middlename: data.receiver.middlename,
            phone: data.receiver.phone,
          },
          payer: data.payer,
          option: {
            id: data.option.id,
            price: data.option.price,
            days: data.option.days,
            name: data.option.name,
            type: data.option.type,
          },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      if (response.status === 400) {
        throw new Error('Не все поля заполнены.');
      }
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
