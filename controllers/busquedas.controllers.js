const { response } = require('express');

const Usuario = require('../models/user.model');
const Medico = require('../models/medico.model');
const Hospital = require('../models/hospital.model');

const searchData = async (req, res = response) => {
  const data = req.params.data;
  const regex = new RegExp(data, 'i');
  try {
    const [usuarios, hospitales, medicos] = await Promise.all([
      Usuario.find({ nombre: regex }),
      Hospital.find({ nombre: regex }),
      Medico.find({ nombre: regex }),
    ]);

    res.status(200).json({
      ok: true,
      msj: data,
      usuarios,
      hospitales,
      medicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: `Error en la petición searchData: ${error}`,
    });
  }
};

const searchColection = async (req, res = response) => {
  const data = req.params.data;
  const tabla = req.params.tabla;
  const regex = new RegExp(data, 'i');
  try {
    let result = [];
    switch (tabla) {
      case 'medicos':
        result = await Medico.find({ nombre: regex })
          .populate('usuario', 'nombre img')
          .populate('hospital', 'nombre img');
        break;
      case 'hospitales':
        result = await Hospital.find({ nombre: regex }).populate(
          'usuario',
          'nombre email'
        );
        break;
      case 'usuarios':
        result = await Usuario.find({ nombre: regex });
        break;
      default:
        return res.status(400).json({
          ok: false,
          msj: 'La tabla debe ser medicos/usuarios/hospitales',
        });
    }

    res.json({
      ok: true,
      resultado: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: `Error en la petición searchColection: ${error}`,
    });
  }
};

module.exports = {
  searchData,
  searchColection,
};
