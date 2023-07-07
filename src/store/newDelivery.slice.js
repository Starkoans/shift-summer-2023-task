import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    package: {
        length: null,
        width: null,
        weight: null,
        height: null
    },

    senderPoint: {
        id:null,
        name:null,
        latitude: null,
        longitude: null
    },

    receiverPoint: {
        id:null,
        name:null,
        latitude: null,
        longitude: null
    },

    receiver: {
        firstname: null,
        lastname: null,
        middlename: null,
        phone: null
    },

    sender: {
        firstname: null,
        lastname: null,
        middlename: null,
        phone: null
    },

    payer: "RECEIVER",

    option: {
        id: null,
        price: null,
        days: null,
        name: null,
        type: null
    }
};

const newDeliverySlice = createSlice({
    name: "newDelivery",
    initialState,
    reducers :{
        setPackage:(state, action) => {
            state.package.length = action.payload.length;
            state.package.width = action.payload.width;
            state.package.weight = action.payload.weight;
            state.package.height = action.payload.height;

        },
        setSenderPoint:(state, action)=>{
            state.senderPoint.id = action.payload.id;
            state.senderPoint.name = action.payload.name;
            state.senderPoint.latitude = action.payload.latitude;
            state.senderPoint.longitude = action.payload.longitude;
        },
        setReceiverPoint:(state, action) => {
            state.receiverPoint.id = action.payload.id;
            state.receiverPoint.name = action.payload.name;
            state.receiverPoint.latitude = action.payload.latitude;
            state.receiverPoint.longitude = action.payload.longitude;
        },
        setSender:(state, action) => {
            state.sender.firstname = action.payload.firstname;
            state.sender.lastname = action.payload.lastname;
            state.sender.middlename = action.payload.middlename;
            state.sender.phone = action.payload.phone;
        },
        setReceiver:(state, action) => {
            state.receiver.firstname = action.payload.firstname;
            state.receiver.lastname = action.payload.lastname;
            state.receiver.middlename = action.payload.middlename;
            state.receiver.phone = action.payload.phone;
        },

        setDeliveryOption:(state, action) => {
            state.option.id = action.payload.id;
            state.option.price = action.payload.price;
            state.option.days = action.payload.days;
            state.option.name = action.payload.name;
            state.option.type = action.payload.type;
        },

    }
})

export const {
    setPackage,
    setReceiverPoint,
    setSenderPoint,
    setReceiver,
    setSender,
    setDeliveryOption} = newDeliverySlice.actions;
export default newDeliverySlice.reducer;