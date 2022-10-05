const { response } = require('express');

const Hospital = require('../models/hospital.model');
//
//  GET HOSPITAL
//
const getHospitales = async (req, res = response) => {
  try {
    // PAGINACION 
    const desde = Number(req.query.desde) || 0;
    const [hospitales, total]=await Promise.all([
      Hospital.find().populate('usuario', 'nombre img').skip(desde).limit(5),
      Hospital.countDocuments()
    ])
    res.status(200).json({
      ok: true,
      hospitales,
      total
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: 'Error al solicitar hospitales',
    });
  }
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
  const id = req.params.id;
  const uid = req.uid;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msj: `No existe un Hospital con el id: ${id}`,
      });
    }

    const hospitalChanges = {
      ...req.body,
      usuario: uid,
    };
    const hospitalActualizado = await Hospital.findByIdAndUpdate(
      id,
      hospitalChanges,
      { new: true }
    );
    res.json({
      ok: true,
      hospital: hospitalActualizado,
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
//  DELETE HOSPITAL
//
const deleteHospital = async (req, res = response) => {
  const id = req.params.id;
  try {
    const hospital = await Hospital.findById(id);
    if (!hospital) {
      return res.status(404).json({
        ok: true,
        msj: `No existe un Hospital con el id: ${id}`,
      });
    }

    const deleteHospital = await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      hospitalEliminado: deleteHospital,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getHospitales,
  updateHospital,
  addHiospital,
  deleteHospital,
};
