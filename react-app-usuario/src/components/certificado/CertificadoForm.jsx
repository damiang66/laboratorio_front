import React, { useState } from "react"
import imagen from '../../assets/formulario.png';

export const CertificadoForm = () => {
  // Estados para los valores de los campos
  const [parte1Campo1, setParte1Campo1] = useState('');
  const [parte1Campo2, setParte1Campo2] = useState('');
  const [parte1Campo3, setParte1Campo3] = useState('');
  const [parte2Campo1, setParte2Campo1] = useState('');
  const [parte2Campo2, setParte2Campo2] = useState('');
  const [parte2Campo3, setParte2Campo3] = useState('');
  const [parte3Campo1, setParte3Campo1] = useState('');
  const [parte3Campo2, setParte3Campo2] = useState('');
  const [parte3Campo3, setParte3Campo3] = useState('');

  return (
<div className="container-fluid mt-4">
      <div className="card">
        <div className="card-body">
        <img src={imagen} alt="" style={{ width: '100%', height: 'auto' }} />
        <input
                type="text"
                id="parte1Campo1"
                className="form-control m-2"
                value={parte1Campo1}
                onChange={(e) => setParte1Campo1(e.target.value)}
                placeholder="Numero de Certificado "
              />

          {/* Parte 1 */}
          <div className="mb-4">
          <h3 style={{backgroundColor: '#7bbda1'}} className="text-center bg-success text-white p-2 mb-3">Parte 1</h3>
            <div className="mb-3">
              <label htmlFor="parte1Campo1" className="form-label">Campo 1:</label>
              <input
                type="text"
                id="parte1Campo1"
                className="form-control"
                value={parte1Campo1}
                onChange={(e) => setParte1Campo1(e.target.value)}
                placeholder="Campo 1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte1Campo2" className="form-label">Campo 2:</label>
              <input
                type="text"
                id="parte1Campo2"
                className="form-control"
                value={parte1Campo2}
                onChange={(e) => setParte1Campo2(e.target.value)}
                placeholder="Campo 2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte1Campo3" className="form-label">Campo 3:</label>
              <input
                type="text"
                id="parte1Campo3"
                className="form-control"
                value={parte1Campo3}
                onChange={(e) => setParte1Campo3(e.target.value)}
                placeholder="Campo 3"
              />
            </div>
          </div>

          {/* Parte 2 */}
          <div className="mb-4">
          <h3 className="text-center bg-success text-white p-2 mb-3">Parte 2</h3>
            <div className="mb-3">
              <label htmlFor="parte2Campo1" className="form-label">Campo 1:</label>
              <input
                type="text"
                id="parte2Campo1"
                className="form-control"
                value={parte2Campo1}
                onChange={(e) => setParte2Campo1(e.target.value)}
                placeholder="Campo 1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte2Campo2" className="form-label">Campo 2:</label>
              <input
                type="text"
                id="parte2Campo2"
                className="form-control"
                value={parte2Campo2}
                onChange={(e) => setParte2Campo2(e.target.value)}
                placeholder="Campo 2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte2Campo3" className="form-label">Campo 3:</label>
              <input
                type="text"
                id="parte2Campo3"
                className="form-control"
                value={parte2Campo3}
                onChange={(e) => setParte2Campo3(e.target.value)}
                placeholder="Campo 3"
              />
            </div>
          </div>

          {/* Parte 3 */}
          <div>
          <h3 className="text-center bg-success text-white p-2 mb-3">Parte 3</h3>
            <div className="mb-3">
              <label htmlFor="parte3Campo1" className="form-label">Campo 1:</label>
              <input
                type="text"
                id="parte3Campo1"
                className="form-control"
                value={parte3Campo1}
                onChange={(e) => setParte3Campo1(e.target.value)}
                placeholder="Campo 1"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte3Campo2" className="form-label">Campo 2:</label>
              <input
                type="text"
                id="parte3Campo2"
                className="form-control"
                value={parte3Campo2}
                onChange={(e) => setParte3Campo2(e.target.value)}
                placeholder="Campo 2"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="parte3Campo3" className="form-label">Campo 3:</label>
              <input
                type="text"
                id="parte3Campo3"
                className="form-control"
                value={parte3Campo3}
                onChange={(e) => setParte3Campo3(e.target.value)}
                placeholder="Campo 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

 


