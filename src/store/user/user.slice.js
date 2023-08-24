import { createSlice } from '@reduxjs/toolkit';

import { removeToken, setToken } from '../../Auth.js';
import { initialState } from './initialState.js';
import { getDeliveryHistory } from './thunks/getDeliveryHistory.js';
import { getSession } from './thunks/getSession.js';
import { sendPhone } from './thunks/sendPhone.js';
import { signIn } from './thunks/signIn.js';

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserPhone: (state, action) => {
      state.phone.phoneNum = action.payload;
    },
    setUserLocation: (state, action) => {
      state.location = action.payload;
    },
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
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
      state.userInfo._id = null;
      state.userInfo.firstname = null;
      state.userInfo.middlename = null;
      state.userInfo.lastname = null;
      state.userInfo.email = null;
      state.userInfo.city = null;
      state.userInfo.status = null;
      state.userInfo.error = null;
      removeToken();
      state.phone.phoneNum = null;
      state.phone.error = null;
      state.phone.status = null;
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
      state.phone.retryDelay = action.payload.retryDelay;
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
      state.token = action.payload.token;
      setToken(action.payload.token);
    },
    [signIn.rejected]: (state, action) => {
      state.otp.status = 'error';
      state.otp.error = action.payload;
    },

    [getSession.pending]: state => {
      state.userInfo.status = 'loading';
      state.userInfo.error = null;
    },
    [getSession.fulfilled]: (state, action) => {
      state.userInfo.status = 'resolved';
      state.userInfo._id = action.payload.user._id;
      state.userInfo.firstname = action.payload.user.firstname;
      state.userInfo.middlename = action.payload.user.middlename;
      state.userInfo.lastname = action.payload.user.lastname;
      state.userInfo.email = action.payload.user.email;
      state.userInfo.city = action.payload.user.city;
      state.userInfo.status = action.payload.user.status;

      state.phone.phoneNum = action.payload.user.phone;

      state.userInfo.error = null;
    },
    [getSession.rejected]: (state, action) => {
      state.otp.status = 'error';
      state.otp.error = action.payload;
    },

    [getDeliveryHistory.pending]: state => {
      state.deliveryHistory.status = 'loading';
      state.deliveryHistory.error = null;
    },
    [getDeliveryHistory.fulfilled]: (state, action) => {
      state.deliveryHistory.history = action.payload.orders;
      state.deliveryHistory.status = 'resolved';
    },
    [getDeliveryHistory.rejected]: (state, action) => {
      state.deliveryHistory.status = 'error';
      state.deliveryHistory.error = action.payload;
    },
  },
});

export const {
  setUserEmail,
  setUserName,
  setUserLocation,
  setUserPhone,
  setUserToken,
  removeUser,
  setCode,
  removeCode,
} = userSlice.actions;
export default userSlice.reducer;
