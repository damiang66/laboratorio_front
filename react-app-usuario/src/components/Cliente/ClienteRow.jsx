import React from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCoffee, faDeleteLeft, faPen, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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
                    <td style={{textAlign:'center'}}>
                    <FontAwesomeIcon icon={faPen} 
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
                    />
                      
                    </td>
                    <td style={{textAlign:'center'}}> 
                    <NavLink
                           to={"/certificados/cliente/"+id}
                        >
                           <FontAwesomeIcon icon={faSquarePlus} />
                        </NavLink>
                    </td>
                   
                    <td style={{textAlign:'center'}}>
                    <FontAwesomeIcon className='btn btn-danger btn-sm' onClick={() => handlerRemoveCliente(id)} icon={faTrash} />
                      
                       
                    </td>
                </>
            }
        </tr>
    )
}
