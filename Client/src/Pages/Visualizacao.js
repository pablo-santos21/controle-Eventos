import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import '../Styles/Home.css';

const Visualizacao = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const loadData = async () => {
    const response = await axios.get('http://localhost:3001/api/get');
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  const [order, setOrder] = useState('ASC');
  const sorting = (col) => {
    if (order === 'ASC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1,
      );
      setData(sorted);
      setOrder('DSC');
    }
    if (order === 'DSC') {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1,
      );
      setData(sorted);
      setOrder('ASC');
    }
  };

  return (
    <div style={{ marginTop: '110px' }}>
      <div className="container">
        <div className="row justify-content-around">
          <div className="table-responsive">
            <table className="table style-table table-hover">
              <thead>
                <tr>
                  <th style={{ textAlign: 'center' }}>Id</th>
                  <th style={{ textAlign: 'center' }}>Nome</th>
                  <th
                    style={{ textAlign: 'center' }}
                    onClick={() => sorting('data_evento')}
                  >
                    Data
                  </th>
                  <th style={{ textAlign: 'center' }}>Evento</th>
                  <th style={{ textAlign: 'center' }}>Convidados</th>
                </tr>
              </thead>
              {data.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6">SEM EVENTO</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {currentItems.map((item, index) => {
                    let data_evento = moment(
                      `${item.data_evento}`,
                      'YYYY/MM/DD hh:mm:ss.SS',
                    );
                    const padrao = data_evento.format('DD-MM-YYYY');

                    return (
                      <tr key={item.id}>
                        <th scope="row">{index + 1}</th>
                        <td>{item.name}</td>
                        <td>{padrao}</td>
                        <td>{item.evento}</td>
                        <td>{item.convidados}</td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </table>
          </div>
          <Link to="/">
            <div className="btn btn-success">Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Visualizacao;
