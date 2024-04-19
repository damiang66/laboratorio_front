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

export const CertificadoForm = ({ certificadoSelected }) => {
  const {user}= useSelector(state=>state.auth)
  const { id } = useParams();
  const{getUsers,users}=useUsers()
  const { inicialCertificado, handlerAddCertificados, errors, handlerCloseForm } = useCertificados();
  const { clientes, getClientes } = useClientes();
  const [clienteSeleccionadoId, setClienteSeleccionadoId] = useState('');
  let usuario = JSON.stringify(sessionStorage.getItem('login'))
  const [clienteSeleccionado, setClienteSeleccionado] = useState({});
  const [certificadoForm, setCertificadoForm] = useState({
    ...inicialCertificado,
    cliente: {}, // Inicializamos el cliente como un objeto vacío
    
  });
const[u,setU]=useState({})
  useEffect(() => {
    // Actualizamos el estado del formulario cuando el certificado seleccionado cambie
    setCertificadoForm({
      ...certificadoSelected
    });
  }, [certificadoSelected]);

  useEffect(() => {
    // Actualizamos el estado del formulario con el cliente seleccionado
    setCertificadoForm(prevCertificadoForm => ({
      ...prevCertificadoForm,
      idCliente: clientes.find(c => c.id === clienteSeleccionadoId) || {} // Buscamos el cliente por su id
    }));
  }, [clienteSeleccionadoId, clientes]);

  useEffect(() => {
    // Obtenemos la lista de clientes al montar el componente
    getClientes();
    getUsers()
   
 // usuario = JSON.parse(usuario);
  
 usuario = user?.username
console.log(usuario); 
  traerUsuario(usuario);
 // console.log(u);
  }, []);
const traerUsuario = async (usuario)=>{
  try {
    const respuesta = await UsuarioFindByNombre(usuario);
    setU(respuesta?.data)
    
  } catch (error) {
    console.log(error);
  }
}
  const handleClienteChange = (event) => {
    
    const selectedClientId = event.target.value;
    const selectedClient = clientes.find(c => c.id === selectedClientId);
    setClienteSeleccionado(selectedClient || {}); // Actualizamos el cliente seleccionado
    setCertificadoForm({
      ...certificadoForm,
      idCliente: selectedClientId,// Actualizamos el cliente en el formulario
      usuario:u?.id
    });
  };
  

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setCertificadoForm({
      ...certificadoForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    //console.log(certificadoForm);
    console.log(u?.id);
  
   console.log(certificadoForm);
    handlerAddCertificados(certificadoForm);
    
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setCertificadoForm(inicialCertificado);
  };
  // imprimir en pdf
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
      <select
  id="cliente"
  className="form-control my-3 w-75"
  name="idCliente"
  value={clienteSeleccionado.id} // Asegúrate de pasar el ID del cliente seleccionado
  onChange={handleClienteChange}
>
      <option value="">Seleccione un Cliente</option>
  {clientes.map((c) => (
    <option key={c.id} value={c.id}>
      {c.nombre}
    </option>
  ))}
</select>
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
        <h5 className="card-title">Diagnositico</h5>
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
      </select>
      </div>
     </div>
      <input type="hidden"
        name="id"
        value={certificadoForm.id} />
         <input type="hidden"
        name="usuario"
        value={certificadoForm.usuario} />

      <button
        className="btn btn-primary"
        type="submit"
      >
        {certificadoForm.id > 0 ? 'Editar' : 'Crear'}
      </button>

     
         <NavLink
          className="btn btn-success mx-2"
          type="button"
         to={'/certificados'}
        >
          volver
        </NavLink>
        <button className="btn btn-success" type="button" onClick={printToPdf}>Imprimir a PDF</button>
    </form>
    </>
  );
};
