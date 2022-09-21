const { get } = require('mongoose');
const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');

//
const getUsers = async (req, res) => {
  const usuarios = await Usuario.find({}, 'nombre email role google');
  res.json({
    ok: true,
    usuarios,
  });
};

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msj: 'El email ya existe',
      });
    }
    const usuario = new Usuario(req.body);
    // antes de guardar en la abase de datos encriptar contraseña ↓
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);
    // guardar usuario en la base de datos ↓
    await usuario.save();
    res.json({ ok: true, usuario });
  } catch (error) {
    res.status(500).json({ ok: flase, msj: 'Error inesperado' });
  }
};

const updateUser = async (req = request, res = response) => {
  // TODO: validar token y comprobar si es el usuario correcto

  const uid = req.params.id;
  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msj: 'No existe un usuario con ese id.',
      });
    }
    // actualizaciones

    const { password, google, email, ...campos } = req.body;
    // elimino los campos que no quiero pisar↓ (ya los elimine en la restructuracion ↑)
    // delete campos.password;
    // delete campos.google;
    // verifico si el usuario no modifica el email para no chocar con las validaciones
    // en caso de que no lo modifique lo elimino tambien
    if (usuarioDb.email !== email) {
      delete campos.email;
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msj: 'Ya exsiste un usuario con es email.',
        });
      }
    }
    campos.email = email;
    const newUser = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

    res.json({
      ok: true,
      usuario: newUser,
    });
  } catch (error) {
    console.log(`Error en updateUser: ${error}`);
    res.status(500).json({
      ok: false,
      msj: 'Error inesperado.',
    });
  }
};
module.exports = { getUsers, createUser, updateUser };
