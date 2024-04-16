import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../components/layout/Navbar"
//import { UserProvider } from "../context/UserProvider"
import { RegisterPage } from "../pages/RegisterPage"
import { UsersPage } from "../pages/UsersPage"
import { useAuth } from "../auth/hooks/useAuth"
import { PrincipalPage } from "../pages/PrincipalPage"


export const UserRoutes = () => {
    const { login } = useAuth();;
    return (
        <>
            {/* <UserProvider> */}
                <Navbar />
                <Routes>
                    

                    {!login.isAdmin || <>
                        <Route path="paginaPrincipal" element={<PrincipalPage/>}/>
                        <Route path="users/register" element={<RegisterPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="users/edit/:id" element={<RegisterPage />} />
                    </>
                    }
                    <Route path="/" element={<Navigate to="/PaginaPrincipal" />} />
                </Routes>
            {/* </UserProvider> */}
        </>
    )
}