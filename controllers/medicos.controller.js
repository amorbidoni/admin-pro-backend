const { response } = require('express');
//
//  GET MEDICOS
//
const getMedicos = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'getMedicos',
  });
};
//
//  ADD MEDICO
//
const addMedico = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'addMedico',
  });
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
