import { useContext, useState } from "react";
import Swal from "sweetalert2";

import { useAuth } from './../hooks/useAuth';
import imagen from '../../assets/principal.png'
import { StyleSheet } from "@react-pdf/renderer";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const initialLoginForm = {
    username: '',
    password: '',
}
export const LoginPage = () => {
const styles = StyleSheet.create({
    modal:{
        display: 'block', 
       
    },
    container :{
        position: 'relative',
        width: '100%',
        height: '300px', /* O ajusta la altura según sea necesario */
      },
      
       img: {
        position: 'absolute',
        bottom: 0,
        left: 0.,
        width: '100%,',
      }
})
    const { handlerLogin } = useAuth();;
    
    const [loginForm, setLoginForm] = useState(initialLoginForm);
    const { username, password } = loginForm;

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setLoginForm({
            ...loginForm,
            [ name ]: value,
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (!username || !password) {
            Swal.fire('Error de validacion', 'Username y password requeridos', 'error');
        }

        // aca implementamos el login
        handlerLogin({username, password});
        
        setLoginForm(initialLoginForm);
    }
    return (
        <div className="modal" style={ styles.modal } tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Laboratorio App</h5>
                    </div>
                    <form onSubmit={ onSubmit }>
                        <div className="modal-body">
                            <input
                                className="form-control my-3 w-75"
                                placeholder="Nombre de Usuario"
                                name="username"
                                value={username}
                                onChange={ onInputChange }
                            />
                            
                            <input
                                className="form-control my-3 w-75"
                                placeholder="Contraseña"
                                type="password"
                                name="password"
                                value={password}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                className="btn btn-primary"
                                type="submit">
                               <FontAwesomeIcon icon={faDoorOpen} />
                            </button>
                        </div>
                    </form>
                </div>
                <div style={styles.container}>
                <img style={styles.img} src={imagen} alt="" />
                </div>
                
            </div>
          
        </div>
    );

}