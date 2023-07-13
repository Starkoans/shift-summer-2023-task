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

const initialState = {
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
};

const newDeliverySlice = createSlice({
  name: 'newDelivery',
  initialState,
  reducers: {
    setPackage: (state, action) => {
      state.package = action.payload;
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
    setReceiver: (state, action) => {
      state.receiver.firstname = action.payload.firstname;
      state.receiver.lastname = action.payload.lastname;
      state.receiver.middlename = action.payload.middlename;
      state.receiver.phone = action.payload.phone;
    },
    setPayer: (state, action) => {
      state.payer = action.payload;
    },
    setDeliveryOption: (state, action) => {
      state.option.id = action.payload.id;
      state.option.price = action.payload.price;
      state.option.days = action.payload.days;
      state.option.name = action.payload.name;
      state.option.type = action.payload.type;
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
  },
});

export const {
  setPackage,
  setReceiverPoint,
  setSenderPoint,
  setPayer,
  setReceiver,
  setSender,
  setDeliveryOption,
} = newDeliverySlice.actions;
export default newDeliverySlice.reducer;
