import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useCertificados } from '../../hooks/useCertificados';
import { NavLink } from 'react-router-dom';
import CertificadoPDF from './CertificadoPdf';

export const CertificadoRow = ({id, certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto}) => {
  const { handlerCertificadoSelectedForm, handlerRemoveCertificados } = useCertificados();
  const { login } = useAuth();;
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
                  <td>
                      <NavLink
                      to={`/certificados/editar/${id}`}
                          type="button"
                          className="btn btn-secondary btn-sm"
                       
                      >
                          Editar
                      </NavLink>
                  </td>
                  <td>
                      <NavLink
                          type="button"
                          className="btn btn-success btn-sm"
                         to={"/certificados/imprimir/"+ id}
                      >
                          imprimir
                      </NavLink>
                    
                  </td>
                  
                 <td>
                      <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handlerRemoveCertificados(id)}
                      >
                          eliminar
                      </button>
                  </td>
              </>
          }
      </tr>
  )
}

