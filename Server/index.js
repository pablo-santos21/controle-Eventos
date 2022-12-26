const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const res = require('express/lib/response');
const saltRounds = 10;
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Enviar informaçoes do cadastro
app.post('/cadastro', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length == 0) {
      bcrypt.hash(password, saltRounds, (err, hash) => {
        db.query(
          'INSERT INTO usuarios (email, password) VALUE (?,?)',
          [email, hash],
          (error, response) => {
            if (err) {
              res.send(err);
            }

            res.send({ msg: 'Usuário cadastrado com sucesso' });
          },
        );
      });
    } else {
      res.send({ msg: 'Email já cadastrado' });
    }
  });
});

{
  /*Verificação de login*/
}

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, result) => {
    if (err) {
      res.send(err);
    }
    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (error) {
          res.send(error);
        }
        if (response === true) {
          res.send(response);
        } else {
          res.send({ msg: 'email ou senha incorreta' });
        }
      });
    } else {
      res.send({ msg: 'Usuário não registrado.' });
    }
  });
});

// Configs do CRUD
// BUSCA AS INFORMAÇOES NO BD
app.get('/api/get', (req, res) => {
  const sqlGet = 'SELECT * FROM eventos';
  db.query(sqlGet, (error, result) => {
    res.send(result);
  });
});

// ENVIA AS INFORMAÇOES PARA O BD
app.post('/api/post', (req, res) => {
  const { name, telefone, evento, convidados, data_evento, informacao } =
    req.body;
  const sqlInsert =
    'INSERT INTO eventos (name, telefone, evento, convidados, data_evento, informacao) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    sqlInsert,
    [name, telefone, evento, convidados, data_evento, informacao],
    (error, result) => {
      if (error) {
        console.log(error);
      }
    },
  );
});

// REMOVE AS INFORMAÇOES DO BD
app.delete('/api/remove/:id', (req, res) => {
  const { id } = req.params;
  const sqlRemove = 'DELETE FROM eventos WHERE id = ?';
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.log(error);
    }
  });
});

// VERIFICA AS INFORMAÇOES NO BANCO
app.get('/api/get/:id', (req, res) => {
  const { id } = req.params;
  const sqlGet = 'SELECT * FROM eventos WHERE id = ?';
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.log(error);
    }
    res.send(result);
  });
});

// ATUALIZA AS INFORMAÇOES NO BD
app.put('/api/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, telefone, evento, convidados, data_evento, informacao } =
    req.body;
  const sqlUpdate =
    'UPDATE eventos SET name = ?, telefone = ?, evento = ?, convidados = ?, data_evento = ?, informacao = ? WHERE id = ?';
  db.query(
    sqlUpdate,
    [name, telefone, evento, convidados, data_evento, informacao, id],
    (error, result) => {
      if (error) {
        console.log(error);
      }
      res.send(result);
    },
  );
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
