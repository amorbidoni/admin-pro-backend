const { response } = require('express');
const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { getJWT } = require('../helpers/jwt');

//
// LOGIN
//

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDb = await Usuario.findOne({ email });

    // verificar email
    if (!usuarioDb) {
      return res.status(400).json({
        ok: false,
        msj: 'Email o contraseña incorrecto.',
      });
    }
    // verificar password

    const validPassword = bcrypt.compareSync(password, usuarioDb.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msj: 'Email o contraseña incorrecto.',
      });
    }
    // generar token

    const token = await getJWT(usuarioDb.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(`error en la peicion: ${error}`);
    res.status(500).json({
      ok: false,
      msj: `Hable con el administrador`,
    });
  }
};

module.exports = {
  login,
};
