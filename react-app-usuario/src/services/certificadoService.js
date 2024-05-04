import axios from "axios"
import { BASE_URL } from "../Url"

const url = `${BASE_URL}/certificados`

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const CertificadosFindAll = async ()=>{
    try {
        return await axios.get(url,config());
    } catch (error) {
        return error;
    }
}
export const CertificadosFindById = async(id)=>{
    try {
        return await axios.get(`${url}/${id}`,config()); 
    } catch (error) {
        return error;
    }
}
export const CertificadosSave = async(certificado)=>{
    console.log(certificado);
    
    try {
       return await axios.post(url,certificado,config()); 
    } catch (error) {
        throw error;
    }

}
export const CertificadoUpdate = async(certificado)=>{
    try {
        console.log('en el put de certificado ' + JSON.stringify(certificado) );
        return await axios.put(`${url}/${certificado.id}`,certificado,config()); 
    } catch (error) {
        throw error;
    }
}
export const CertificadoDelete = async ( id)=>{
    try {
        return await axios.delete(`${url}/${id}`,config()); 
        
    } catch (error) {
        throw error;
    }
}
export const CertificadoPaginar = async(page)=>{
    try {
        return await axios.get(`${url}/paginar/${page}`,config())
    } catch (error) {
        return error;
    }
}