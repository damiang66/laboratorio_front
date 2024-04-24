import React from 'react';

const PDFViewer = () => {
    const viewPDF = () => {
        const texts = ["Texto 1", "Texto 2", "Texto 3"]; // Ejemplo de textos
        const url = `/pdf/view?texts=${texts.join(',')}`;
        window.open(url, '_blank');
    };

    const printPDF = () => {
        const texts = ["Texto 1", "Texto 2", "Texto 3"]; // Ejemplo de textos
        const url = `/pdf/print?texts=${texts.join(',')}`;
        window.open(url, '_blank');
    };

    return (
        <div>
            <iframe src="/pdf/primero/view?texts=text1,text2,text3" style={{ width: '100%', height: '500px' }} title="PDF Viewer" />
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <button onClick={viewPDF} className="btn btn-primary mx-2">Ver PDF</button>
                <button onClick={printPDF} className="btn btn-primary mx-2">Imprimir PDF</button>
                <a href="/pdf/print?texts=text1,text2,text3" download="archivo.pdf" className="btn btn-primary mx-2">Descargar PDF</a>
            </div>
        </div>
    );
};

export default PDFViewer;
