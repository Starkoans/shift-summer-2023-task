import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASEURL } from '../../../Constants.js';

export const sendPhone = createAsyncThunk(
  'user/sendPhone',
  async function (data, { rejectWithValue }) {
    try {
      const response = await (
        await fetch(`${BASEURL}/auth/otp`, {
          method: 'POST',
          body: JSON.stringify({
            phone: data,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
      ).json();

      if (!response.ok) {
        throw new Error(response.error);
      }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
