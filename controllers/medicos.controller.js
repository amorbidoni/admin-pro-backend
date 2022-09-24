const { response } = require('express');
const Medico = require('../models/medico.model');
//
//  GET MEDICOS
//
const getMedicos = async (req, res = response) => {
  const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre');
  try {
    res.status(400).json({
      ok: true,
      medicos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: `Error al hacer la petición getMedico: ${error}`,
    });
  }
};
//
//  ADD MEDICO
//
const addMedico = async (req, res = response) => {
  let uid = req.uid;
  let medico = new Medico({ usuario: uid, ...req.body });

  try {
    const medicoDb = await medico.save();

    res.json({
      ok: true,
      medico: medicoDb,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: 'Hable con el administrador',
    });
  }
};
//
//  UPDATE MEDICO
//
const updateMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'updateMedico',
  });
};
//
//  DELETE MEDICO
//
const deleteMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'deleteMedico',
  });
};

module.exports = {
  getMedicos,
  updateMedico,
  addMedico,
  deleteMedico,
};
