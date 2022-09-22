/*

PETICIÓN AL URL: /api/auth

*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post(
  '/',
  [
    check('email', 'El email es obligatorio.').not().isEmpty(),
    check('email', 'El email ingresado es incorrecto.').isEmail(),
    check('password', 'La contraseña es obligatoria.').not().isEmpty(),
    validarCampos,
  ],
  login
);

module.exports = router;
