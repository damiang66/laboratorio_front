import React from 'react';
import { Paginator } from 'primereact/paginator';

export const PaginadorPage = ({ total, currentPage, setCurrentPage }) => {
  const onPageChange = (event) => {
    setCurrentPage(event.page);
  };

  return (
    <Paginator 
      first={currentPage * 1}  // Multiplica por el número de elementos por página
      rows={1} // Número de elementos por página
      totalRecords={total} // Total de elementos
      onPageChange={onPageChange}
      template={{ layout: 'PrevPageLink CurrentPageReport NextPageLink' }} 
    />
  );
};


