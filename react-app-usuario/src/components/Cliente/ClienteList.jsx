import React from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { ClienteRow } from './ClienteRow';

export const ClienteList = () => {
    const { clientes } = useClientes();
    const { login } = useAuth();
    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>nombre</th>
                    <th>dni</th>
                    <th>edad</th>
                    <th>telefono</th>
                    <th>cargo</th>
                    <th>direccion</th>
                    <th>email</th>
                    
                    {!login.isAdmin || <>
                        <th>editar</th>
                        
                        <th>eliminar</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    clientes.map(({ id, nombre, dni, edad,telefono,cargo,direccion,email }) => (
                        <ClienteRow
                            key={id}
                            id={id}
                            nombre={nombre}
                            dni={dni}
                            edad={edad}
                            telefono={telefono}
                            cargo={cargo}
                            direccion={direccion}
                            email={email}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}
