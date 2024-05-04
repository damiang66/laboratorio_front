import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Cliente = () => {
    const ir = useNavigate()
    useEffect(()=>{
ir('/clientes')
    },[])
  return (
    <div>cargando....</div>
  )
}
