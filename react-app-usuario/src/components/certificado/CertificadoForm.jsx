
import React, { useEffect, useRef, useState } from "react";
import { useCertificados } from '../../hooks/useCertificados';
import { useClientes } from "../../hooks/useClientes";
import { NavLink, useParams } from "react-router-dom";
import jsPDF from 'jspdf';
import html2canvas from "html2canvas";
import { useUsers } from "../../hooks/useUsers";
import { formToJSON } from "axios";
import { useSelector } from "react-redux";
import { UsuarioFindByNombre } from "../../services/userService";
import { ClienteFindById } from "../../services/clienteService";

export const CertificadoForm = ({ certificadoSelected }) => {
  const { user } = useSelector(state => state.auth);
  const { clienteId } = useParams();
  const { getUsers, users } = useUsers();
  const { inicialCertificado, handlerAddCertificados, errors, handlerCloseForm } = useCertificados();
  const { clientes, getClientes } = useClientes();
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState('');
  let usuario = JSON.stringify(sessionStorage.getItem('login'));
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  const [certificadoForm, setCertificadoForm] = useState({
    ...inicialCertificado,
  });
  const [usuarioData, setUsuarioData] = useState({});
  const [cliente,setCliente]=useState({})
let clienteLista=[];
  useEffect(() => {

   getClientes()
   clienteLista = clientes
    getUsers();
    usuario = user?.username;
    traerUsuario(usuario);
    if (clienteId) {
      console.log(clienteId);
      clientePorId(clienteId);
      setCertificadoForm({
        ...certificadoForm,
        idCliente: clienteId,
        usuario: usuarioData?.id
      });
    }
  }, []);
const clientePorId =(id)=>{
clienteLista.forEach(c=>{
  if(c.id== clienteId){
    setCliente(c);
  }
})
 console.log(cliente);
}
  const traerUsuario = async (usuario) => {
    try {
      const respuesta = await UsuarioFindByNombre(usuario);
      setUsuarioData(respuesta?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCertificadoForm({
      ...certificadoSelected
    });
  }, [certificadoSelected]);

  useEffect(() => {
    setCertificadoForm(prevCertificadoForm => ({
      ...prevCertificadoForm,
      idCliente: clientes.find(c => c.id === clienteSeleccionadoId) || {},
      usuario: usuarioData?.id
    }));
  }, [clienteSeleccionadoId, clientes]);

  const handleClienteChange = (event) => {
    const selectedClientId = event.target.value;
    const selectedClient = clientes.find(c => c.id === selectedClientId);
    setClienteSeleccionado(selectedClient || {});
    setCertificadoForm({
      ...certificadoForm,
      idCliente: selectedClientId,
      usuario: usuarioData?.id
    });
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setCertificadoForm({
      ...certificadoForm,
      [name]: value,
    });
    if (clienteId) {
      setCertificadoForm({
        ...certificadoForm,
        [name]:value,
        idCliente: clienteId,
        usuario: usuarioData?.id
      });
    }
  };

  const onSubmit = (event) => {
 //   console.log(cliente);
    event.preventDefault();
    console.log(certificadoForm);
    handlerAddCertificados(certificadoForm)
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setCertificadoForm(inicialCertificado);
  };

  const contentRef = useRef(null);

  const printToPdf = () => {
    const content = contentRef.current;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("screenshot.pdf");
    });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="certificadoNumero" className="form-label">Numero Certificado</label>
        <input
          className="form-control my-3 w-75"
          placeholder="Numero Certificado"
          name="certificadoNumero"
          id="certificadoNumero"
          value={certificadoForm.certificadoNumero}
          onChange={onInputChange} />
        <p className="text-danger">{errors?.certificadoNumero}</p>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Informacion personal</h5>
            <label htmlFor="fecha" className="form-label">Fecha</label>
            <input
              type="date"
              className="form-control my-3 w-75"
              placeholder="fecha"
              name="fecha"
              id="fecha"
              value={certificadoForm.fecha}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.fecha}</p>
            <label htmlFor="ciudad" className="form-label">Ciudad</label>
            <input
              type="text"
              className="form-control my-3 w-75"
              placeholder="ciudad"
              name="ciudad"
              id="ciudad"
              value={certificadoForm.ciudad}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.ciudad}</p>

            <label htmlFor="departamento" className="form-label">Departamento</label>
            <input
              className="form-control my-3 w-75"
              placeholder="departamento"
              name="departamento"
              id="departamento"
              value={certificadoForm.departamento}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.departamento}</p>

            <label htmlFor="empresa" className="form-label">Empresa</label>
            <input
              className="form-control my-3 w-75"
              placeholder="empresa"
              name="empresa"
              id="empresa"
              value={certificadoForm.empresa}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.empresa}</p>

            {clienteId ? (
              <input
                className="form-control my-3 w-75"
                disabled
                name="idCliente"
                value={cliente?.nombre}
              />
            ) : (
              <select
                id="cliente"
                className="form-control my-3 w-75"
                name="idCliente"
                value={clienteSeleccionado.id}
                onChange={handleClienteChange}
              >
                <option value="">Seleccione un Cliente</option>
                {clientes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Laboratorios</h5>
            <label htmlFor="coprologico" className="form-label">coprologico</label>
            <input
              className="form-control my-3 w-75"
              placeholder="coprologico"
              name="coprologico"
              id="coprologico"
              value={certificadoForm.coprologico}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.coprologico}</p>

            <label htmlFor="coproCultivo" className="form-label">coprocultivo</label>
            <input
              className="form-control my-3 w-75"
              placeholder="coproCultivo"
              name="coproCultivo"
              id="coproCultivo"
              value={certificadoForm.coproCultivo}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.coproCultivo}</p>

            <label htmlFor="cultivo" className="form-label">cultivo nasogarinfeo</label>
            <input
              className="form-control my-3 w-75"
              placeholder="cultivo"
              name="cultivo"
              id="cultivo"
              value={certificadoForm.cultivo}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.cultivo}</p>

            <label htmlFor="koh" className="form-label">koh de uñas</label>
            <input
              className="form-control my-3 w-75"
              placeholder="koh"
              name="koh"
              id="koh"
              value={certificadoForm.koh}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.koh}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Diagnóstico</h5>
            <label htmlFor="diagnostico" className="form-label">diagnostico</label>
            <input
              className="form-control my-3 w-75"
              placeholder="diagnostico"
              name="diagnostico"
              id="diagnostico"
              value={certificadoForm.diagnostico}
              onChange={onInputChange} />
            <p className="text-danger">{errors?.diagnostico}</p>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Concepto</h5>
            <select
              name="concepto"
              value={certificadoForm.concepto}
              onChange={onInputChange}
              className="form-select my-3 w-75"
              aria-label="Default select example">
              <option value="">Seleccione concepto</option>
              <option value="Apto sin restriccion">Apto sin restriccion</option>
              <option value="Apto con restriccion que no interfieren en la labor">Apto con restriccion que no interfieren en la labor</option>
              <option value="Apto para trabajar en alturas">Apto para trabajar en alturas</option>
              <option value="Apto para manipulacion de alimentos">Apto para manipulacion de alimentos"</option>
              <option value="Examen de retiro satisfactorio">Examen de retiro satisfactorio</option>
              <option value="Examen de retiro no satisfactorio">Examen de retiro no satisfactorio</option>
              <option value="Apto con restriccion que no interfieren en la labor 1">Apto con restriccion que no interfieren en la labor 1</option>
              <option value="Aplazado">Aplazado</option>
            </select>
          </div>
        </div>

        <input type="hidden" name="id" value={certificadoForm.id} />
        <input type="hidden" name="usuario" value={certificadoForm.usuario} />

        <button className="btn btn-primary" type="submit">
          {certificadoForm.id > 0 ? 'Editar' : 'Crear'}
        </button>

        <NavLink
          className="btn btn-success mx-2"
          type="button"
          to={'/certificados'}
        >
          volver
        </NavLink>

      
      </form>
    </>
  );
};
