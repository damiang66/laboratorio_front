import axios from "axios"
import { BASE_URL } from "../Url"

const url = `${BASE_URL}/api/pdf`;
export const generarPDF = async (id) => {
    try {
     // const response = await axios.post(`${url}/${id}`, { responseType: 'arraybuffer' });
    const response = await axios.get(`${url}/generar/${id}`, { responseType: 'arraybuffer' });
   //  const response = await axios.get(`${url}/generar`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  export const generarPDFCarnet = async (id) => {
    try {
     // const response = await axios.post(`${url}/${id}`, { responseType: 'arraybuffer' });
    const response = await axios.get(`${url}/carnet/${id}`, { responseType: 'arraybuffer' });
   //  const response = await axios.get(`${url}/generar`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };
  export const generarPDFMedico = async (id) => {
    try {
     // const response = await axios.post(`${url}/${id}`, { responseType: 'arraybuffer' });
    const response = await axios.get(`${url}/medico/${id}`, { responseType: 'arraybuffer' });
   //  const response = await axios.get(`${url}/generar`, { responseType: 'arraybuffer' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };