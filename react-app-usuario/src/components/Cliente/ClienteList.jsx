import React, { useState } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { ClienteRow } from './ClienteRow';

export const ClienteList = () => {
    const { clientes } = useClientes();
    const { login } = useAuth();
    
    const busqueda = () => {
        return clientes.filter(item => item.nombre.toLowerCase().includes(filtro.toLowerCase()));
      };
    const [filtro, setFiltro] = useState('');
   
    return (
        <>
        <input
        className="form-control my-3 w-75"
        type="text"
        placeholder="Buscar por nombre"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)} />
 
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
                        <th>Crear Certificado</th>
                        <th>eliminar</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                   busqueda().map(({ id, nombre, dni, edad,telefono,cargo,direccion,email }) => (
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
        </>
    )
}
