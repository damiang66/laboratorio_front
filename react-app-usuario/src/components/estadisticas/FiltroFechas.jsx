import React, { useState } from 'react';

const FiltroFechas = ({ onFilter }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleFilter = () => {
        onFilter(startDate, endDate);
    };

    return (
        <div>
            <label>Desde:</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
            <label>Hasta:</label>
            <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
            <button onClick={handleFilter}>Filtrar</button>
        </div>
    );
};

export default FiltroFechas;
