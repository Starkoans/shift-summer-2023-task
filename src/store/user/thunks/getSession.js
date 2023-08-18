import { createAsyncThunk } from '@reduxjs/toolkit';

import { isExpired } from '../../../Auth.js';
import { BASEURL } from '../../../Constants.js';

export const getSession = createAsyncThunk(
  'user/getSession',
  async function (token, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/users/session`, {
        method: 'GET',
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + token.value,
        },
      });

      if (isExpired(token.timeStamp)) {
        throw new Error('Token is expired.');
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
