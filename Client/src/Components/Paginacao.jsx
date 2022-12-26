import React from 'react';
import './Paginacao.css';

const Paginacao = ({ setCurrentPage, currentPage, pages }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      {Array.from(Array(pages), (item, index) => {
        return (
          <button
            className="botaoPagina"
            style={index === currentPage ? { backgound: 'red' } : null}
            key={index}
            value={index}
            onClick={(e) => setCurrentPage(Number(e.target.value))}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
};

export default Paginacao;
