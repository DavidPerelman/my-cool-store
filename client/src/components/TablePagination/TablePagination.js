import React from 'react';
import './TablePagination.css';

const TablePagination = ({ pages, currentPage, onClick }) => {
  return (
    <div className='pagination'>
      <a href='#'>&laquo;</a>
      {pages.map((page, i) => (
        <a
          key={i}
          className={page === currentPage ? 'page-link-active' : ''}
          onClick={() => onClick(page)}
        >
          {page}
        </a>
      ))}
      <a href='#'>&raquo;</a>
    </div>
  );
};

export default TablePagination;
