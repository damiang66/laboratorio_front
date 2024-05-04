import React, { useEffect, useState } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { ClienteRow } from './ClienteRow';
import { CLientePaginar } from '../../services/clienteService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export const ClienteList = () => {
    const { clientes } = useClientes();
    const { login } = useAuth();
    const [filtro, setFiltro] = useState('');
    const [cliente,setCliente]=useState([])
  
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
  
   
   useEffect(()=>{
    traerPaginacion()

   },[currentPage])
   const traerPaginacion = async()=>{
 const respuesta = await CLientePaginar(currentPage);
 setCliente(respuesta.data.content);
 setTotalPages(respuesta.data.totalPages)
   }
   const nextPage = () => {
    if (currentPage < totalPages - 1) {
        setCurrentPage(currentPage + 1);
    }
};

const prevPage = () => {
    if (currentPage > 0) {
        setCurrentPage(currentPage - 1);
    }
};
const busqueda = () => {
    if(filtro.length===0){
        return cliente;
    }
    return clientes.filter(item => item.nombre.toLowerCase().includes(filtro.toLowerCase()));
  };

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
                 <FontAwesomeIcon className='btn btn-primary btn-sm' onClick={prevPage} disabled={currentPage === 0} icon={faArrowLeft} />
            <FontAwesomeIcon className='btn btn-primary btn-sm' onClick={nextPage} disabled={currentPage === totalPages - 1} icon={faArrowRight} />
            </tbody>
           
           
        </table>
      
        </>
    )
}
