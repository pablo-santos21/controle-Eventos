import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

import '../Styles/AddEdit.css';

const initialState = {
  name: '',
  telefone: '',
  evento: '',
  convidados: '',
  data_evento: '',
  informacao: '',
};

const AddEdit = () => {
  //   const [name, setName] = React.useState('');
  //   const [telefone, setTelefone] = React.useState('');
  //   const [evento, setEvento] = React.useState('');
  //   const [convidados, setConvidados] = React.useState('');
  //   const [data_evento, setDataEvento] = React.useState('');
  const [state, setState] = useState(initialState);

  const { name, telefone, evento, convidados, data_evento, informacao } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0] }));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      !name ||
      !telefone ||
      !evento ||
      !convidados ||
      !data_evento ||
      !informacao
    ) {
      window.confirm('Por favor insira as informações necessárias.');
      toast.error('Por favor insira as informações necessárias.');
    } else {
      if (!id) {
        axios
          .post('http://localhost:3001/api/post', {
            name,
            telefone,
            evento,
            convidados,
            data_evento,
            informacao,
          })
          .then(() => {
            setState({
              name: '',
              telefone: '',
              evento: '',
              convidados: '',
              data_evento: '',
              informacao: '',
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success('Evento cadastrado com sucesso');
      } else {
        axios
          .put(
            `https://backend-eventos-greenville.herokuapp.com/api/update/${id}`,
            {
              name,
              telefone,
              evento,
              convidados,
              data_evento,
              informacao,
            },
          )
          .then(() => {
            setState({
              name: '',
              telefone: '',
              evento: '',
              convidados: '',
              data_evento: '',
              informacao: '',
            });
          })
          .catch((err) => toast.error(err.response.data));
        toast.success('Evento editado com sucesso');
      }

      setTimeout(() => navigate('/'), 500);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div style={{ marginTop: '70px' }} onSubmit={handleSubmit}>
      <form className="style-form">
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Nome"
          value={name || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="telefone">Telefone</label>
        <input
          type="text"
          id="telefone"
          name="telefone"
          placeholder="Telefone de contato"
          value={telefone || ''}
          onChange={handleInputChange}
        />

        <label htmlFor="evento">Evento</label>
        <input
          type="text"
          id="evento"
          name="evento"
          placeholder="Casamento, 15 anos"
          value={evento || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="convidados">Número de convidados</label>
        <input
          type="text"
          id="convidados"
          name="convidados"
          placeholder="250"
          value={convidados || ''}
          onChange={handleInputChange}
        />
        <label htmlFor="data_evento">Data do Evento</label>
        <input
          type="date"
          id="data_evento"
          name="data_evento"
          placeholder=""
          value={data_evento || ''}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="inf">Mais Informações</label>
        <br />
        <textarea
          id="informacao"
          name="informacao"
          rows="5"
          placeholder="Informações do contrato"
          value={informacao || ''}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? 'Update' : 'Salvar'} />
        <Link to="/">
          <input type="button" value="Home" />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
