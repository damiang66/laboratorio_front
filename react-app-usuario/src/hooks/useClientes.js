import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { CLienteFIndAll, ClienteDelete, ClienteSave, ClienteUpdate } from "../services/clienteService";
import { addCliente, loadingClientes, onClienteSelectedForm, onCloseForm, onError, onOpenForm, removeCliente, updateClientes } from "../store/slices/clientes/clienteSlice";
import Swal from "sweetalert2";

const inicialCLiente = [];





export const useClientes = () => {

    const { clientes, errors, clienteSelected, visibleForm } = useSelector(state => state.clientes)
    const dispatch = useDispatch();




    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getClientes = async () => {
        try {


            const result = await CLienteFIndAll();
            console.log(result);
            dispatch(loadingClientes(result.data));

        } catch (error) {

        }
    }

    const handlerAddClientes = async (cliente) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {

            if (cliente.id === 0) {
                response = await ClienteSave(cliente);
                dispatch(addCliente(response.data))
            } else {
                response = await ClienteUpdate(cliente);
                dispatch(updateClientes(response.data))
            }



            Swal.fire(
                (cliente.id === 0) ?
                    'Cliente Creado' :
                    'Cliente Actualizado',
                (cliente.id === 0) ?
                    'El cliente ha sido creado con exito!' :
                    'El cliente ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/clientes');
        } catch (error) {
            if (error.response && error.response.status == 400) {
                dispatch(onError(error.response.data));

            } else if (error.response?.status == 401) {
                handlerLogout();
            } else {
                throw error;
            }
        }
    }

    const handlerRemoveCliente = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el cliente sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await ClienteDelete(id);
                    dispatch(removeCliente(id));
                    Swal.fire(
                        'Cliente Eliminado!',
                        'El Cliente ha sido eliminado con exito!',
                        'success'
                    );
                } catch (error) {
                    if (error.response?.status == 401) {
                        handlerLogout();
                    }
                }
            }
        })

    }

    const handlerClienteSelectedForm = (cliente) => {

        dispatch(onClienteSelectedForm({ ...cliente }))
    }

    const handlerOpenForm = () => {

        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(onError({}));
    }




    return {
        clientes,

        inicialCLiente,
        handlerOpenForm,
        handlerCloseForm,
        visibleForm,
        clienteSelected,

        errors,
        handlerAddClientes,
        handlerRemoveCliente,
        handlerClienteSelectedForm,
        getClientes,
    }
}
