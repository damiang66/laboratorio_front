import axios from "axios";

export const loginUser = async ({username, password}) => {
    try {
         return await axios.post('http://ec2-3-136-20-214.us-east-2.compute.amazonaws.com:8080/login', {
        //   return await axios.post('http://localhost:8080/login', {
            username,
            password,
        });
    } catch (error) {
        throw error;
    }
}