const { response } = require('express');
//
//  GET HOSPITAL
//
const getHospitales = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'getHospitales',
  });
};
//
//  ADD HOSPITAL
//
const addHiospital = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'addHiospital',
  });
};
//
//  UPDATE HOSPITAL
//
const updateHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'updateHospital',
  });
};
//
//  DELETE HOSPITAL
//
const deleteHospital = async (req, res = response) => {
  res.json({
    ok: true,
    msj: 'deleteHospital',
  });
};

module.exports = {
  getHospitales,
  updateHospital,
  addHiospital,
  deleteHospital,
};
