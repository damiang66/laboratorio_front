import React, { useState } from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useCertificados } from '../../hooks/useCertificados';
import { NavLink } from 'react-router-dom';
import CertificadoPDF from './CertificadoPdf';
import { faEye, faPen, faPrint, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CertificadosVer } from './CertificadosVer';

export const CertificadoRow = ({id, certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto}) => {
  const { handlerCertificadoSelectedForm, handlerRemoveCertificados,abrir,abrirModal,cerrar } = useCertificados();
  const { login } = useAuth();;
  const [isModalOpen, setIsModalOpen] = useState(false);
let certificado ={id, certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto};
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
      <tr>
          <td>{id}</td>
          <td>{certificadoNumero}</td>
          <td>{fecha}</td>
          <td>{ciudad}</td>
          <td>{departamento}</td>
          <td>{empresa}</td>
          <td>{cliente?.nombre}</td>
          <td>{diagnostico}</td>
          <td>{concepto}</td>
     

          {!login.isAdmin ||
              <>
                  <td style={{textAlign:'center'}}>
                      <NavLink
                      to={`/certificados/editar/${id}`}
                          type="button"
                          className="btn btn-secondary btn-sm"
                       
                      >
                            <FontAwesomeIcon icon={faPen} />
                      </NavLink>
                  </td>
                 
                  <td style={{textAlign:'center'}}>
                  <FontAwesomeIcon  onClick={openModal} icon={faEye} />
                  </td>
                 <td style={{textAlign:'center'}}>
                 <FontAwesomeIcon icon={faTrash} 
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handlerRemoveCertificados(id)}
                      />
                      <CertificadosVer isOpen={isModalOpen} onClose={closeModal} certificado={certificado} />   
                      
                  </td>
              </>
          }
      </tr>
  )
}

