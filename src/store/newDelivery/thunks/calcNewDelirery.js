import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const calcNewDelivery = createAsyncThunk(
  'newDelivery/calc',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/delivery/calc`, {
        method: 'POST',
        body: JSON.stringify({
          package: {
            length: data.pack.length,
            width: data.pack.width,
            weight: data.pack.weight,
            height: data.pack.height,
          },
          senderPoint: {
            latitude: data.senderPoint.latitude,
            longitude: data.senderPoint.longitude,
          },
          receiverPoint: {
            latitude: data.receiverPoint.latitude,
            longitude: data.receiverPoint.longitude,
          },
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
