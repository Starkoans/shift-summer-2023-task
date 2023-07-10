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
      console.log(response);
      if (!response.ok) {
        throw new Error(response.error);
      }

      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  phone: null,
  token: null,
  username: null,
  email: null,
  error: null,
  status: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPhone: (state, action) => {
      state.phone = action.payload;
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
      state.status = 'loading';
      state.error = null;
    },
    [sendPhone.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.code = action.payload;
    },
    [sendPhone.rejected]: (state, action) => {
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const {
  setUserEmail,
  setUserName,
  setUserPhone,
  setUserToken,
  removeUser,
} = userSlice.actions;
export default userSlice.reducer;
