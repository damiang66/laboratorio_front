import axios from "axios"
import { BASE_URL } from "../Url"

const url = `${BASE_URL}/usuarios`

const config = () => {
    return {
        headers: {
            "Authorization": sessionStorage.getItem('token'),
            "Content-Type": "application/json",
        }
    }
}

export const findAll = async() => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error(error);
    }
    return null;
}

export const save = async ({ username, email, password, admin,copado }) => {
    try {
        console.log(admin);
        return await axios.post(url, {
            username,
            email,
            password,
            admin,
            copado
        }, config());
    } catch (error) {
        throw error;
    }
}

export const update = async({ id, username, email, admin,copado }) => {
    console.log(admin);
    try {
        return await axios.put(`${url}/${id}`, {
            username,
            email,
            admin,
            copado
        }, config());
    } catch (error) {
        throw error;
    }
}

export const remove = async (id) => {
    try {
        await axios.delete(`${url}/${id}`, config());
    } catch (error) {
        throw error;
    }
}
export const UsuarioFindByNombre = async(nombre)=>{
    try {
        return await axios.get(`${url}/nombre/${nombre}`, config());
    } catch (error) {
        throw error;
    }
}