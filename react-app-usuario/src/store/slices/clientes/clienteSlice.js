import { createSlice } from "@reduxjs/toolkit";
export const initialClienteForm = {
    id: 0,
    nombre: '',
    dni: '',
    edad: '',
    telefono: '',
    cargo:'',
    direccion:'',
    email:''
}
const initialErrors = {
    nombre: '',
    dni: '',
    email: '',
}
export const clienteSlice = createSlice({
    name: 'clientes',
    initialState:{
        clientes:[],
        clienteSelected:initialClienteForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addCliente:(state,action)=>{
            state.clientes=[
                ...state.clientes,
                {
                    ...action.payload,
                }
            ];
            state.clienteSelected=initialClienteForm;
            state.visibleForm=false;
           
        },
        removeCliente:(state,action)=>{
            state.clientes= state.clientes.filter(u=>u.id !== action.payload)
        },
        updateClientes:(state,action)=>{
            state.clientes=state.clientes.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.clienteSelected=initialClienteForm;
            state.visibleForm=false;
        },
        loadingClientes:(state,action)=>{
            state.clientes = action.payload
        },
     
      
        onError:(state,action)=>{
          state.errors=action.payload  
        }

    }
   
});
export const {
    addCliente,
    removeCliente,
    updateClientes,
    loadingClientes,
  
    onError,
    
}=clienteSlice.actions;