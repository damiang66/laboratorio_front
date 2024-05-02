import React, { useEffect, useState } from 'react';
import { XYPlot, VerticalBarSeries, XAxis, YAxis, LabelSeries } from 'react-vis';
import { findAll } from '../../services/userService';
import { CertificadosFindAll } from '../../services/certificadoService';

export const Estadisticas = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener usuarios
                const usersResponse = await findAll();
                const users = usersResponse.data;
                console.log(users);
                // Obtener certificados
                const certificatesResponse = await CertificadosFindAll();
                const certificates = certificatesResponse.data;
                console.log(certificates);

                // Contar el número de certificados por usuario
                const certificadosPorUsuario = users.map(usuario => {
                    const certificadosUsuario = certificates.filter(certificado => certificado.usuario === usuario.id);
                    return { x: usuario.username, y: certificadosUsuario.length };
                });

                setData(certificadosPorUsuario);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Certificados realizados por empleado</h2>
            <XYPlot xType="ordinal" width={400} height={300}>
                <VerticalBarSeries data={data} />
                <XAxis />
                <YAxis />
                <LabelSeries data={data.map(d => ({ ...d, label: d.y.toString() }))} />
            </XYPlot>
        </div>
    );
};
