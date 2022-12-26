import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import '../Styles/View.css';

const View = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  let data = moment(`${user.data_evento}`, 'YYYY/MM/DD hh:mm:ss.SS');

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setUser({ ...resp.data[0] }));
  }, [id]);

  const padrao = data.format('DD-MM-YYYY');

  return (
    <div style={{ marginTop: '120px' }}>
      <div className="card card-borda">
        <div className="card-body card-titulo ">
          <h4>Detalhes da Festa</h4>
        </div>
        <div className="card-text container" style={{ textAlign: 'center' }}>
          <strong>ID: </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Contratante: </strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Telefone: </strong>
          <span>
            <a href={`tel: ${user.telefone}`}>{user.telefone}</a>
          </span>
          <br />
          <br />
          <strong>Evento: </strong>
          <span>{user.evento}</span>
          <br />
          <br />
          <strong>Convidados: </strong>
          <span>{user.convidados}</span>
          <br />
          <br />
          <strong>Data do Evento: </strong>
          <span>{padrao}</span>
          <br />
          <br />
          <strong>Informações do Contrato: </strong>
          <br />
          <span>{user.informacao}</span>

          <br />
          <br />
          <Link to="/">
            <div className="btn btn-success">Home</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
