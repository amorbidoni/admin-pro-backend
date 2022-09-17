require('dotenv').config();

const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
// iniciar app de express
const PORT = process.env.PORT;
const app = express();
// cors
app.use(cors());
// BASE DE DATOS
// Q8eypn67GerGuzm
// mean_user
dbConection();
// RUTAS

app.get('/', (req, res) => {
  res.json({ ok: true, msj: 'Hola mundo' });
});

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
