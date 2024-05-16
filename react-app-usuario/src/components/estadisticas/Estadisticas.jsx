import React, { useEffect, useState } from "react";
import {
  XYPlot,
  VerticalBarSeries,
  XAxis,
  YAxis,
  LabelSeries,
} from "react-vis";
import { findAll } from "../../services/userService";
import { CertificadosFindAll } from "../../services/certificadoService";
import {
  Document,
  PDFDownloadLink,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import axios from "axios";
import { Calendar } from "primereact/calendar";

export const Estadisticas = () => {
  reportes: {
    certificados: [];
    desde: "";
    hasta: "";
  }
  const [reporte, setReporte] = useState({});
  const [data, setData] = useState([]);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [pdfData, setPdfData] = useState(null);
  const [certificados, setCertificados] = useState([]);
  const onChangeFecha = (event) => {
    const { name, value } = event.target;
    if (name === "desde") {
      setDesde(value);
    } else {
      setHasta(value);
    }
  };
  const fechas = async () => {
    try {
      // Obtener usuarios
      const usersResponse = await findAll();
      const users = usersResponse.data;
      console.log(users);
      // Obtener certificados
      const certificatesResponse = await CertificadosFindAll();
      const certificates = certificatesResponse.data;
      setCertificados(certificates);

      // Filtrar certificados por fecha si ambos campos están seleccionados
      let filteredCertificates = certificates;
      if (desde && hasta) {
        filteredCertificates = certificates.filter(
          (certificado) =>
            certificado.fecha >= desde && certificado.fecha <= hasta
        );
        setCertificados(filteredCertificates);
      }

      // Contar el número de certificados por usuario
      const certificadosPorUsuario = users.map((usuario) => {
        const certificadosUsuario = filteredCertificates.filter(
          (certificado) => certificado.usuario === usuario.id
        );
        return { x: usuario.username, y: certificadosUsuario.length };
      });

      setData(certificadosPorUsuario);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const buscarPorFecha = () => {
    const respuesta = fechas();
    console.log(respuesta);
  };
  const todos = () => {
    fetchData();
  };
  const fetchData = async () => {
    try {
      // Obtener usuarios
      const usersResponse = await findAll();
      const users = usersResponse.data;
      console.log(users);
      // Obtener certificados
      const certificatesResponse = await CertificadosFindAll();
      const certificates = certificatesResponse.data;
      setCertificados(certificates);

      // Contar el número de certificados por usuario
      const certificadosPorUsuario = users.map((usuario) => {
        const certificadosUsuario = certificates.filter(
          (certificado) => certificado.usuario === usuario.id
        );
        return { x: usuario.username, y: certificadosUsuario.length };
      });

      setData(certificadosPorUsuario);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const pdf = () => {
    generarPDF();
  };
  const generarPDF = async () => {
    // Formatear las fechas si es necesario
    try {
      setReporte({
        ...reporte,
        certificados: certificados,
        desde: desde,
        hasta: hasta,
      });
      console.log(certificados);
      const url = "http://localhost:8080/reportes/generar-pdf";
      const response = await axios.post(
        url,
        { certificados, desde, hasta },
        { responseType: "arraybuffer" }
      );
      const blob = new Blob([response.data], { type: "application/pdf" });
      const urlPdf = window.URL.createObjectURL(blob);
      window.open(urlPdf); // Abre el PDF en una nueva pestaña
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <div
      className="p-4 bg-light bg-opacity-50"
      style={{
        width: "60vw",
        borderRadius: "0.5em",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h2>Certificados realizados por Empleado</h2>
      <div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlInput1"
            className="form-label"
            style={{ marginRight: "12px" }}
          >
            Desde
          </label>

          <Calendar
            value={desde}
            onChange={onChangeFecha}
            name="desde"
            showIcon
          />
        </div>
        <div className="mb-3">
          <label
            htmlFor="exampleFormControlTextarea1"
            className="form-label"
            style={{ marginRight: "15px" }}
          >
            Hasta
          </label>
          <Calendar
            value={hasta}
            onChange={onChangeFecha}
            name="hasta"
            showIcon
          />
        </div>
        <div className="mb-3">
          <button className="btn btn-success m-2" onClick={buscarPorFecha}>
            Buscar por Fecha
          </button>
          <button className="btn btn-success m-2" onClick={todos}>
            Todos
          </button>

          <button className="btn btn-primary m-2" onClick={pdf}>
            Exportar a PDF
          </button>
        </div>
      </div>
      <div style={{display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
      <XYPlot xType="ordinal" width={400} height={300}>
        <VerticalBarSeries data={data} />
        <XAxis />
        <YAxis />
        <LabelSeries
          data={data.map((d) => ({ ...d, label: d.y.toString() }))}
        />
      </XYPlot>
      {pdfData && (
        <PDFDownloadLink document={pdfData} fileName="estadisticas.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Generando PDF..." : "Descargar PDF"
          }
        </PDFDownloadLink>
      )}
      </div>
      
    </div>
  );
};
