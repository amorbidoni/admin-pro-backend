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
  const medicoId = req.params.id;
  const uid = req.uid;
  try {
    const medico = await Medico.findById(medicoId);
    if (!medico) {
      return res.status(404).json({
        ok: true,
        msj: 'No se encontro un médico con ese id',
      });
    }
    const medicoChanges = {
      ...req.body,
      usuario: uid,
    };

    const saveMedico = await Medico.findByIdAndUpdate(medicoId, medicoChanges, {
      new: true,
    });
    res.json({
      ok: true,
      msj: saveMedico,
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
//  DELETE MEDICO
//
const deleteMedico = async (req, res = response) => {
  const medicoId = req.params.id;

  try {
    const medico = await Medico.findById(medicoId);
    if (!medico) {
      return res.status(404).json({
        ok: false,
        msj: 'No se encontro un medico con el id ingresado',
      });
    }
    await Medico.findByIdAndDelete(medicoId);
    res.json({
      ok: true,
      msj: 'Se elimino correctamente',
      medico,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msj: 'Comuniquese con el administrador',
    });
  }
};

module.exports = {
  getMedicos,
  updateMedico,
  addMedico,
  deleteMedico,
};
