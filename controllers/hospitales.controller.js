const { response } = require('express');

const Hospital = require('../models/hospital.model');
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
  const uid = req.uid;
  const hospital = new Hospital({ usuario: uid, ...req.body });

  try {
    const hospitalDb = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDb,
    });
  } catch (error) {
    console.log(`Error en la petición addHospital: ${error}`);
    res.status(500).json({
      ok: false,
      msj: 'Error inesperado',
    });
  }
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
