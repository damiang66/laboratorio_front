import React, { useEffect, useState } from 'react'
import { useClientes } from '../hooks/useClientes';
import { useParams } from 'react-router-dom';
import { ClienteForm } from '../components/Cliente/ClienteForm';

export const ClienteRegistroPage = () => {
    const { clientes = [], inicialCLiente } = useClientes();

    const [clienteSelected, setClienteSelected] = useState(inicialCLiente);

    const { id } = useParams();

    useEffect(() => {
        console.log(id);
        if (id) {
            const cliente = clientes.find(u => u.id == id) || inicialCLiente;
            setClienteSelected(cliente);
        }
    }, [id])

    return (
        <div className="container my-4">
            <h4>{ clienteSelected.id > 0 ? 'Editar' : 'Registrar'} cliente</h4>
            <div className="row">
                <div className="col">
                    <ClienteForm clienteSelected={clienteSelected} />
                </div>
            </div>
        </div>
    )
}