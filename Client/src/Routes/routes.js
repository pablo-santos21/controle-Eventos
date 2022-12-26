import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../Pages/Login';
import Cadastro from '../Pages/Cadastro';
import Home from '../Pages/Home';
import AddEdit from '../Pages/AddEdit';
import View from '../Pages/View';
import Visualizacao from '../Pages/Visualizacao';

const logado = localStorage.getItem('@user');

const Rotas = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!logado && <Route path="/" element={<Login logado={logado} />} />}

          {!logado && (
            <Route path="/cadastro" element={<Cadastro logado={logado} />} />
          )}
          {logado && <Route path="/" exact element={<Home />} />}
          {logado && <Route path="/addEvento" element={<AddEdit />} />}
          {logado && <Route path="/update/:id" element={<AddEdit />} />}
          {logado && <Route path="/view/:id" element={<View />} />}
          {<Route path="/visualizacao" element={<Visualizacao />} />}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Rotas;
