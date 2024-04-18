import React, { useEffect } from 'react'
import { useAuth } from '../auth/hooks/useAuth';
import { useCertificados } from '../hooks/useCertificados';
import { CertificadoModalForm } from '../components/certificado/CertificadoModalForm';
import { CertificadoList } from '../components/certificado/CertificadoList';
export const CertificadoListPage = () => {
  const {
    certificados,
    visibleForm,
    handlerOpenForm,
    getCertificados,
} = useCertificados();

const { login } = useAuth();;

useEffect(() => {
    getCertificados();
}, []);

return (
    <>

        {!visibleForm ||
            <CertificadoModalForm/>}
        <div className="container my-4">
            <h2>Laboratorio app</h2>
            <div className="row">
                <div className="col">
                    {(visibleForm || !login.isAdmin) || <button
                        className="btn btn-primary my-2"
                        onClick={handlerOpenForm}>
                        Nuevo Certificado
                    </button>}

                    {
                        certificados.length === 0
                            ? <div className="alert alert-warning">No hay certificados en el sistema!</div>
                            : <CertificadoList />
                    }
                </div>
            </div>
        </div>
    </>
);
}