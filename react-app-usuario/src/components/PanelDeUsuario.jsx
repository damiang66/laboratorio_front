
import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UsuarioFindByid, Usuarioupdate } from '../services/userService'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import Swal from 'sweetalert2'
import { useAuth } from '../auth/hooks/useAuth'
import { useSelector } from 'react-redux'

export const PanelDeUsuario = () => {
    const { login, handlerLogout } = useAuth();
    const { user } = useSelector(state => state.auth);
    const navegar = useNavigate()
    const [usuario,setUsuario]=useState({})
    //const [value, setValue] = useState({});
    const {idUsuario}= useParams()
   useEffect(() => {
        traerUsuario(idUsuario)
    }, [])
    const traerUsuario = async(idUsuario)=>{
        try {
            const res = await UsuarioFindByid(idUsuario);
            const {id, username, email } = res.data; // Obtener solo los campos deseados
            setUsuario({ id, username, email, password: '' });
            if(res?.data?.username!==user?.username){
                Swal.fire('Permisos', 'Usted no tiene persmisos', 'warning')
                navegar('/users')
            }  
        } catch (error) {
            console.log(error);
            if (error.response.status==404){
                Swal.fire('No exite', 'No exite usuario', 'warning')
                navegar('/users')
            }
        }

     
      
       
    }
    const volver = ()=>{
        navegar("/users")
    }
    const cambiarPass = async ()=>{
        try {
            console.log(usuario);
         await Usuarioupdate(usuario);
         Swal.fire('Exito', 'Su datos se Editaron ', 'success'); 
         handlerLogout()

        } catch (error) {
            console.log(error);
        }
    }
    const onChangeInput =({target})=>{
const {name,value}=target;
setUsuario({
    ...usuario,
    [name]:value
})

    }
  return (
  <>
  <Card className="bg-light bg-opacity-50" style={{
  width: "30vw",
  marginTop: '100px',
  display: 'flex',
  justifyContent: 'center', // Centrado horizontal
  alignItems: 'center', // Centrado vertical
  
}}>
  <div className="p-inputgroup flex-1 m-2" >
    <span className="p-inputgroup-addon">
        <i className="pi pi-id-card"></i>
    </span>
    <InputText name='id' value={usuario.id} placeholder="id" disabled />
</div>
 <div className="p-inputgroup flex-1 m-2">
    <span className="p-inputgroup-addon">
        <i className="pi pi-user"></i>
    </span>
    <InputText name='username' value={usuario.username} onChange={onChangeInput} placeholder="Nombre de Usuario" />
</div>

<div className="p-inputgroup flex-1 m-2">
    <span className="p-inputgroup-addon">
        <i className="pi pi-lock"></i>
    </span>
    <InputText name='password' value={usuario.password}  onChange={onChangeInput}placeholder="Password" />
</div>
<div className="p-inputgroup flex-1 m-2">
    <span className="p-inputgroup-addon">
        <i className="pi pi-envelope"></i>
    </span>
    <InputText name='email' value={usuario.email} onChange={onChangeInput} placeholder="Email" />
</div>
<Button className="btn btn-primary m-2" type="button" label="Editar" icon="pi pi-check"  onClick={() => cambiarPass()} />
<Button className="btn btn-primary m-2" type="button" label="Volver" icon="pi pi-check"  onClick={() => volver()} />
</Card>
  




  </>
  )
}
