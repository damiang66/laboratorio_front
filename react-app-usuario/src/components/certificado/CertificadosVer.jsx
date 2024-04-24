import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleSheet } from '@react-pdf/renderer';
import React, { useEffect } from 'react'
import Swal from 'sweetalert2';

export const CertificadosVer = ({ isOpen, onClose, certificado }) => {
    const styles = StyleSheet.create({
        thhead:{
            color:'blue',
        }
    })
    useEffect(() => {
        console.log(certificado);
    }, [])
    if (!isOpen) return null;
    const reparacion = ()=>{
        Swal.fire('Pagina en Construccion', 'Esta seccion se Encuentra en desarrollo', 'success')
    }
    return (
        <div className="abrir-modal animacion fadeIn">
            <div className="modal " style={{ display: "block" }} tabIndex="-1">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                            
                            </h5>

                        </div>

                        <div className="modal-body">
                            <table class="table table-sm">
                                <thead>
                                    <tr>

                                        <th style={styles.thhead} scope="col">Nombre de Usuario</th>
                                        <th style={styles.thhead} scope="col">Nro de Documento</th>
                                       

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">{certificado?.cliente?.nombre}</th>

                                        <th scope="row">{certificado?.cliente?.dni}</th>
                                      
                                    </tr>
                                    <tr>
                                       
                                        <th style={styles.thhead} scope="col">imprimir Todo <FontAwesomeIcon  onClick={()=>reparacion()} icon={faPrint} /></th>
                                       
                                    </tr>

                                </tbody>
                                <tfooter>
                                    <tr>
                                    <th scope="col">Carnet <FontAwesomeIcon onClick={()=>reparacion()} icon={faPrint} /></th>
                                       
                                    
                                    </tr>
                                    <tr>
                                                                           
                                        <th scope="col">Certificado  <FontAwesomeIcon  onClick={()=>reparacion()} icon={faPrint} />  </th>
                                                                           
                                            </tr>
                                            <tr>
                                            <th scope="col">Certificado Medico <FontAwesomeIcon  onClick={()=>reparacion()} icon={faPrint} /></th>
                                            </tr>
                                </tfooter>
                            </table>
                            <button className="btn btn-danger" onClick={onClose}>cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
