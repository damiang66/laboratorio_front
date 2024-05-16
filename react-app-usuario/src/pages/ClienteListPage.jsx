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
        <div className="p-4 bg-light bg-opacity-50"
         style={{width:"80vw",
         borderRadius:"0.5em"
     }}>
            <h2>Clientes</h2>
            <div className="row">
                <div className="col">
                    {(visibleForm || !login.isAdmin) || 
                     <Button  className='btn btn-primary m-1' onClick={handlerOpenForm} label="Nuevo Cliente" />
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
