import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const getPoints = createAsyncThunk(
  'newDelivery/points',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/delivery/points`);
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
