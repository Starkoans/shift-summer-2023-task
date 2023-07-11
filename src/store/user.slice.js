import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const sendPhone = createAsyncThunk(
  'user/sendPhone',
  async function (data, { rejectWithValue }) {
    try {
      const response = await (
        await fetch('https://shift-backend.onrender.com/auth/otp', {
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

const initialState = {
  id: null,
  token: null,
  username: null,
  email: null,
  otp: {
    code: null,
    error: null,
    status: null,
  },
  phone: {
    status: null,
    error: null,
    phoneNum: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPhone: (state, action) => {
      state.phone.phoneNum = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setCode: (state, action) => {
      state.otp.code = action.payload;
    },
    removeCode: state => {
      state.otp.code = null;
      state.otp.status = null;
      state.otp.error = null;
    },
    removeUser: state => {
      state.username = null;
      state.phone = null;
      state.token = null;
      state.email = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: {
    [sendPhone.pending]: state => {
      state.phone.status = 'loading';
      state.phone.error = null;
    },
    [sendPhone.fulfilled]: (state, action) => {
      state.phone.status = 'resolved';

      state.phone.code = action.payload;
    },
    [sendPhone.rejected]: (state, action) => {
      state.phone.status = 'error';
      state.phone.error = action.payload;
    },

    [signIn.pending]: state => {
      state.otp.status = 'loading';
      state.otp.error = null;
    },
    [signIn.fulfilled]: (state, action) => {
      state.otp.status = 'resolved';
      console.log(action.payload);
      state.id = action.payload.user._id;
      state.token = action.payload.token;
    },
    [signIn.rejected]: (state, action) => {
      state.otp.status = 'error';
      state.otp.error = action.payload;
    },
  },
});

export const {
  setUserEmail,
  setUserName,
  setUserPhone,
  setUserToken,
  removeUser,
  setCode,
  removeCode,
} = userSlice.actions;
export default userSlice.reducer;
