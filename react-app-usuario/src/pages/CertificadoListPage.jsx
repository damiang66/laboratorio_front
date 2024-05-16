import React, { useEffect } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useCertificados } from '../hooks/useCertificados';
import { CertificadoModalForm } from '../components/certificado/CertificadoModalForm';
import { CertificadoList } from '../components/certificado/CertificadoList';
import { NavLink, useNavigate } from 'react-router-dom';
import { CertificadosVer } from '../components/certificado/CertificadosVer';
import { Button } from 'primereact/button';
export const CertificadoListPage = () => {
    const navegar = useNavigate()
  const {
    certificados,
    visibleForm,
    handlerOpenForm,
    getCertificados,
    abrir,
    cerrar,
    abrirModal
} = useCertificados();

const { login } = useAuth();;

useEffect(() => {
    getCertificados();
}, []);
const registrar = ()=>{
    navegar('/certificados/registrar')
}
return (
    <>

     
        <div className="p-4 bg-light bg-opacity-50"
            style={{width:"80vw",
                borderRadius:"0.5em"
            }}>
            <h2>Certificados</h2>
            <div className="row">
                <div className="col">
                <Button onClick={registrar} label="Nuevo Certificado" className='btn btn-primary m-1' >

</Button>
                    {
                        certificados?.length === 0
                            ? <div className="alert alert-warning">No hay certificados en el sistema!</div>
                            : <CertificadoList />
                    }
                </div>
            </div>
        </div>
    </>
);
}