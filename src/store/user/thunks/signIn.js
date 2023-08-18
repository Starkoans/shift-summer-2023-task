import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const signIn = createAsyncThunk(
  'user/signIn',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(`${BASEURL}/users/signin`, {
        method: 'POST',
        body: JSON.stringify({
          phone: data.phone,
          code: data.code,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });

      if (response.status == 400) {
        throw new Error('Неверный пароль.');
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
