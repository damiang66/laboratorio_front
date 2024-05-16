
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
import { Calendar } from 'primereact/calendar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { ListBox } from "primereact/listbox";
import { Button } from "primereact/button";
import { ButtonGroup } from 'primereact/buttongroup'
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Card } from "primereact/card";

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
  const [cliente, setCliente] = useState({})
  const handleClienteChange = (event) => {

    const clienteId = event.value;
    console.log(clienteId.id);
    const clienteSeleccionado = clientes.find(cliente => cliente.id == clienteId.id);
    setClienteSeleccionado(clienteSeleccionado);
    setCertificadoForm({
      ...certificadoForm,
      idCliente: clienteId.id,
      usuario: usuarioData?.id
    });
  }
const estilos ={
  input:{
    with:'250px'
  }
  
}
  let clienteLista = [];
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
  const clientePorId = (id) => {
    clienteLista.forEach(c => {
      if (c.id == clienteId) {
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
  // este anda sacar el 1
  const handleClienteChange1 = (event) => {
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
        [name]: value,
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
        
        <Card role="region" className="m-2">
          <div className="card" style={{ backgroundColor: '#66B2FD' }}>
            <div className="card-body">
              <div  >

                <FloatLabel  >
                  <InputText name="certificadoNumero" id="username" value={certificadoForm.certificadoNumero} onChange={onInputChange} className="p-inputtext-lg"  style={{ fontSize: '20px', width: '100%' }}  />
                  <label for="username">Numero de Certificado</label>
                </FloatLabel>
                <p className="text-danger">{errors?.certificadoNumero}</p>
              </div>
            </div>

          </div>
        </Card>

        <Card role="region" className="m-2">
          <div className="card" style={{ backgroundColor: '#66B2FF' }}>
            {clienteSeleccionado.id && clienteSeleccionado != null && (
              <InputText value={clienteSeleccionado.nombre} type="text" className="p-inputtext-lg" />
            )}

            <div className="card-body">
              <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>Informacion personal</h5>


              <div style={{ display: 'flex', gap: '20px' }}>



                <div>
                  <FloatLabel>
                    <InputText name="ciudad" id="ciudad" value={certificadoForm.ciudad} onChange={onInputChange} />
                    <label htmlFor="ciudad">Ciudad</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.ciudad}</p>
                </div>
                <div>
                  <FloatLabel>
                    <InputText name="departamento" id="departamento" value={certificadoForm.departamento} onChange={onInputChange} />
                    <label htmlFor="departamento">Departamento</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.departamento}</p>
                </div>
                <Calendar style={{height:'75%'}} value={certificadoForm.fecha} onChange={onInputChange} name="fecha" showIcon />
                <p className="text-danger">{errors?.fecha}</p>
              </div>

              <div style={{ display: 'flex', gap: '20px' }}>

                <div>
                  <FloatLabel>
                    <InputText name="empresa" id="empresa" value={certificadoForm.empresa} onChange={onInputChange} />
                    <label htmlFor="empresa">Empresa</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.ciudad}</p>
                </div>
                {clienteId ? (
                  <input
                    className="form-control my-3 w-75"
                    disabled
                    name="idCliente"
                    value={cliente?.nombre}
                  />
                ) : (
                  <>
                    <ListBox
                      filter
                      name="idCliente"
                      value={clienteSeleccionado ? clienteSeleccionado.id : null}
                      onChange={handleClienteChange}
                      options={clientes}
                      optionLabel="nombre"
                      placeholder="Select Clientes"
                      style={{ maxHeight: '250px', borderRadius: '5px', border: '2px solid ' }}
                      listStyle={{ maxHeight: '150px' }} // Limita la altura de la lista desplegable
                      className="w-full md:w-14rem"
                    />
                  </>
                )}

              </div>

            </div>

          </div>

        </Card>

        <Card role="region" className="m-2" >
          <div className="card" style={{ backgroundColor: '#66B2FF' }}>
            <div className="card-body">
              <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>Laboratorio</h5>
              <div style={{ display: 'flex', gap: '80px', margin:'20px' }}>
                <div style={{marginLeft:'35px'}}>
                  <FloatLabel >
                    <InputText name="coprologico" id="coprologico" value={certificadoForm.coprologico} onChange={onInputChange} style={{ fontSize: '20px', width: '100%' }} />
                    <label htmlFor="coprologico">coprologico</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.coprologico}</p>
                </div>
                <div>
                  <FloatLabel>
                    <InputText name="coprocultivo" id="coprocultivo" value={certificadoForm.coprocultivo} onChange={onInputChange} style={{ fontSize: '20px', width: '100%' }} />
                    <label htmlFor="coprocultivo">coprocultivo</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.coprocultivo}</p>
                </div>
              
              </div>

              <div style={{ display: 'flex', gap: '80px', margin:'20px' }}>



                <div div style={{marginLeft:'35px'}}>
                  <FloatLabel >
                    <InputText name="cultivo" id="cultivo" value={certificadoForm.coprologico} onChange={onInputChange} style={{ fontSize: '20px', width: '100%' }} />
                    <label htmlFor="cultivo">cultivo nasogarinfeo</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.coprologico}</p>
                </div>
                <div>
                  <FloatLabel>
                    <InputText name="koh" id="koh" value={certificadoForm.koh} onChange={onInputChange} style={{ fontSize: '20px', width: '100%' }} />
                    <label htmlFor="koh">koh de uñas</label>
                  </FloatLabel>
                  <p className="text-danger">{errors?.koh}</p>
                </div>
              
              </div>

             

           
            </div>
          </div>
        </Card >

        <Card role="region" className="m-2">
          <div className="card" style={{ backgroundColor: '#66B2FF' }}>
            <div className="card-body">
            <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>Diagnostico</h5>
            
              <FloatLabel >
                    <InputText name="diagnostico" id="diagnostico" value={certificadoForm.diagnostico} onChange={onInputChange} style={{  fontSize: '20px', width: '100%' }} />
                    <label htmlFor="diagnostico">diagnostico</label>
                  </FloatLabel>
              <p className="text-danger">{errors?.diagnostico}</p>
            </div>
          </div>
        </Card>

        <div className="card m-2" style={{ backgroundColor: '#66B2FF' }}>
          <div className="card-body" style={{marginLeft:'50px'}}>
          <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 25 }}>concepto</h5>
            <select style={{marginLeft:'50px'}}
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
          <ButtonGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Button icon="pi pi-check" type="submit" className="btn btn-primary m-1" >
            {certificadoForm.id > 0 ? 'Editar' : 'Crear'}
          </Button>
          <NavLink

            type="button"
            to={'/certificados'}
          >
            <Button label="volver" severity="danger" icon="pi pi-times" className="btn btn-danger m-1" />

          </NavLink>
        </ButtonGroup>
        </div>

        <input type="hidden" name="id" value={certificadoForm.id} />
        <input type="hidden" name="usuario" value={certificadoForm.usuario} />

       





      </form >
    </>
  );
};
