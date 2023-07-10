import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const signIn = createAsyncThunk(
  'user/signIn',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://shift-backend.onrender.com/users/signin',
        {
          method: 'POST',
          body: JSON.stringify({
            phone: data.phone,
            code: data.code,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      console.log(data.code);
      // if (!response.ok) {
      //   throw new Error(response.error);
      // }
      if (response.status == 400) {
        throw new Error('Неверный пароль.');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  code: null,
  error: null,
  status: null,
};

const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    removeCode: state => {
      state.code = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [signIn.pending]: state => {
      state.status = 'loading';
      state.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.code = action.payload.code;
    },
    [signIn.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const { setCode, removeCode } = otpSlice.actions;
export default otpSlice.reducer;
