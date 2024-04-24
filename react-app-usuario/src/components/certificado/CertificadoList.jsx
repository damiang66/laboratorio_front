import React from 'react'
import { useAuth } from '../../auth/hooks/useAuth';
import { useCertificados } from '../../hooks/useCertificados';
import { CertificadoRow } from './CertificadoRow';
export const CertificadoList = () => {
  const { certificados } = useCertificados();
  const { login } = useAuth();
  
 

 
  return (
    <>

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
                 certificados.map(({ id, certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto}) => (
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
      </>
  )
}

