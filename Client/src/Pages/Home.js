import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

import Paginacao from '../Components/Paginacao';
import SelectPages from '../Components/SelectPages';

import '../Styles/Home.css';
import Menu from '../Components/Menu';

const Home = () => {
  const [data, setData] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(data.length / itemsPerPage);
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

  const deleteEvento = (id) => {
    if (window.confirm('Tem certeza que deseja apagar o evento ?')) {
      axios.delete(`http://localhost:3001/api/remove/${id}`);
      toast.success('Evento Deletado com sucesso!');
      setTimeout(() => loadData(), 500);
    }
  };

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
    <>
      <Menu />
      <div style={{ marginTop: '110px' }}>
        <div className="container">
          <div className="row options">
            <div className="col-5">
              <SelectPages
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
              />
            </div>
            <div
              className="col-5"
              style={{ alignItems: 'center', alignSelf: 'center' }}
            >
              <Link to="/addEvento">
                <button className="botao botao-evento">Adicionar evento</button>
              </Link>
            </div>
          </div>
        </div>

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
                <th style={{ textAlign: 'center' }}>Eventos</th>
                <th style={{ textAlign: 'center' }}>Convidados</th>
                <th style={{ textAlign: 'center' }}>Ações</th>
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
                    <tr key={item.id} style={{ textAlign: 'center' }}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{padrao}</td>
                      <td>{item.evento}</td>
                      <td>{item.convidados}</td>
                      <td>
                        <Link to={`/update/${item.id}`}>
                          <button className="botao botao-edit">Editar</button>
                        </Link>
                        <button
                          className="botao botao-delete"
                          onClick={() => deleteEvento(item.id)}
                        >
                          Deletar
                        </button>
                        <Link to={`/view/${item.id}`}>
                          <button className="botao botao-view">
                            Consultar
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        <Paginacao
          pages={pages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
};

export default Home;
