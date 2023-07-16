import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const calcNewDelivery = createAsyncThunk(
  'newDelivery/calc',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://shift-backend.onrender.com/delivery/calc',
        {
          method: 'POST',
          body: JSON.stringify({
            package: {
              length: data.pack.length,
              width: data.pack.width,
              weight: data.pack.weight,
              height: data.pack.height,
            },
            senderPoint: {
              latitude: data.senderPoint.latitude,
              longitude: data.senderPoint.longitude,
            },
            receiverPoint: {
              latitude: data.receiverPoint.latitude,
              longitude: data.receiverPoint.longitude,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );

      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const sendDeliveryOrder = createAsyncThunk(
  'newDelivery/order',
  async function (data, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://shift-backend.onrender.com/delivery/order',
        {
          method: 'POST',
          body: JSON.stringify({
            senderPoint: {
              id: data.senderPoint.id,
              name: data.senderPoint.name,
              latitude: data.senderPoint.latitude,
              longitude: data.senderPoint.longitude,
            },
            senderAddress: {
              street: data.senderAddress.street,
              house: data.senderAddress.house,
              appartament: data.senderAddress.appartament,
              comment: data.senderAddress.comment,
            },
            sender: {
              firstname: data.sender.firstname,
              lastname: data.sender.lastname,
              middlename: data.sender.middlename,
              phone: data.sender.phone,
            },
            receiverPoint: {
              id: data.receiverPoint.id,
              name: data.receiverPoint.name,
              latitude: data.receiverPoint.latitude,
              longitude: data.receiverPoint.longitude,
            },
            receiverAddress: {
              street: data.receiverAddress.street,
              house: data.receiverAddress.house,
              appartament: data.receiverAddress.appartament,
              comment: data.receiverAddress.comment,
            },
            receiver: {
              firstname: data.receiver.firstname,
              lastname: data.receiver.lastname,
              middlename: data.receiver.middlename,
              phone: data.receiver.phone,
            },
            payer: data.payer,
            option: {
              id: data.option.id,
              price: data.option.price,
              days: data.option.days,
              name: data.option.name,
              type: data.option.type,
            },
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      if (response.status === 400) {
        throw new Error('Не все поля заполнены.');
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

export const getPoints = createAsyncThunk(
  'newDelivery/points',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://shift-backend.onrender.com/delivery/points'
      );
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getPackageTypes = createAsyncThunk(
  'newDelivery/packageTypes',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://shift-backend.onrender.com/delivery/package/types'
      );
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
  points: {
    points: null,
    status: null,
    error: null,
  },
  packageTypes: {
    packages: null,
    status: null,
    error: null,
  },

  package: {
    length: null,
    width: null,
    weight: null,
    height: null,
  },

  senderPoint: {
    id: null,
    name: null,
    latitude: null,
    longitude: null,
  },

  receiverPoint: {
    id: null,
    name: null,
    latitude: null,
    longitude: null,
  },

  receiver: {
    firstname: null,
    lastname: null,
    middlename: null,
    phone: null,
  },

  sender: {
    firstname: null,
    lastname: null,
    middlename: null,
    phone: null,
  },

  payer: 'RECEIVER',

  calc: {
    options: [],
    error: null,
    status: null,
  },

  order: {
    res: null,
    error: null,
    status: null,
  },

  senderAddress: {
    street: null,
    house: null,
    appartament: null,
    comment: null,
  },
  receiverAddress: {
    street: null,
    house: null,
    appartament: null,
    comment: null,
  },
  option: {
    id: null,
    price: null,
    days: null,
    name: null,
    type: null,
  },
};

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
