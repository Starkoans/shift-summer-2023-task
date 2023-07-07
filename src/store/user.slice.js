import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    phone: null,
    token:null,
    username:null,
    email:null
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers :{
        setUserPhone:(state, action) => {
            state.phone = action.payload;
           },
        setUserToken:(state, action)=>{
            state.token = action.payload;
        },
        setUserName:(state, action) => {
            state.username = action.payload;
        },
        setUserEmail:(state, action) => {
            state.email = action.payload;
        },

        removeUser:(state) => {
            state.username = null;
            state.phone = null;
            state.token = null;
            state.email = null;
        },
    }
})

export const {
    setUserEmail,
    setUserName,
    setUserPhone,
    setUserToken,
    removeUser} = userSlice.actions;
export default userSlice.reducer;