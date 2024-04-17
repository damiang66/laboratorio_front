import React from 'react'
import { useClientes } from '../../hooks/useClientes';
import { ClienteForm } from './ClienteForm';

export const ClienteModalForm = () => {
    const { clienteSelected, handlerCloseForm } = useClientes();
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                {clienteSelected.id > 0 ? 'Editar' : 'Crear'} Modal Cliente
                            </h5>
                        </div>
                        <div className="modal-body">
                            <ClienteForm 
                                clienteSelected={clienteSelected}
                                handlerCloseForm={handlerCloseForm}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
