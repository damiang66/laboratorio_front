

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
                    <th>#</th>
                    <th>Nombre de Usuario</th>
                    <th>email</th>
                 
                    {!login.isCopado  || <>
                        <th>editar</th>
                        <th>editar route</th>
                        <th>eliminar</th>
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
          
            type="button" label="Panel de Usuario" icon="pi pi-check"  onClick={() => panel()} />
        </table>
    )
}