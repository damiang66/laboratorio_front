

import { UserRow } from "./UserRow"

import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { Button } from "primereact/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { UsuarioFindByNombre } from "../services/userService";

export const UsersList = () => {
    const[usuario,setUsuario]=useState({})
    const { user } = useSelector(state => state.auth);
    const { users } = useUsers();
    const { login } = useAuth();
    const navegar = useNavigate()
    const panel = ()=>{
navegar(`/panel/${usuario.id}`)
    }
    useEffect(()=>{
       traerUsuario(user.username)
        },[])
        const traerUsuario = async(nombre)=>{
            const resp = await UsuarioFindByNombre(nombre)
            console.log(resp);
setUsuario(resp.data)
        }
    return (
        <table className="table table-hover table-striped">
            <thead>
                <tr>
                    <th style={{width:"20%"}}>#</th>
                    <th style={{width:"30%"}}>Nombre de Usuario</th>
                    <th style={{width:"50%"}}>Email</th>
                    {!login.isCopado  || <>
                        <th style={{width:"5%"}}>Editar</th>
                        {/* <th>editar route</th> */}
                        <th style={{width:"5%"}}>Eliminar</th>
                    </>}
                </tr>
            </thead>
            <tbody>
                {
                    users.map(({ id, username, email, admin }) => (
                        <UserRow
                            key={id}
                            id={id}
                            username={username}
                            email={email}
                            admin={admin}
                        />
                    ))
                }
            </tbody>
            <Button 
          className="btn btn-primary mx-1 my-3"
            type="button" label="Panel de Usuario"   onClick={() => panel()} />
        </table>
        
    )
}