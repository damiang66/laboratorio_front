import React, { useEffect } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useAuth } from '../auth/hooks/useAuth';
import { ClienteModalForm } from '../components/Cliente/ClienteModalForm';
import { ClienteList } from '../components/Cliente/ClienteList';
import { Button } from 'primereact/button';

export const ClienteListPage = () => {
  const {
    clientes,
    visibleForm,
    handlerOpenForm,
    getClientes,
} = useClientes();

const { login } = useAuth();;

useEffect(() => {
    getClientes();
}, []);

return (
    <>

        {!visibleForm ||
            <ClienteModalForm />}
        <div className="container my-4">
            <h2>Laboratorio app</h2>
            <div className="row">
                <div className="col">
                    {(visibleForm || !login.isAdmin) || 
                     <Button  onClick={handlerOpenForm} label="Nuevo Cliente" />
                   }

                    {
                        clientes.length === 0
                            ? <div className="alert alert-warning">No hay clientes en el sistema!</div>
                            : <ClienteList />
                    }
                </div>
            </div>
        </div>
    </>
);
}
