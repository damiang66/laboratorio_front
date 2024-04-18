import React from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { NavLink } from 'react-router-dom';

export const ClienteRow = ({id,nombre,dni,edad,telefono,cargo,direccion,email}) => {
    const { handlerClienteSelectedForm, handlerRemoveCliente } = useClientes();
    const { login } = useAuth();;
    return (
        <tr>
            <td>{id}</td>
            <td>{nombre}</td>
            <td>{dni}</td>
            <td>{edad}</td>
            <td>{telefono}</td>
            <td>{cargo}</td>
            <td>{direccion}</td>
            <td>{email}</td>
       

            {!login.isAdmin ||
                <>
                    <td>
                        <button
                            type="button"
                            className="btn btn-secondary btn-sm"
                            onClick={() => handlerClienteSelectedForm({
                                id,
                                nombre,
                                dni,
                                edad,
                                telefono,
                                cargo,
                                direccion,
                                email
                            })}
                        >
                            Editar
                        </button>
                    </td>
                    <td> 
                    <NavLink
                          
                            className="btn btn-danger btn-sm"
                           to={"/certificados/registrar"}
                        >
                            Crear Certificado
                        </NavLink>
                    </td>
                   
                    <td>
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handlerRemoveCliente(id)}
                        >
                            eliminar
                        </button>
                    </td>
                </>
            }
        </tr>
    )
}
