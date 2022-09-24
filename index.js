require('dotenv').config();

const express = require('express');
const { dbConection } = require('./database/config');
const cors = require('cors');
// iniciar app de express
const PORT = process.env.PORT;
const app = express();
// cors
app.use(cors());
// carpeta publica para presentar la app ↓
app.use(express.static('public'));

//Para lectura y parseo del body 👇🏻. es importante que este antes que las rutas.

app.use(express.json());

// BASE DE DATOS
// Q8eypn67GerGuzm
// mean_user
dbConection();
// RUTAS
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));

app.use('/api/hospitales', require('./routes/hospitales.routes'));
app.use('/api/medicos', require('./routes/medicos.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));

app.listen(PORT, () => {
  console.log(`servidor corriendo en puerto ${PORT}`);
});
