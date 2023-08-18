import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const getDeliveryHistory = createAsyncThunk(
  'user/getDeliveryHistory',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/delivery/orders`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + data,
        },
      });
      if (response.status == 404) {
        throw new Error('Данные не найдены.');
      }
      if (!response.ok) {
        throw new Error(response.error);
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
