import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./slices/users/usersSlice";
import { authSlice } from "./slices/auth/authSlice";
import { clienteSlice } from "./slices/clientes/clienteSlice";
import { certificadoSlice } from "./slices/certificados/certificadoSlice";

export const store = configureStore({
    reducer:{
        users:userSlice.reducer,
        auth:authSlice.reducer,
        clientes:clienteSlice.reducer,
        certificados:certificadoSlice.reducer,
    }
})