import React, { useEffect, useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useCertificados } from '../../hooks/useCertificados';
import { CertificadoRow } from './CertificadoRow';
import { CertificadoPaginar } from '../../services/certificadoService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { PaginadorPage } from '../../pages/PaginadorPage';
export const CertificadoList = () => {
  const { certificados,getCertificados } = useCertificados();
  const { login } = useAuth();
  const [certificado,setCertificado]=useState([])
  
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

 
 useEffect(()=>{
  traerPaginacion()

 },[currentPage])
 const traerPaginacion = async()=>{
const respuesta = await CertificadoPaginar(currentPage);
setCertificado(respuesta.data.content);
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
        return certificado;
    }
    return certificados.filter(item => item?.cliente?.nombre.toLowerCase().includes(filtro.toLowerCase()));
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
                  <th>certificado Numero</th>
                  <th>fecha</th>
                  <th>ciudad</th>
                  <th>departamento</th>
                  <th>empresa</th>
                  <th>cliente</th>
                  <th>diagnostico</th>
                  <th>concepto</th>
                
                  
                  {!login.isAdmin || <>
                  
                      <th>editar</th>
                      
                      <th>Ver</th>
                      <th>eliminar</th>
                  </>}
              </tr>
          </thead>
          <tbody>
              {
                 busqueda()?.map(({ id, certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto}) => (
                      <CertificadoRow
                          key={id}
                          id={id}
                          certificadoNumero={certificadoNumero}
                          fecha={fecha}
                          ciudad={ciudad}
                          departamento={departamento}
                          empresa={empresa}
                          cliente={cliente}
                          coprologico={coprologico}
                          coproCultivo={coproCultivo}
                          cultivo={cultivo}
                          koh={koh}
                          diagnostico={diagnostico}
                          concepto={concepto}
                         

                      />
                  ))
              }
          </tbody>
        
      </table>
      <div style={{ zIndex: 1000, backgroundColor: 'transparent' }}>
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

