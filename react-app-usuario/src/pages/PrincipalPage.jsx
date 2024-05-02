import React, { useEffect } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useCertificados } from '../hooks/useCertificados';

export const PrincipalPage = () => {
  const {
    clientes,
   
    getClientes,
} = useClientes();
const {getCertificados,certificados} = useCertificados()
useEffect(()=>{
getCertificados();
getClientes();
},[])
  return (
<>

</>
  )
}
