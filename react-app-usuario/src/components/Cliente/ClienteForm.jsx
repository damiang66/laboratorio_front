import React, { useEffect, useState } from 'react'
import { useClientes } from '../../hooks/useClientes';
import { useNavigate } from 'react-router-dom';


export const ClienteForm = ({clienteSelected}) => {
    const { inicialCLiente, handlerAddClientes, errors,handlerCloseForm } = useClientes();
    const navegate = useNavigate();
    const [clienteForm, setClienteForm] = useState(inicialCLiente);
   // const [checked, setChecked] = useState(userForm.admin);
    const { id, nombre, dni, edad, telefono,cargo,direccion,email } = clienteForm;

    useEffect(() => {
        setClienteForm({
            ...clienteSelected,
          
        });
    }, [clienteSelected]);

    const onInputChange = ({ target }) => {
        // console.log(target.value)
        const { name, value } = target;
        setClienteForm({
            ...clienteForm,
            [name]: value,
        })
    }

   

    const onSubmit = (event) => {
        event.preventDefault();
        // if (!username || (!password && id === 0) || !email) {
        //     Swal.fire(
        //         'Error de validacion',
        //         'Debe completar los campos del formulario!',
        //         'error'
        //     );

        //     return;
        // }
        // if (!email.includes('@')) {
        //     Swal.fire(
        //         'Error de validacion email',
        //         'El email debe ser valido, incluir un @!',
        //         'error'
        //     );
        //     return;
        // }
        // console.log(userForm);

        // guardar el user form en el listado de usuarios
        handlerAddClientes(clienteForm);
        navegate('/clienteAyuda')
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setClienteForm(inicialCLiente);
    }
    return (
        <form onSubmit={ onSubmit }>
            <input
                className="form-control my-3 w-75"
                placeholder="Nombre y Apellido"
                name="nombre"
                value={ nombre}
                onChange={onInputChange} />
            <p className="text-danger">{ errors?.nombre}</p>
            
            { id > 0 || <input
                className="form-control my-3 w-75"
                placeholder="DNI"
                type="text"
                name="dni"
                value={dni}
                onChange={onInputChange} />}
            <p className="text-danger">{errors?.dni}</p>
            
            <input
                className="form-control my-3 w-75"
                placeholder="Email"
                name="email"
                value={email}
                onChange={onInputChange} />
            <p className="text-danger">{errors?.email}</p>
            <input
                className="form-control my-3 w-75"
                placeholder="Edad"
                name="edad"
                value={edad}
                onChange={onInputChange} />
                 <input
                className="form-control my-3 w-75"
                placeholder="Teléfono"
                name="telefono"
                value={telefono}
                onChange={onInputChange} />
                 <input
                className="form-control my-3 w-75"
                placeholder="Cargo"
                name="cargo"
                value={cargo}
                onChange={onInputChange} />
             <input
                className="form-control my-3 w-75"
                placeholder="Dirección"
                name="direccion"
                value={direccion}
                onChange={onInputChange} />

            <input type="hidden"
                name="id"
                value={id} />
            
            <button
                className="btn btn-primary"
                type="submit">
                {id > 0 ? 'Editar' : 'Crear'}
            </button>

            {!handlerCloseForm || <button
                className="btn btn-primary mx-2"
                type="button"
                onClick={() => onCloseForm()}>
                Cerrar
            </button>}
            
        </form>
    )
}
