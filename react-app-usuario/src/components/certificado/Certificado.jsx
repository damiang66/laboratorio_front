import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Certificado = () => {
    const ir = useNavigate()
    useEffect(()=>{
ir('/certificados')
    },[])
  return (
    <div>cargando...</div>
  )
}
