import { createSlice } from '@reduxjs/toolkit';

import { initialState } from './InitialState.js';
import { calcNewDelivery } from './thunks/calcNewDelirery.js';
import { getPackageTypes } from './thunks/getPackageTypes.js';
import { getPoints } from './thunks/getPoints.js';
import { sendDeliveryOrder } from './thunks/sendDeliveryOrder.js';

const newDeliverySlice = createSlice({
  name: 'newDelivery',
  initialState,
  reducers: {
    setPackage: (state, action) => {
      state.package.height = action.payload.height;
      state.package.width = action.payload.width;
      state.package.weight = action.payload.weight;
      state.package.length = action.payload.length;
    },
    setSenderPoint: (state, action) => {
      state.senderPoint.id = action.payload.id;
      state.senderPoint.name = action.payload.name;
      state.senderPoint.latitude = action.payload.latitude;
      state.senderPoint.longitude = action.payload.longitude;
    },
    setReceiverPoint: (state, action) => {
      state.receiverPoint.id = action.payload.id;
      state.receiverPoint.name = action.payload.name;
      state.receiverPoint.latitude = action.payload.latitude;
      state.receiverPoint.longitude = action.payload.longitude;
    },
    setSender: (state, action) => {
      state.sender.firstname = action.payload.firstname;
      state.sender.lastname = action.payload.lastname;
      state.sender.middlename = action.payload.middlename;
      state.sender.phone = action.payload.phone;
    },
    setOrderStatusClosed: state => {
      state.order.status = 'closed;';
    },
    setReceiver: (state, action) => {
      state.receiver.firstname = action.payload.firstname;
      state.receiver.lastname = action.payload.lastname;
      state.receiver.middlename = action.payload.middlename;
      state.receiver.phone = action.payload.phone;
    },
    setReceiverAddress: (state, action) => {
      state.receiverAddress = action.payload;
    },
    setSenderAddress: (state, action) => {
      state.senderAddress = action.payload;
    },
    setPayer: (state, action) => {
      state.payer = action.payload;
    },
    setDeliveryOption: (state, action) => {
      state.option = action.payload;
    },
  },
  extraReducers: {
    [calcNewDelivery.pending]: state => {
      state.calc.status = 'loading';
      state.calc.error = null;
    },
    [calcNewDelivery.fulfilled]: (state, action) => {
      state.calc.status = 'resolved';
      state.calc.options = action.payload.options;
    },
    [calcNewDelivery.rejected]: (state, action) => {
      state.calc.status = 'error';
      state.calc.error = action.payload;
    },

    [sendDeliveryOrder.pending]: state => {
      state.order.status = 'loading';
      state.order.error = null;
    },
    [sendDeliveryOrder.fulfilled]: (state, action) => {
      state.order.status = 'resolved';
      state.order.res = action.payload;
    },
    [sendDeliveryOrder.rejected]: (state, action) => {
      state.order.status = 'error';
      state.order.error = action.payload;
    },

    [getPoints.pending]: state => {
      state.points.status = 'loading';
      state.points.error = null;
    },
    [getPoints.fulfilled]: (state, action) => {
      state.points.status = 'resolved';
      state.points.points = action.payload.points;
    },
    [getPoints.rejected]: (state, action) => {
      state.points.status = 'error';
      state.points.error = action.payload;
    },

    [getPackageTypes.pending]: state => {
      state.packageTypes.status = 'loading';
      state.packageTypes.error = null;
    },
    [getPackageTypes.fulfilled]: (state, action) => {
      state.packageTypes.status = 'resolved';
      state.packageTypes.packages = action.payload.packages;
    },
    [getPackageTypes.rejected]: (state, action) => {
      state.packageTypes.status = 'error';
      state.packageTypes.error = action.payload;
    },
  },
});

export const {
  setPackage,
  setReceiverPoint,
  setSenderPoint,
  setPayer,
  setReceiver,
  setSender,
  setReceiverAddress,
  setSenderAddress,
  setDeliveryOption,
  setOrderStatusClosed,
} = newDeliverySlice.actions;
export default newDeliverySlice.reducer;
