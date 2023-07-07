import {combineReducers, configureStore} from "@reduxjs/toolkit";
import userReducer from "./user.slice.js";
import newDeliveryReducer from './newDelivery.slice.js'

//соединение редьюсеров
const rootReducer = combineReducers({
    user: userReducer,
    newDeliver:newDeliveryReducer

})

export const store = configureStore({
    reducer: rootReducer,

})