import { useContext, useState } from "react";
import Swal from "sweetalert2";


import { useAuth } from "./../hooks/useAuth";
import imagen from "../../assets/IPSBIO.jpeg";
import { StyleSheet } from "@react-pdf/renderer";


import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const initialLoginForm = {
  username: "",
  password: "",
};
export const LoginPage = () => {

  const { handlerLogin } = useAuth();

  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const { username, password } = loginForm;

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
  

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      Swal.fire(
        "Error de validacion",
        "Username y password requeridos",
        "error"
      );
    }

    // aca implementamos el login
    handlerLogin({ username, password });

    setLoginForm(initialLoginForm);
  };
  return (
    <div className="container"
    style={{ 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '7%',
        backgroundColor: '#fff',
        borderRadius: '0.3em',
        transform: 'scale(1.5)',
        transformOrigin: 'top left'
    }}>
      <h1 style={{
        color:"#444"
      }}
      >Jaiber Prada</h1>

      <p style={{
        color: "#666",
      }}>Microbiólogo de Alimentos</p>

      <section style={{
            marginBottom: '20px',
            backgroundColor: '#fff',
            padding: '20px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
        <form onSubmit={onSubmit}
        style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        }}>
          <div>
            <input
              placeholder="Nombre de Usuario"
              name="username"
              value={username}
              onChange={onInputChange}
              style={{
                padding:"10px",
                marginBottom: '15px',
                border:"1px solid #ddd",
                borderRadius:"0.5em",
                width:"calc(100% - 20px)",
              }}
            />
          </div>
          <div>
            <input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={password}
              onChange={onInputChange}
              style={{
                padding:"10px",
                marginBottom: '15px',
                border:"1px solid #ddd",
                borderRadius:"0.5em",
                width:"calc(100% - 20px)",
              }}
            />
          </div>

     
    
    

          <button type="submit"
          style={{
            backgroundColor: '#33d138',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '0.5em',
            border: 'none',
            cursor: 'pointer',
            width: '100%'
        }}>Iniciar sesión</button>
        </form>
        <img src={imagen} alt="" style={{
                width: '80%',
                height: 'auto'
            }} />
      </section>
    </div>
  );
};
