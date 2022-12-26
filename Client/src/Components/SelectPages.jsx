import React from 'react';

const SelectPages = ({ itemsPerPage, setItemsPerPage }) => {
  return (
    <div>
      <p>itens por página</p>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        style={{ width: '55%' }}
      >
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default SelectPages;
