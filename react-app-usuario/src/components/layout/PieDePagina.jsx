import React from 'react';
import { Dock } from 'primereact/dock';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faFileCircleCheck, faSignOutAlt, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';
import { useSelector } from 'react-redux';

export const PieDePagina = () => {
  const { login, handlerLogout } = useAuth();
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const getDockItems = () => {
    let items = [];

    // Si es administrador, muestra todos los ítems
    if (login.isCopado) {
      items = [
        { label: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} />, command: () => { navigate("/users") } },
        { label: 'Clientes', icon: <FontAwesomeIcon icon={faUsers} />, command: () => { navigate("/clientes") } },
        { label: 'Certificados', icon: <FontAwesomeIcon icon={faFileCircleCheck} />, command: () => { navigate("/certificados") } },
        { label: 'Estadísticas', icon: <FontAwesomeIcon icon={faChartBar} />, command: () => { navigate("/estadisticas") } },
        { label: 'Cerrar Sesión', icon: <FontAwesomeIcon icon={faSignOutAlt} />, command: () => { handlerLogout() } }
      ];
    } else if (login.isAdmin){
      // Si no es administrador, muestra solo los ítems necesarios
      items = [
        { label: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} />, command: () => { navigate("/users") } },
        { label: 'Clientes', icon: <FontAwesomeIcon icon={faUsers} />, command: () => { navigate("/clientes") } },
        { label: 'Certificados', icon: <FontAwesomeIcon icon={faFileCircleCheck} />, command: () => { navigate("/certificados") } },
     
        { label: 'Cerrar Sesión', icon: <FontAwesomeIcon icon={faSignOutAlt} />, command: () => { handlerLogout() } }
      ];
    }else{
      items = [
      { label: 'Usuarios', icon: <FontAwesomeIcon icon={faUser} />, command: () => { navigate("/users") } },
      { label: 'Cerrar Sesión', icon: <FontAwesomeIcon icon={faSignOutAlt} />, command: () => { handlerLogout() } }
      ]
    }

    return items;
  };
const estilos ={
  position: 'fixed',
  top: 0,
  right: 0, // Cambia la posición a la izquierda
  width: '15%', // Ajusta el ancho al 15% de la pantalla
  height: '10%', // Ajusta la altura al 100% de la pantalla
  zIndex: 100, // Ajusta
}
  const dockContainerStyles = {
    position: 'fixed',
    top: 250,
    left: 0,
    width: '15%', // Ajusta el ancho al 100% de la pantalla
    height: '15%', // Ajusta la altura al 15% de la pantalla
    zIndex: 1000, // Ajusta el índice z según sea necesario
    backgroundColor: 'transparent', // Hace que el Dock sea transparente
    paddingLeft: '20px', // Agrega espacio izquierdo para evitar la superposición del contenido
   
  };

  return (
    <>
    <div style={estilos}>
    <span className="nav-link text-primary mx-3">
      <FontAwesomeIcon icon={faUser} />
      {' ' + login.user?.username}
    </span>
   
  </div>
    <div style={dockContainerStyles}>
      
      <Dock model={getDockItems()} position="left" />
    </div>
    </>
  );
};
