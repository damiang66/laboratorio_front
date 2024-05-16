import { useContext, useEffect } from "react";
import { UserModalForm } from "../components/UserModalForm";
import { UsersList } from "../components/UsersList";

import { useUsers } from "../hooks/useUsers";
import { useAuth } from "../auth/hooks/useAuth";
import { Button } from "primereact/button";

export const UsersPage = () => {

    const {
        users,
        visibleForm,
        handlerOpenForm,
        getUsers,
    } = useUsers();

    const { login } = useAuth();;

    useEffect(() => {
        getUsers();
    }, []);
    
    return (
        <>

            {!visibleForm ||
                <UserModalForm />}
            <div className="p-4 bg-light bg-opacity-50"
            style={{width:"80vw",
                borderRadius:"0.5em"
            }}>
                <h2>Usuarios</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isCopado) || 
                        <Button className="btn btn-primary m-1" onClick={handlerOpenForm} label="Nuevo usuario" />
                       }

                        {
                            users.length === 0
                                ? <div className="alert alert-warning">No hay usuarios en el sistema!</div>
                                : <UsersList />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}