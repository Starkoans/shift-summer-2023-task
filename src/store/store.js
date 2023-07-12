import { combineReducers, configureStore } from '@reduxjs/toolkit';

import newDeliveryReducer from './newDelivery.slice.js';
import userReducer from './user.slice.js';

const rootReducer = combineReducers({
  user: userReducer,
  newDelivery: newDeliveryReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
