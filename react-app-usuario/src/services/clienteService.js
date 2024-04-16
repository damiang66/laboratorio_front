import axios, { Axios } from "axios"
import { BASE_URL } from "../Url"

const url = `${BASE_URL}/clientes`

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}
export const CLienteFIndAll= async()=>{
    try {
     return await axios.get(url,config);   
    } catch (error) {
        return error;
    }

}
export const ClienteFindById = async(id)=>{
    try {
        return await axios.get(`${url}/${id}`,config());
    } catch (error) {
        return error;
    }
}
export const ClienteSave = async(cliente)=>{
    try {
        return await axios.post(url,cliente,config());
    } catch (error) {
        return error;
    }
}
export const ClienteUpdate = async(cliente)=>{
    try {
        return await axios.put(`${url}/${cliente.id}`,cliente,config());
    } catch (error) {
        return error;
    }
}
export const ClienteDelete = async(id)=>{
    try {
        return await axios.delete(`${url}/${cliente.id}`,config());
    } catch (error) {
        return error;
    }
}