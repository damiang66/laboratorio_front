import { createSlice } from "@reduxjs/toolkit";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    isAdmin: false,
    isCopado: false,
    user: undefined,
}
export const authSlice = createSlice({
    name:'auth',
    initialState:initialLogin,
    reducers:{
        onLogin:(state,action)=>{
            state.isAuth= true;
            state.isAdmin= action.payload.isAdmin;
            state.isCopado= action.payload.isCopado;
            state.user= action.payload.user;
        },
        onLogout:(state,action)=>{
            state.isAuth=false;
            state.isAdmin=false;
            state.user=undefined;
            state.isCopado=false
        }
    }
})
export const {
    onLogin,
    onLogout
}=authSlice.actions;