
import { NavLink } from "react-router-dom";

import { useAuth } from "../../auth/hooks/useAuth";
import imagen from '../../assets/principal.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faStamp, faUpRightAndDownLeftFromCenter, faUser, faUserGroup, faVialVirus } from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {

    const { login, handlerLogout } = useAuth();
    return (
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          
            <div className="container-fluid">
            <FontAwesomeIcon icon={faVialVirus} />
                
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
             
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/users">
                            <FontAwesomeIcon  icon={faUser} />
                               Usuarios
                            </NavLink>
                        </li>
                        {!login.isAdmin ||
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/clientes">
                                <FontAwesomeIcon icon={faUserGroup } />
                              Clientes
                                </NavLink>
                            </li>
                            
                        }
                        {!login.isAdmin ||
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/certificados">
                                <FontAwesomeIcon icon={faStamp} />
                                   Certificados
                                </NavLink>
                            </li>
                            
                        }
                    </ul>
                </div>
               
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavLogout">
                    <span className="nav-item nav-link text-primary mx-3">
                    <FontAwesomeIcon  icon={faUser} />
                        {login.user?.username}
                    </span>
                    <FontAwesomeIcon icon={faArrowLeft}  onClick={handlerLogout} />
                    
                </div>
            </div>
        
        </nav>
            <img src={imagen} alt="" />
            </>
    );
}