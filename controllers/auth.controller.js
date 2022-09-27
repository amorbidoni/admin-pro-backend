const { response } = require('express');
const Usuario = require('../models/user.model');
const bcrypt = require('bcryptjs');
const { getJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const usuarioDb = await Usuario.findOne({ email });
    let usuario = new Usuario();
    if (!usuarioDb) {
      usuario = new Usuario({
        nombre: name,
        email: email,
        password: '@@@',
        img: picture,
        google: true,
        role: '@@',
      });
    } else {
      usuario = usuarioDb;
      usuario.google = true;
      // usuario.password ='@@'
    }
    // // guardar usuario

    await usuario.save();
    // generar token

    const token = await getJWT(usuario.id);
    res.json({
      ok: true,
      token,
      // usuario,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      ok: false,
      msj: 'El token de google no es correcto',
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;
  // generar GWT
  const token = await getJWT(uid);
  res.json({
    ok: true,
    uid,
    token,
  });
};

module.exports = {
  login,
  googleSignIn,
  renewToken,
};
