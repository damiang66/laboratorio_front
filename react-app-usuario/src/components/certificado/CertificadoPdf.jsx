
import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { NavLink, useParams } from "react-router-dom";
import { CertificadosFindById } from "../../services/certificadoService";

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  button: {
    position: 'absolute',
    padding: 5,
    borderRadius: 5,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  closeButton: {
    top: 10,
    right: 10,
    backgroundColor: '#ff0000',
  },
  downloadButton: {
    bottom: 10,
    right: 10,
    backgroundColor: '#008000',
  },
});

const CertificadoPDF = () => {
  const [certificado, setCertificado] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const traer = async (id) => {
      try {
        const respuesta = await CertificadosFindById(id);
        setCertificado(respuesta.data);
      } catch (error) {
        console.error("Error al obtener el certificado:", error);
      }
    };

    if (id) {
      traer(id);
    }
  }, [id]);

  const { certificadoNumero, fecha, ciudad, departamento, empresa, cliente, coprologico, coproCultivo, cultivo, koh, diagnostico, concepto } = certificado;

  return (
    <>
      <NavLink className="btn btn-danger m-4" to={"/certificados"}>Cerrar</NavLink>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Numero de Certificado: {certificadoNumero}</Text>
            <Text>Fecha: {fecha}</Text>
            <Text>Ciudad: {ciudad}</Text>
            <Text>Departamento: {departamento}</Text>
            <Text>Empresa: {empresa}</Text>
            <Text>Cliente: {cliente?.nombre}</Text>
            <Text>Coprologico: {coprologico}</Text>
            <Text>CoproCultivo: {coproCultivo}</Text>
            <Text>Cultivo: {cultivo}</Text>
            <Text>KOH: {koh}</Text>
            <Text>Diagnóstico: {diagnostico}</Text>
            <Text>Concepto: {concepto}</Text>
          </View>
        </Page>
      </Document>
      <PDFDownloadLink document={<Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Numero de Certificado: {certificadoNumero}</Text>
            <Text>Fecha: {fecha}</Text>
            <Text>Ciudad: {ciudad}</Text>
            <Text>Departamento: {departamento}</Text>
            <Text>Empresa: {empresa}</Text>
            <Text>Cliente: {cliente?.nombre}</Text>
            <Text>Coprologico: {coprologico}</Text>
            <Text>CoproCultivo: {coproCultivo}</Text>
            <Text>Cultivo: {cultivo}</Text>
            <Text>KOH: {koh}</Text>
            <Text>Diagnóstico: {diagnostico}</Text>
            <Text>Concepto: {concepto}</Text>
          </View>
        </Page>
      </Document>} fileName="certificado.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Cargando...' : 'Descargar PDF'
        }
      </PDFDownloadLink>
    </>
  );
};

export default CertificadoPDF;
