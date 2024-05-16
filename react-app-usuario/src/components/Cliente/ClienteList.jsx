import React, { useEffect, useState } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useAuth } from '../../auth/hooks/useAuth';
import { ClienteRow } from './ClienteRow';
import { CLientePaginar } from '../../services/clienteService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PaginadorPage } from '../../pages/PaginadorPage';

export const ClienteList = () => {
    const { clientes,getClientes } = useClientes();
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
                    <th>Nombre</th>
                    <th>DNI</th>
                    <th>Edad</th>
                    <th>Teléfono</th>
                    <th>Cargo</th>
                    <th>Dirección</th>
                    <th>Email</th>
                    
                    {!login.isAdmin || <>
                    
                        <th style={{textAlign:'center'}}>Editar</th>
                        <th style={{textAlign:'center'}}>Crear Certificado</th>
                        <th style={{textAlign:'center'}}>Eliminar</th>
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
        <div style={{height:'100%'}}>
  <PaginadorPage
    data={busqueda()}
    total={totalPages}
    currentPage={currentPage}
    setCurrentPage={setCurrentPage}
    style={{ color: 'black' }} // Ajusta el color del texto según sea necesario
  />
</div>
        </>
    )
}
