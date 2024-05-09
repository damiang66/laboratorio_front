import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import imagen from "../../assets/principal.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChartSimple,
  faHouseLock,
  faPlus,
  faStamp,
  faUser,
  faUserGroup,
  faVialVirus,
} from "@fortawesome/free-solid-svg-icons";
import { StyleSheet } from "@react-pdf/renderer";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { faHouseCircleCheck } from "@fortawesome/free-solid-svg-icons/faHouseCircleCheck";

export const Navbar = () => {
  const { login, handlerLogout } = useAuth();
  const [visible, setVisible] = useState(false);
  const styles = StyleSheet.create({
    imagen: {
      justifyContent: "flex-end",
    },
  });
  return (
    <>
      <Sidebar style={{  background:  '#3498db'}} visible={visible} onHide={() => setVisible(false)}>
        <div className="p-sidebar-header">
          <h2>Laboratorio</h2>
        </div>
        <div className="p-sidebar-content">
          <NavLink  onClick={() => setVisible(false)} className="nav-link" to="/users">
            <FontAwesomeIcon icon={faUser} />
            Usuarios
          </NavLink>
          {!login.isAdmin || (
            <NavLink onClick={() => setVisible(false)} className="nav-link" to="/clientes">
              <FontAwesomeIcon icon={faUserGroup} />
              Clientes
            </NavLink>
          )}
          {!login.isAdmin || (
            <NavLink  onClick={() => setVisible(false)} className="nav-link" to="/certificados">
              <FontAwesomeIcon icon={faStamp} />
              Certificados
            </NavLink>
          )}
          {!login.isCopado || (
            <NavLink  onClick={() => setVisible(false)} className="nav-link" to="/estadisticas">
              <FontAwesomeIcon icon={faChartSimple} />
              Estadisticas
            </NavLink>
          )}
          <div style={{margin:'20px', flex: 1,  position: "fixed", bottom: "10px", left: "20px"}}>
          <span className="nav-link text-primary mx-3">
            <FontAwesomeIcon icon={faUser} />
            {login.user?.username}
          </span>
          <FontAwesomeIcon icon={faHouseLock} onClick={handlerLogout} />
        </div>
        
        </div>
      </Sidebar>
      <Button
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
        style={{ position: "fixed", bottom: "750px", left: "20px" }}
      />
    </>
  );
};
