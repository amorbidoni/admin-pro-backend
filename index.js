require('dotenv').config();

const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
// iniciar app de express
const PORT = process.env.PORT;
const app = express();
// cors
app.use(cors());

//Para lectura y parseo del body 👇🏻. es importante que este antes que las rutas.

app.use(express.json());

// BASE DE DATOS
// Q8eypn67GerGuzm
// mean_user
dbConection();
// RUTAS
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
