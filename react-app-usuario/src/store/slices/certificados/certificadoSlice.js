import { createSlice } from "@reduxjs/toolkit";
export const inititialCertificadoForm = {
    id: 0,
    certificadoNumero: '',
    fecha: '',
    ciudad: '',
    departamento: '',
    empresa:'',
    cliente:{},
    idCliente:0,
    usuario:0,
    coprologico:'',
    coproCultivo:'',
    cultivo:'',
    koh:'',
    diagnostico:'',
    concepto:''
}
const initialErrors = {
    certificadoNumero: '',
    fecha: '',
    ciudad: '',
    departamento: '',
    empresa:'',
   
    coprologico:'',
    coproCultivo:'',
    cultivo:'',
    koh:'',
    diagnostico:'',
    concepto:'',
}
export const certificadoSlice = createSlice({
    name: 'certificados',
    initialState:{
        certificados:[],
        certificadoSelected:inititialCertificadoForm,
        visibleForm:false,
        errors:initialErrors,
    },
    reducers:{
        addCertificados:(state,action)=>{
            state.certificados=[
                ...state.certificados,
                {
                    ...action.payload,
                }
            ];
            state.certificadoSelected=inititialCertificadoForm;
            state.visibleForm=false;
           
        },
        removeCertificados:(state,action)=>{
            state.certificados= state.certificados.filter(u=>u.id !== action.payload)
        },
        updateCertificados:(state,action)=>{
            state.certificados=state.certificados.map(u => {
                //console.log(u.password)
                if (u.id === action.payload.id) {
                    return {
                        ...action.payload,
                       
                    };
                }
             
                return u;
            })
            state.certificadoSelected=inititialCertificadoForm;
            state.visibleForm=false;
        },
        loadingCertificados:(state,action)=>{
            state.certificados = action.payload
        },
     
      
        onError:(state,action)=>{
          state.errors=action.payload  
        },
        onCertificadoSelectedForm:(state,action)=>{
            state.certificadoSelected= action.payload;
            state.visibleForm=true;
        },
        onOpenForm:(state)=>{
            state.visibleForm=true;
        },
        onCloseForm:(state)=>{
            state.visibleForm=false;
            state.certificadoSelected=inititialCertificadoForm;
        }

    }
   
});
export const {
    addCertificados,
    removeCertificados,
    updateCertificados,
    loadingCertificados,
    onCertificadoSelectedForm,
    onError,
    onOpenForm,
    onCloseForm,
    certificadoSelected,
    
}=certificadoSlice.actions;