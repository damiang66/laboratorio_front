import React from 'react'
import { useCertificados } from '../../hooks/useCertificados';
import { CertificadoForm } from './CertificadoForm';
export const CertificadoModalForm = () => {
    const { certificadoSelected, handlerCloseForm } = useCertificados();
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {certificadoSelected?.id > 0 ? 'Editar' : 'Crear'} Modal Certificados
                            </h5>
                        </div>
                        <div className="modal-body">
                            <CertificadoForm
                                certificadoSelected={certificadoSelected}
                                handlerCloseForm={handlerCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
