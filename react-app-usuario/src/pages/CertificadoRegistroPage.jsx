import React, { useEffect, useState } from 'react'
import { useCertificados } from '../hooks/useCertificados';
import { useParams } from 'react-router-dom';
import { CertificadoForm } from '../components/certificado/CertificadoForm';
export const CertificadoRegistroPage = () => {
  const { certificados = [], inicialCertificado } = useCertificados();

  const [certificadoSelected, setCertificadoSelected] = useState(inicialCertificado);

  const { id } = useParams();

  useEffect(() => {
      console.log(id);
      if (id) {
        console.log(certificados);
          const certificado = certificados.find(u => u.id == id) || inicialCertificado;
          console.log(certificado);
          setCertificadoSelected(certificado);
      }
  }, [id])

  return (
      <div className="container my-4">
         
          <h4 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>{ certificadoSelected.id > 0 ? 'Editar' : 'Registrar'} Certificado</h4>
          <div className="row">
              <div className="col">
                  <CertificadoForm 
                  certificadoSelected={certificadoSelected} />
              </div>
          </div>
      </div>
  )
}
