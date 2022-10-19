const mongoose = require('mongoose');
require('dotenv').config();
const dbConection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {ssl:false});
    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error(`Error al conectar con la base de datos ${error}`);
  }
};

module.exports = {
  dbConection,
};
