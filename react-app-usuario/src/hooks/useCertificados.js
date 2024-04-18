import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/hooks/useAuth";
import { CertificadosFindAll, CertificadoDelete, CertificadosSave, CertificadoUpdate } from "../services/certificadoService";
import { addCertificados, certificadoSelected, loadingCertificados, onCertificadoSelectedForm, onCloseForm, onError, onOpenForm, removeCertificados, updateCertificados } from "../store/slices/certificados/certificadoSlice";
import Swal from "sweetalert2";
const inicialCertificado = []
export const useCertificados = ()=>{
    const { certificados, errors, clienteSelected, visibleForm } = useSelector(state => state.certificados)
    const dispatch = useDispatch();




    const navigate = useNavigate();

    const { login, handlerLogout } = useAuth();

    const getCertificados = async () => {
        try {


            const result = await CertificadosFindAll ();
            console.log(result);
            dispatch(loadingCertificados(result.data));

        } catch (error) {

        }
    }

    const handlerAddCertificados = async (certificado) => {
        // console.log(user);

        if (!login.isAdmin) return;

        let response;
        try {
console.log(certificado.id);
            if ( certificado.id === undefined) {
                response = await CertificadosSave(certificado);
                dispatch(addCertificados(response.data))
            } else {
                response = await CertificadoUpdate(certificado);
                dispatch(updateCertificados(response.data))
            }



            Swal.fire(
                (certificado.id === undefined) ?
                    'Certificado Creado' :
                    'Certificado Actualizado',
                (certificado.id === undefined) ?
                    'El certificado ha sido creado con exito!' :
                    'El certificado ha sido actualizado con exito!',
                'success'
            );
            handlerCloseForm();
            navigate('/certificados');
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

    const handlerRemoveCertificados = (id) => {
        // console.log(id);

        if (!login.isAdmin) return;

        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: "Cuidado el  sera eliminado!",
            text: "Cuidado el certificado sera eliminado!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    await CertificadoDelete(id);
                    dispatch(removeCertificados(id));
                    Swal.fire(
                        'certificado Eliminado!',
                        'El certificado ha sido eliminado con exito!',
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

    const handlerCertificadoSelectedForm = (certificado) => {

        dispatch(onCertificadoSelectedForm({ ...certificado }))
    }

    const handlerOpenForm = () => {

        dispatch(onOpenForm())
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm())
        dispatch(onError({}));
    }




    return {
        certificados,

        inicialCertificado,
        handlerOpenForm,
        handlerCloseForm,
        visibleForm,
        certificadoSelected,

        errors,
        handlerAddCertificados,
        handlerRemoveCertificados,
        handlerCertificadoSelectedForm,
        getCertificados,
    }
}