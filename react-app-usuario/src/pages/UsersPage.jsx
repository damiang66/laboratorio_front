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
            <div className="container my-4">
                <h2>Laboratorio App</h2>
                <div className="row">
                    <div className="col">
                        {(visibleForm || !login.isCopado) || 
                        <Button  onClick={handlerOpenForm} label="Nuevo usuario" />
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